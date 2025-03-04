import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.NODMAILER_EMAIL_USER,
    pass: process.env.NODMAILER_EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});
