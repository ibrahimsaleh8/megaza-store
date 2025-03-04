import { NextRequest, NextResponse } from "next/server";
import Jwt from "jsonwebtoken";
import prisma from "@/utils/PrismaVariable";
import bcrypt from "bcryptjs";
import { MainDomain } from "@/utils/mainDomain";
import { transporter } from "@/utils/NodemailerVariabel";

export async function POST(request: NextRequest) {
  try {
    const { password, token } = (await request.json()) as {
      token: string;
      password: string;
    };
    const tokenInDb = await prisma.tokenResetPassword.findFirst({
      where: {
        token,
      },
    });
    if (!tokenInDb) {
      return NextResponse.json({ message: "Invalid token" }, { status: 400 });
    }
    const currentTime = new Date().getTime();
    const availabelTime = new Date(tokenInDb.created_at).getTime() + 600000;
    if (currentTime > availabelTime) {
      return NextResponse.json({ message: "Expired session" }, { status: 400 });
    }
    const decode = Jwt.verify(token, process.env.jwt_token!) as {
      email: string;
    };
    const user = await prisma.user.findUnique({
      where: { email: decode.email },
    });
    if (!user) {
      return NextResponse.json({ message: "Invalid token" }, { status: 400 });
    }
    const newPassword = await bcrypt.hash(password, 10);
    await prisma.user.update({
      where: {
        email: decode.email,
      },
      data: {
        password: newPassword,
      },
    });

    await prisma.tokenResetPassword.delete({
      where: {
        id: tokenInDb.id,
      },
    });

    const mailOptions = {
      to: user.email,
      from: process.env.NODMAILER_EMAIL_USER,
      subject: "Your Password updated success",
      html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; padding: 20px;">
   <h2 style="color: #4CAF50;">${user.username} Your password Updated Success</h2>
             <a style="color: #ffffff;background-color:#121212;padding:5px 10px;text-decoration:none;border-radius:4px;" href="${MainDomain}/login">Login Now</a>
      
   <hr style="margin-top: 20px;">
        <p style="font-size: 14px; color: #777;">This email was sent from the Megaza website.</p>
      </div>
    `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Password reset successful" });
  } catch (error) {
    return NextResponse.json(
      { message: "Server Error: " + error },
      { status: 500 }
    );
  }
}
