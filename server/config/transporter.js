import axios from "axios";

const sendEmail = async ({ to, subject, html }) => {
  try {
    await axios.post(
      "https://api.brevo.com/v3/smtp/email", // HTTPS → port 443
      {
        sender: {
          email: process.env.SENDER_EMAIL,
        },
        to: [{ email: to }],
        subject,
        htmlContent: html,
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
        },
        timeout: 10000,
      },
    );

    console.log("✅ Email sent");
  } catch (err) {
    console.error("❌ Brevo email error:", err.response?.data || err.message);
    throw err;
  }
};

export default sendEmail;
