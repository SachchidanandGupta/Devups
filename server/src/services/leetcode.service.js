const axios = require("axios");
const appError = require("../utils/appError");
const problemModel = require("../models/problem.model");
const LEETCODE_URL = "https://leetcode.com/graphql";
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

const getLeetCodeContestQuery = `query {

upcomingContests {
  title
  startTime
  duration
  }
  }`;

const getDailyQuestionQuery = `query questionOfToday {
  activeDailyCodingChallengeQuestion {
    date
    link
    question {
      questionFrontendId
      title
      titleSlug
      difficulty
      acRate
      content
    }
  }
}`;

const getRecentAcSubmissionQuery = `query recentAcSubmissions($username: String!, $limit: Int!) {
  recentAcSubmissionList(username: $username, limit: $limit) {
    title
    titleSlug
    timestamp
  }
}`;

async function getUserSolved(username) {
  try {
    const { data } = await axios.post(
      LEETCODE_URL,
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
      LEETCODE_URL,
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

async function getLeetCodeContest() {
  try {
    const { data } = await axios.post(
      LEETCODE_URL,
      {
        query: getLeetCodeContestQuery,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "Mozilla/5.0",
        },
      },
    );
    if (!data.data.upcomingContests) {
      throw new Error("No contest data returned");
    }
    return data.data.upcomingContests.map((contest) => ({
      platform: "leetcode",
      title: contest.title,
      startTime: new Date(contest.startTime * 1000), // unix timestamp → Date
      duration: Math.floor(contest.duration / 60),
    }));
  } catch (error) {
    console.error(error.response?.data?.message || error.message);
    throw error;
  }
}

async function getDailyQuestion() {
  try {
    const { data } = await axios.post(
      LEETCODE_URL,
      { query: getDailyQuestionQuery },
      {
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "Mozilla/5.0",
        },
      },
    );
    if (!data.data.activeDailyCodingChallengeQuestion) {
      throw new Error("No daily question data returned");
    }
    const daily = data.data.activeDailyCodingChallengeQuestion;
    const q = daily.question;

    // strip HTML tags for a clean text preview
    const plainDescription = q.content
      .replace(/<[^>]*>/g, " ") // remove HTML tags
      .replace(/&nbsp;/g, " ") // common HTML entity
      .replace(/\s+/g, " ") // collapse whitespace
      .trim();

    const shortDescription =
      plainDescription.slice(0, 200) +
      (plainDescription.length > 200 ? "..." : "");

    return {
      questionNumber: q.questionFrontendId,
      title: q.title,
      difficulty: q.difficulty,
      acRate: q.acRate.toFixed(1),
      description: shortDescription,
      link: `https://leetcode.com${daily.link}`,
    };
  } catch (error) {
    console.error(error.response?.data?.message || error.message);
    throw error;
  }
}

async function getRecentAcSubmission(username, limit) {
  try {
    const { data } = await axios.post(
      LEETCODE_URL,
      { query: getRecentAcSubmissionQuery, variables: { username, limit } },
      {
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "Mozilla/5.0",
        },
      },
    );
    const acSubmissions = data.data.recentAcSubmissionList;
    if (!acSubmissions) {
      throw new Error("No AcSubmission record found");
    }
    return acSubmissions.map((contest) => ({
      title: contest.title,
      titleSlug: contest.titleSlug,
      timestamps: new Date(contest.timestamps * 1000),
    }));
  } catch (error) {
    console.error(error.response?.data?.message || error.message);
    throw error;
  }
}

function escapeRegex(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
async function getSearchProblemsWithTitleOrNumber(query) {
  try {
    const questionList = await problemModel
      .find({
        $or: [
          {
            questionFrontendId: {
              $regex: `^${escapeRegex(query)}`,
              $options: "i",
            },
          },
          { title: { $regex: `${escapeRegex(query)}`, $options: "i" } },
        ],
      })
      .select(
        "questionFrontendId title titleSlug  difficulty acRate topicTags url -_id",
      )
      .limit(10)
      .lean();
    return questionList;
  } catch (error) {
    console.error(error.response?.data?.message || error.message);
    throw error;
  }
}

async function getQuestionsWithTags(tags, query) {
  try {
    const filter = {};
    if (tags && tags.length > 0) {
      filter["topicTags.name"] = { $in: tags };
    }
    if (query && query.trim() !== "") {
      const search = escapeRegex(query.trim());
      filter.$or = [
        { questionFrontendId: { $regex: `^${search}` } },
        { title: { $regex: search, $options: "i" } },
      ];
    }
    const questionList = await problemModel
      .find(filter)
      .select(
        "questionFrontendId title titleSlug difficulty acRate topicTags url -_id",
      )
      .lean();
    return questionList;
  } catch (error) {
    console.error(error.response?.data?.message || error.message);
    throw error;
  }
}

async function getAllTopicTags() {
  try {
    const topicTags = await problemModel.distinct("topicTags.name");
    return topicTags;
  } catch (error) {
    console.error(error.response?.data?.message || error.message);
    throw error;
  }
}

async function getExploreQuestions() {
  try {
    const exploreQuestions = await problemModel.aggregate([
      { $addFields: { numericId: { $toInt: "$questionFrontendId" } } },
      { $sort: { numericId: 1 } },
      { $limit: 50 },
      { $project: { numericId: 0 } },
    ]);
    return exploreQuestions;
  } catch (error) {
    console.error(error.response?.data?.message || error.message);
    throw error;
  }
}
module.exports = {
  getUserCalender,
  getUserSolved,
  getLeetCodeContest,
  getDailyQuestion,
  getRecentAcSubmission,
  getSearchProblemsWithTitleOrNumber,
  getQuestionsWithTags,
  getAllTopicTags,
  getExploreQuestions,
};
