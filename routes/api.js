import express from "express";
import Contact from "./../models/contact.js";
import { sendContactNotification } from "../utils/emailSender.js";

const router = express.Router();

// @route   POST api/contact
// @desc    Submit contact form and send email notification
// @access  Public
router.post("/contact", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Simple validation
    if (!name || !email || !subject || !message) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all fields" });
    }

    // Create new contact submission
    const newContact = new Contact({
      name,
      email,
      subject,
      message,
    });

    // Save to database
    const contact = await newContact.save();

    // Send email notification
    try {
      await sendContactNotification({ name, email, subject, message });
      console.log("Email notification sent successfully");
    } catch (emailError) {
      console.error("Failed to send email notification:", emailError);
      // Note: We don't return an error response here because the form submission was successful
      // We just log the email error but still consider the form submission successful
    }

    res.status(200).json({ success: true, data: contact });
  } catch (error) {
    console.error("Contact form submission error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
