const axios = require("axios");

const GITHUB_API = "https://api.github.com/graphql";

const getUserGitCalenderQuery = `query($username: String!) {
  user(login: $username) {
    contributionsCollection {
      totalCommitContributions
      totalPullRequestContributions
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

async function fetchContributionsCollection(username) {
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
  const { contributionsCollection } = data.data.user;
  if (!contributionsCollection) {
    throw new Error("No contribution data returned");
  }
  return contributionsCollection;
}

async function getGithubHeatmap(username) {
  try {
    const contributionsCollection =
      await fetchContributionsCollection(username);
    const weeks = contributionsCollection.contributionCalendar.weeks;
    if (!weeks) {
      throw new Error("No contribution data returned");
    }
    return weeks.flatMap((week) => week.contributionDays);
  } catch (error) {
    console.error(error.response?.data?.message || error.message);
    throw error;
  }
}

async function getGithubContributionStats(username) {
  try {
    const contributionsCollection =
      await fetchContributionsCollection(username);
    return {
      totalCommitContributions:
        contributionsCollection.totalCommitContributions,
      totalPullRequestContributions:
        contributionsCollection.totalPullRequestContributions,
    };
  } catch (error) {
    console.error(error.response?.data?.message || error.message);
    throw error;
  }
}

module.exports = {
  getGithubHeatmap,
  getGithubContributionStats,
};
