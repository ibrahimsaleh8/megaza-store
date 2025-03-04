import { MainDomain } from "@/utils/mainDomain";
import { transporter } from "@/utils/NodemailerVariabel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, name } = (await request.json()) as {
      email: string;
      name: string;
    };
    if (!email || typeof email !== "string") {
      return NextResponse.json(
        {
          message:
            "Invalid request: 'email' field is required and must be a string.",
        },
        { status: 400 }
      );
    }

    const mailOptions = {
      to: email,
      from: process.env.NODMAILER_EMAIL_USER,
      subject: "Welcome to Megaza Store",
      html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; padding: 20px;">
            <h2 style="color: #4CAF50;">Welcome ${name} to Megaza Store</h2>
            <div style="padding: 15px; font-size:16px;">
              <p>Hi ${email},</p>
              <p>Welcome to Megaza, your go-to destination for the latest in men's fashion! 👔🔥</p>
              <p>Get ready to explore premium styles, trendy outfits, and exclusive deals – all curated just for you.</p>
              <a style="color: #ffffff; background-color: #000000; padding: 10px 15px; text-decoration: none; border-radius: 5px; display: inline-block;" 
                href="${MainDomain}?welcome=1">
                Go to Megaza Store
              </a>
            </div>
            <hr style="margin-top: 20px;">
            <p style="font-size: 14px; color: #777;">This email was sent from the Megaza website.</p>
          </div>
        `,
    };

    await transporter.sendMail(mailOptions);
    return Response.json(
      { success: "Message sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Server Error: " + error },
      { status: 500 }
    );
  }
}
