import nodemailer from "nodemailer";
import "dotenv/config";

async function sendEmail(options) {
  const transporter = nodemailer.createTransport({
    service: "SendGrid",
    auth: {
      user: process.env.SENDGRID_USERNAME,
      pass: options.key,
    },
  });

  const mailOptions = {
    from: options.from,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw Error(error.message);
  }
}

export { sendEmail };
