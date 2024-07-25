const ContactUs = require("../models/contactUsModel");
const nodemailer = require("nodemailer");

const contactUsLogic = async (req, res) => {
  const { fullName, email, subject, message } = req.body;

  if (!fullName || !email || !subject || !message) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check for existing contact with the same email
    const existingContact = await ContactUs.findOne({ email });
    if (existingContact) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const contact = new ContactUs({ fullName, email, subject, message });

    await contact.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.USER,
        pass: process.env.APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: email,
      to: process.env.USER,
      subject: "New Contact Us Message",
      text: `Name: ${fullName}\nEmail: ${email}\nSubject:${subject}\nMessage: ${message}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).send("Error sending email.");
      }
      console.log("Email sent: " + info.response);
      res.status(200).send("Message sent successfully.");
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = contactUsLogic;
