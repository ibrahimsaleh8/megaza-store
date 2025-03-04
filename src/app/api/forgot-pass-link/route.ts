import prisma from "@/utils/PrismaVariable";
import { NextRequest, NextResponse } from "next/server";
import Jwt from "jsonwebtoken";
import { transporter } from "@/utils/NodemailerVariabel";
import { MainDomain } from "@/utils/mainDomain";

export async function POST(request: NextRequest) {
  try {
    const { email } = (await request.json()) as { email: string };
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    const token = Jwt.sign({ email }, process.env.jwt_token!, {
      expiresIn: "10m",
    });
    await prisma.tokenResetPassword.create({
      data: {
        email,
        token,
      },
    });

    const mailOptions = {
      to: email,
      from: process.env.NODMAILER_EMAIL_USER,
      subject: "Reset your password",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; padding: 20px;">
          <h2 style="color: #121212;">Reset your password</h2>
          <p>Hello ${user.username} this is reset password link</p>
          <p>if you aren't request reset password please avoid this message</p>
          <a style="color: #ffffff;background-color:#121212;padding:5px 10px;text-decoration:none;border-radius:4px;" href="${MainDomain}/reset-password?token=${token}">Reset Password</a>
          <hr style="margin-top: 20px;">
          <p style="font-size: 14px; color: #777;">This email was sent from the Megaza website.</p>
        </div>
      `,
    };
    await transporter.sendMail(mailOptions);
    return NextResponse.json(
      { message: "Reset password sent success" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Server Error: " + error },
      { status: 500 }
    );
  }
}
