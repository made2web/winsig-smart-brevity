import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "465"),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function sendEmail({
  options,
}: {
  options: nodemailer.SendMailOptions;
}) {
  if (!options) {
    throw new Error("Missing email options #t9h44y8");
  } else {
    return await transporter.sendMail(options);
  }
}
