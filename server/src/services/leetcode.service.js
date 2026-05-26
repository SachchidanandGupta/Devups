const axios = require("axios");

const LEETCODE_API = "https://leetcode.com/graphql";
const getUserSolvedQuery = `query getUserSolved($username: String!) {
  matchedUser(username: $username) {
    submitStats {
      acSubmissionNum {
        difficulty
        count
      }
    }
  }
}
`;

const getUserCalenderQuery = `query getUserCalendar($username: String!) {
  matchedUser(username: $username) {
    userCalendar {
      submissionCalendar
    }
  }
}`;

async function getUserSolved(username) {
  try {
    const { data } = await axios.post(
      LEETCODE_API,
      {
        query: getUserSolvedQuery,
        variables: { username },
      },
      {
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "Mozilla/5.0",
        },
      },
    );
    if (data.errors) {
      throw new Error(data.errors[0].message);
    }
    if (!data.data.matchedUser) {
      throw new Error("user not found" + username);
    }
    const acSubmissions = data.data.matchedUser.submitStats.acSubmissionNum;
    return {
      easy: acSubmissions.find((s) => s.difficulty === "Easy")?.count || 0,
      medium: acSubmissions.find((s) => s.difficulty === "Medium")?.count || 0,
      hard: acSubmissions.find((s) => s.difficulty === "Hard")?.count || 0,
    };
  } catch (error) {
    console.error(error.response?.data || error.message);
    throw error;
  }
}

async function getUserCalender(username) {
  try {
    const { data } = await axios.post(
      LEETCODE_API,
      {
        query: getUserCalenderQuery,
        variables: { username },
      },
      {
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "Mozilla/5.0",
        },
      },
    );
    if (data.errors) {
      throw new Error(data.errors[0].message);
    }
    if (!data.data.matchedUser) {
      throw new Error("user not found" + username);
    }
    const calendarString =
      data.data.matchedUser.userCalendar.submissionCalendar;
    return JSON.parse(calendarString);
  } catch (error) {
    console.error(error.response?.data || error.message);
    throw error;
  }
}

module.exports = {
  getUserCalender,
  getUserSolved,
};
