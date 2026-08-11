const appError = require("../utils/appError");
const asyncHandler = require("../utils/asyncHandler");
const userModel = require("../models/user.model");
const { getGithubHeatmap } = require("../services/github.service");
const {
  getUserSolved,
  getUserCalender,
} = require("../services/leetcode.service");
const { getLevelProgress } = require("../services/xp.service");
const { validateHandle } = require("../services/platformValidation.service");

const PLATFORM_FIELD_MAP = {
  githubUsername: "github",
  leetcodeUsername: "leetcode",
  codeforcesHandle: "codeforces",
};

const validateHandleEndpoint = asyncHandler(async function (req, res) {
  const { field, value } = req.body;
  const platform = PLATFORM_FIELD_MAP[field];
  if (!platform) {
    throw new appError("Invalid field", 400);
  }
  const result = await validateHandle(platform, value);
  return res.status(200).json({
    status: "success",
    ...result,
  });
});

const getProfile = asyncHandler(async function (req, res) {
  const userId = req.params.userId;
  const user = await userModel
    .findOne({ _id: userId })
    .select("-passwordHash -githubId -isEmailVerified -role");
  if (!user) {
    throw new appError("user not found", 404);
  }
  const { currentXP, requiredXP } = getLevelProgress(user.xp);
  res.status(200).json({
    status: "success",
    data: {
      user: { ...user.toObject(), currentXP, requiredXP },
    },
  });
});

const updateProfile = asyncHandler(async function (req, res) {
  const allowedFields = [
    "username",
    "avatar",
    "leetcodeUsername",
    "githubUsername",
    "codeforcesHandle",
  ];
  const updates = {};
  const failures = {};

  for (const field of allowedFields) {
    if (req.body[field] === undefined) continue;

    if (PLATFORM_FIELD_MAP[field]) {
      const platform = PLATFORM_FIELD_MAP[field];
      const result = await validateHandle(platform, req.body[field]);
      if (result.valid) {
        updates[field] = result.username;
      } else {
        failures[field] = result.reason;
      }
    } else {
      updates[field] = req.body[field];
    }
  }

  if (Object.keys(updates).length === 0) {
    throw new appError("No valid fields provided to update", 400);
  }

  const updatedUser = await userModel
    .findByIdAndUpdate(req.user.id, updates, {
      returnDocument: "after",
      runValidators: true,
    })
    .select("-passwordHash -githubId -isEmailVerified -role");
  if (!updatedUser) {
    throw new appError("user not founded", 404);
  }
  return res.status(200).json({
    message:
      Object.keys(failures).length > 0
        ? "User data partially updated"
        : "User data updated",
    data: {
      user: updatedUser,
    },
    failures,
  });
});

const deleteProfile = asyncHandler(async function (req, res) {
  const deleteUser = await userModel.findByIdAndDelete(req.user.id);
  if (!deleteUser) {
    throw new appError("User not founded", 404);
  }
  res.clearCookie("token");
  return res.status(200).json({
    message: "Profile deleted",
    status: "success",
  });
});

const getHeatmap = asyncHandler(async function (req, res) {
  const userId = req.params.userId;
  const user = await userModel.findById(userId).select("githubUsername");
  if (!user) {
    throw new appError("User not found", 404);
  }
  if (!user.githubUsername) {
    throw new appError("No GitHub account linked", 400);
  }
  const heatmap = await getGithubHeatmap(user.githubUsername);
  return res.status(200).json({
    status: "success",
    heatmap,
  });
});

const searchUser = asyncHandler(async function (req, res) {
  const q = req.query.q;
  if (!q || q.trim() === "") throw new appError("Query is empty", 400);
  const query = q.toLowerCase();
  const users = await userModel
    .find({ username: { $regex: query } })
    .select("username avatar level")
    .limit(5);
  return res.status(200).json({
    status: "success",
    users,
  });
});

const getLeetcodeStats = asyncHandler(async function (req, res) {
  const userId = req.params.userId;
  const user = await userModel.findById(userId).select("leetcodeUsername");
  if (!user) {
    throw new appError("User not found", 404);
  }
  if (!user.leetcodeUsername) {
    throw new appError("Leetcode not linked", 400);
  }
  const leetStats = await getUserSolved(user.leetcodeUsername);
  return res.status(200).json({
    status: "success",
    leetStats,
  });
});

const getLeetCalander = asyncHandler(async function (req, res) {
  const userId = req.params.userId;
  const user = await userModel.findById(userId).select("leetcodeUsername");
  if (!user) {
    throw new appError("User not found", 404);
  }
  if (!user.leetcodeUsername) {
    throw new appError("Leetcode not linked", 400);
  }
  const leetCalander = await getUserCalender(user.leetcodeUsername);
  return res.status(200).json({
    status: "success",
    leetCalander,
  });
});
module.exports = {
  getProfile,
  updateProfile,
  deleteProfile,
  getHeatmap,
  searchUser,
  getLeetcodeStats,
  getLeetCalander,
  validateHandleEndpoint,
};
