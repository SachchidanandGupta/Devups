const axios = require("axios");
const { checkLeetcodeUserExists } = require("./leetcode.service");

const PATTERNS = {
  github: /github\.com\/([a-zA-Z0-9-]+)\/?$/i,
  leetcode: /leetcode\.com\/(?:u\/)?([a-zA-Z0-9_-]+)\/?$/i,
  codeforces: /codeforces\.com\/profile\/([a-zA-Z0-9_-]+)\/?$/i,
};

function extractHandle(platform, rawInput) {
  const input = (rawInput || "").trim();
  if (!input) return null;

  const match = input.match(PATTERNS[platform]);
  if (match) return match[1];

  // not a URL for this platform — treat the whole trimmed input as a bare username,
  // but reject anything that's clearly a URL for a *different* platform or malformed
  if (/^https?:\/\//i.test(input) || input.includes("/")) return null;

  return input;
}

async function checkGithubExists(username) {
  try {
    await axios.get(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
      },
    });
    return true;
  } catch (error) {
    if (error.response?.status === 404) return false;
    throw error;
  }
}

async function checkCodeforcesExists(handle) {
  try {
    const { data } = await axios.get(
      `https://codeforces.com/api/user.info?handles=${handle}`,
    );
    return data.status === "OK";
  } catch (error) {
    // Codeforces returns 400 with status:"FAILED" for an unknown handle, not a network error
    if (error.response?.data?.status === "FAILED") return false;
    throw error;
  }
}

async function validateHandle(platform, rawInput) {
  const username = extractHandle(platform, rawInput);
  if (!username) {
    return { valid: false, username: null, reason: "Could not parse a valid username or URL" };
  }

  try {
    let exists;
    if (platform === "github") exists = await checkGithubExists(username);
    else if (platform === "codeforces") exists = await checkCodeforcesExists(username);
    else if (platform === "leetcode") exists = await checkLeetcodeUserExists(username);
    else throw new Error(`Unknown platform: ${platform}`);

    if (!exists) {
      return { valid: false, username, reason: `No ${platform} account found for "${username}"` };
    }
    return { valid: true, username, reason: null };
  } catch (error) {
    console.error(`Handle validation failed for ${platform}/${username}:`, error.message);
    return { valid: false, username, reason: "Could not verify account right now — try again" };
  }
}

module.exports = { validateHandle, extractHandle };