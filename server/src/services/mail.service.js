const nodemailer = require("nodemailer");
const dns = require("dns");
const { promisify } = require("util");
const resolve4 = promisify(dns.resolve4);

async function createTransporter() {
  const [ipv4Address] = await resolve4("smtp.gmail.com");

  return nodemailer.createTransport({
    host: ipv4Address,
    port: 465,
    secure: true,
    tls: {
      servername: "smtp.gmail.com", // required: TLS cert validation needs the real hostname since we're connecting via raw IP
    },
    auth: {
      type: "OAuth2",
      user: process.env.GMAIL_USER,
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
    },
  });
}
async function sendVerificationEmail(email, username, link) {
  const transporter = await createTransporter();

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

  await transporter.sendMail({
    from: `DevUps <${process.env.GMAIL_USER}>`,
    to: email,
    subject: "Verify your DevUps account",
    html,
  });
}

async function sendPasswordResetEmail(email, username, link) {
  const transporter = createTransporter();

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

  await transporter.sendMail({
    from: `DevUps <${process.env.GMAIL_USER}>`,
    to: email,
    subject: "Reset your DevUps password",
    html,
  });
}

module.exports = { sendVerificationEmail, sendPasswordResetEmail };
