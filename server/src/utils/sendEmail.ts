import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
export const sendEmail = async (
  to: string,
  subject: string,
  text: string
): Promise<void> => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // your Gmail address
      pass: process.env.EMAIL_PASS, // your App Password
    },
  });

  await transporter.sendMail({
    from: `"${process.env.PROJECT_NAME} Support" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
  });
};
