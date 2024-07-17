const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.USER,
    pass: process.env.APP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});
async function sendMail(options) {
  const info = await transporter.sendMail({
    from: `${process.env.FROM_NAME} ${process.env.FROM_EMAIL}`,
    to: options.email,
    subject: options.subject,
    text: options.text,
  });
  console.log("Message sent: %s", info.messageId);

}
module.exports = { sendMail };
