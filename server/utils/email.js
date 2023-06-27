import nodemailer from "nodemailer";

async function sendEmail(options) {
  const transporter = nodemailer.createTransport({
    service: "SendGrid",
    auth: {
      user: process.env.SENDGRID_USERNAME,
      pass: process.env.SENDGRID_API_KEY,
    },
  });

  const mailOptions = {
    from: "mindfluxrecoveryhelpline@gmail.com",
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
