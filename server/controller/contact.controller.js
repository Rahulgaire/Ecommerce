const Contact = require("../models/contact.model");
const nodemailer = require("nodemailer");
//create contact
const createContact = async (req, res) => {
  const { name, email, subject, message } = req.body;
  console.log(req.body);
  try {
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        message: "All fields require",
      });
    }
    const newContact = new Contact({ name, email, subject, message });
    await newContact.save();

    //nodemailer - mail sending
    //1.Setup transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // App password
      },
    });
    //2.Email sent to user
     const clientEmail = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `We received your message: ${subject}`,
      html: `
        <h2>Thank You for Reaching Out!</h2>
        <p>Hi ${name},</p>
        <p>Thanks for contacting us. We’ve received your message and will respond shortly.</p>
        <hr/>
        <p><strong>Your Message:</strong></p>
        <p>${message}</p>
        <hr/>
        <p>Best regards,<br/>Rahul Gaire</p>
      `,
    };

    //3.Email Sent to admin 
     const mailOptions = {
      from: `"${name}" <${email}>`,
      to: process.env.EMAIL_USER,
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    };

     // Send both emails
    await transporter.sendMail(mailOptions);
    await transporter.sendMail(clientEmail);

    res.status(200).json({
      message: "Contact form submitted Successfully",
      data: newContact,
    });
  } catch (error) {
    res.status(500).json({
      message: "Can not submit this form due to internal problem",
      error: error.message,
    });
  }
};

//get all contact
const getAllContact = async (req, res) => {
  try {
    const newContact = await Contact.find();
    res.status(200).json({
      message: "Contact Data Fetched Successfully",
      newContact,
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to get contact form data",
      error: error.message,
    });
  }
};

//get one contact
const getOneContact = async (req, res) => {
  const { id } = req.params;

  try {
    const newContact = await Contact.findById(id);

    if (!newContact) {
      return res.status(404).json({
        message: "No data available to display",
      });
    }

    res.status(200).json({
      message: "Contact fetched successfully",
      data: newContact,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error. Unable to fetch contact",
      error: error.message,
    });
  }
};

//delete one contact
const deleteOneContact = async (req, res) => {
  const { id } = req.params;
  try {
    const delContact = await Contact.findByIdAndDelete(id);
    if (!delContact) {
      return res.status(401).json({
        message: "No data found",
      });
    }
    res.status(200).json({
      message: "Contact deleted successfully",
      data: delContact,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

//delete all Contact
const deleteContact = async (req, res) => {
  try {
    const newContact = await Contact.deleteMany();
    res.status(200).json({
      message: "All Contact deleted",
      data: newContact,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error Deleting All the forms",
      error: error.message,
    });
  }
};

module.exports = {
  createContact,
  getAllContact,
  getOneContact,
  deleteOneContact,
  deleteContact,
};
