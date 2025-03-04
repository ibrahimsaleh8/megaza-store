import { transporter } from "@/utils/NodemailerVariabel";
import { NextRequest, NextResponse } from "next/server";
export type ContactUsFormDataType = {
  email: string;
  subject: string;
  message: string;
};
export async function POST(request: NextRequest) {
  try {
    const { email, message, subject } =
      (await request.json()) as ContactUsFormDataType;

    const mailOptions = {
      from: email,
      to: process.env.NODMAILER_EMAIL_USER,
      subject: subject,
      html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; padding: 20px;">
        <h2 style="color: #4CAF50;">New Contact Form Submission</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <div style="background: #f4f4f4; padding: 15px; border-radius: 5px;border:1px solid #b5b5b5;font-size:16px;">
          <p>${message}</p>
        </div>
        <hr style="margin-top: 20px;">
        <p style="font-size: 14px; color: #777;">This email was sent from the Megaza website.</p>
      </div>
    `,
    };

    // Send the email
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
