import transporter from "../config/email.js";
import dotenv from "dotenv";

dotenv.config();

/**
 * Send email notification for contact form submission
 * @param {Object} contactData - Contact form data
 * @returns {Promise} - Email sending result
 */
export const sendContactNotification = async (contactData) => {
  const { name, email, subject, message } = contactData;

  // Email content
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_TO,
    subject: `New Contact Form Submission: ${subject}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <h3>Message:</h3>
      <p>${message}</p>
    `,
    // Add text version for email clients that don't support HTML
    text: `
      New Contact Form Submission
      
      Name: ${name}
      Email: ${email}
      Subject: ${subject}
      
      Message:
      ${message}
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
