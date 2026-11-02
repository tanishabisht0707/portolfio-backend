
import express from "express";
import Contact from "../models/contact.js";

import {
  sendNotificationEmail,
  sendConfirmationEmail,
} from "../service/emailService.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Save contact data in MongoDB
    const newContact = await Contact.create({
      name,
      email,
      subject,
      message,
    });

    // Send email notification to you
    await sendNotificationEmail(newContact);

    // Send confirmation email to visitor
    await sendConfirmationEmail(newContact);

    return res.status(201).json({
      success: true,
      message: "Contact saved and emails sent successfully",
      data: newContact,
    });
  } catch (error) {
    console.error("Contact API Error:", error);

    return res.status(500).json({
      success: false,
      message: "Contact saved or email sending failed",
    });
  }
});

export default router;
