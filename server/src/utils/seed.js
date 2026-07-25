require("dotenv").config();
const axios = require("axios");
const problemModel = require("../models/problem.model");
const connectToDB = require("../config/db");
const QUESTION_URL =
  "https://raw.githubusercontent.com/noworneverev/leetcode-api/refs/heads/main/data/leetcode_questions.json";

function getLeetcodeTitleSlug(urlString) {
  try {
    const url = new URL(urlString);
    const pathSegments = url.pathname
      .split("/")
      .filter((segment) => segment.length > 0);
    const problemsIndex = pathSegments.indexOf("problems");
    if (problemsIndex !== -1 && pathSegments[problemsIndex + 1]) {
      return pathSegments[problemsIndex + 1];
    }
    return null;
  } catch (error) {
    return null;
  }
}
async function getAllLeetQuestions() {
  try {
    await connectToDB();
    const { data: questions } = await axios.get(QUESTION_URL);
    const formattedQuestions = questions.map((entry) => {
      const question = entry.data.question;
      const stats = JSON.parse(question.stats);
      const acRate = parseFloat(stats.acRate);
      const titleSlug = getLeetcodeTitleSlug(question.url)
      return {
        questionFrontendId: question.questionFrontendId,
        title: question.title,
        titleSlug,
        difficulty: question.difficulty,
        acRate: acRate,
        topicTags: question.topicTags || [],
        url: question.url,
      };
    });
    await problemModel.deleteMany({});
    await problemModel.insertMany(formattedQuestions);
    console.log(`Successfully inserted ${formattedQuestions.length} problems`);
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error.message);
    process.exit(1);
  }
}

getAllLeetQuestions();
