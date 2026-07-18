require("dotenv").config();
const axios = require("axios");
const problemModel = require("../models/problem.model");
const connectToDB = require("../config/db");
const QUESTION_URL =
  "https://raw.githubusercontent.com/noworneverev/leetcode-api/refs/heads/main/data/leetcode_questions.json";

async function getAllLeetQuestions() {
  try {
   await connectToDB();
    const { data: questions } = await axios.get(QUESTION_URL);
    const formattedQuestions = questions.map((entry) => {
      const question = entry.data.question;
      const stats = JSON.parse(question.stats);
      const acRate = parseFloat(stats.acRate);
      return {
        questionFrontendId: question.questionFrontendId,
        title: question.title,
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
