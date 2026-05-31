const axios = require("axios");

const GITHUB_API = "https://api.github.com/graphql";
const getUserGitCalenderQuery = `query($username: String!) {
  user(login: $username) {
    contributionsCollection {
      contributionCalendar {
        weeks {
          contributionDays {
            date
            contributionCount
          }
        }
      }
    }
  }
}`;

async function getGithubHeatmap(username) {
  try {
    const { data } = await axios.post(
      GITHUB_API,
      {
        query: getUserGitCalenderQuery,
        variables: { username },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          "Content-Type": "application/json",
        },
      },
    );
    if (!data.data.user) throw new Error("GitHub user not found");
    const weeks =
      data.data.user.contributionsCollection.contributionCalendar.weeks;
    if (!weeks) {
      throw new Error("No contribution data returned");
    }
    return weeks.flatMap((week) => week.contributionDays);
  } catch (error) {
    console.error(error.response?.data?.message || error.message);
    throw error;
  }
}

module.exports = {
  getGithubHeatmap,
};
