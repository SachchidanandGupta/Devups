const { google } = require("googleapis");

const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
);
oAuth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

function buildRawMessage({ to, from, subject, html }) {
  const messageParts = [
    `From: ${from}`,
    `To: ${to}`,
    `Content-Type: text/html; charset=utf-8`,
    `MIME-Version: 1.0`,
    `Subject: ${subject}`,
    "",
    html,
  ];
  const message = messageParts.join("\n");

  return Buffer.from(message)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

async function sendMail({ to, subject, html }) {
  const gmail = google.gmail({ version: "v1", auth: oAuth2Client });

  const raw = buildRawMessage({
    to,
    from: `DevUps <${process.env.GMAIL_USER}>`,
    subject,
    html,
  });

  await gmail.users.messages.send({
    userId: "me",
    requestBody: { raw },
  });
}

async function sendVerificationEmail(email, username, link) {
  const html = `
    <div style="font-family: monospace; background: #000; color: #00ff88; padding: 24px;">
      <h2>WELCOME, ${username.toUpperCase()}</h2>
      <p style="color: #ccc;">Confirm your email to activate your account.</p>
      <a href="${link}" style="display:inline-block; margin-top:16px; padding:12px 24px; background:#00ff88; color:#000; text-decoration:none; font-weight:bold;">
        VERIFY_EMAIL
      </a>
      <p style="color: #666; margin-top: 24px; font-size: 12px;">This link expires in 1 hour. If you didn't create this account, ignore this email.</p>
    </div>
  `;

  await sendMail({
    to: email,
    subject: "Verify your DevUps account",
    html,
  });
}

async function sendPasswordResetEmail(email, username, link) {
  const html = `
    <div style="font-family: monospace; background: #000; color: #00ff88; padding: 24px;">
      <h2>RESET_PASSWORD // ${username.toUpperCase()}</h2>
      <p style="color: #ccc;">A password reset was requested for this account.</p>
      <a href="${link}" style="display:inline-block; margin-top:16px; padding:12px 24px; background:#00ff88; color:#000; text-decoration:none; font-weight:bold;">
        RESET_PASSWORD
      </a>
      <p style="color: #666; margin-top: 24px; font-size: 12px;">This link expires in 15 minutes. If you didn't request this, ignore this email — your password won't change.</p>
    </div>
  `;

  await sendMail({
    to: email,
    subject: "Reset your DevUps password",
    html,
  });
}

module.exports = { sendVerificationEmail, sendPasswordResetEmail };