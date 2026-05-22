const appError = require("../utils/appError");
const asyncHandler = require("../utils/asyncHandler");
const userModel = require("../models/user.model");

const getProfile = asyncHandler(async function (req, res) {
  const username = req.params.username;
  const user = await userModel
    .findOne({ username })
    .select("-passwordHash -githubId -isEmailVerified -role");
  if (!user) {
    throw new appError("user not found", 404);
  }
  res.status(200).json({
    status: "success",
    data: {
      user,
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
  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) updates[field] = req.body[field];
  });
  if (Object.keys(updates).length === 0) {
    throw new appError("No valid fields provided to update", 400);
  }
  const updatedUser = await userModel
    .findByIdAndUpdate(req.user.id, updates, { new: true, runValidators: true })
    .select("-passwordHash -githubId -isEmailVerified -role");
  if (!updatedUser) {
    throw new appError("user not founded", 404);
  }
  return res.status(200).json({
    message: "User data updated",
    data: {
      user: updatedUser,
    },
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

module.exports = {
  getProfile,
  updateProfile,
  deleteProfile,
};
