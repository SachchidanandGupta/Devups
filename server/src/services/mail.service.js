const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendVerificationEmail(email, username, link) {
  const { error } = await resend.emails.send({
    from: process.env.MAIL_FROM || "DevUps <onboarding@resend.dev>",
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

  if (error) {
    throw new Error(error.message || "Failed to send verification email");
  }
}

module.exports = { sendVerificationEmail };