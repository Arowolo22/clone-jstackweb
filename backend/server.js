// Import required packages
const express = require("express"); // Web framework for Node.js
const nodemailer = require("nodemailer"); // Package for sending emails
const cors = require("cors"); // Middleware to enable CORS
require("dotenv").config(); // Load environment variables from .env file

// Initialize Express app
const app = express();
const port = process.env.PORT || 3000; // Use port from .env or default to 3000

// Middleware setup
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies
app.use(express.static(".")); // Serve static files from current directory

// Configure email transporter using Gmail
// Note: You need to set up EMAIL_USER and EMAIL_PASS in your .env file
// EMAIL_PASS should be an App Password from Google Account settings
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your Gmail address
    pass: process.env.EMAIL_PASS, // Your Gmail App Password
  },
});

// API endpoint to handle form submissions
app.post("/submit-application", async (req, res) => {
  // Extract form data from request body
  const { firstName, lastName, reason } = req.body;

  // Configure email content
  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender email (your Gmail)
    to: process.env.EMAIL_USER, // Recipient email (your Gmail)
    subject: "New Job Application", // Email subject
    html: `
            <h2>New Job Application Received</h2>
            <p><strong>First Name:</strong> ${firstName}</p>
            <p><strong>Last Name:</strong> ${lastName}</p>
            <p><strong>Reason for Applying:</strong></p>
            <p>${reason}</p>
        `, // Email body in HTML format
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    // Send success response to client
    res.status(200).json({ message: "Application submitted successfully!" });
  } catch (error) {
    // Log error and send error response to client
    console.error("Error sending email:", error);
    res
      .status(500)
      .json({ message: "Error submitting application. Please try again." });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
