const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // STARTTLS, not implicit TLS
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
});

async function sendVerificationEmail(email, username, link) {
  await transporter.sendMail({
    from: `"DevUps" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: "Verify your DevUps account",
    html: `
      <div style="font-family: monospace; background: #000; color: #00ff88; padding: 24px;">
        <h2>WELCOME, ${username.toUpperCase()}</h2>
        <p style="color: #ccc;">Confirm your email to activate your account.</p>
        <a href="${link}" style="display:inline-block; margin-top:16px; padding:12px 24px; background:#00ff88; color:#000; text-decoration:none; font-weight:bold;">
          VERIFY_EMAIL
        </a>
        <p style="color: #666; margin-top: 24px; font-size: 12px;">This link expires in 1 hour. If you didn't create this account, ignore this email.</p>
      </div>
    `,
  });
}

module.exports = { sendVerificationEmail };