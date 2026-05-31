const userModel = require("../models/user.model");

const jwt = require("jsonwebtoken");

const asyncHandler = require("../utils/asyncHandler");

const appError = require("../utils/appError");

const registerUser = asyncHandler(async function (req, res) {
  const { username, email, password } = req.body;

  const isUserExists = await userModel.findOne({
    $or: [{ email }, { username }],
  });

  if (isUserExists) {
    throw new appError("User already exists.",409);
  }
  const user = await userModel.create({
    username,
    email,
    passwordHash: password,
  });
  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.status(201).json({
    message: "user registered successfully",
    status: "success",
    user: {
      id: user._id,
      email: user.email,
      username: user.username,
    },
  });
})


const loginUser = asyncHandler(async function (req, res) {
  const { identifier, password } = req.body;
  const user = await userModel
    .findOne({
      $or: [{ username: identifier }, { email: identifier }],
    })
    .select("+passwordHash");

  if (!user) {
    throw new appError("Invalid credentials",401);
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new appError("Invalid credentials",401)
  }

  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.status(200).json({
    message: "User logged in ",
    user: {
      username: user.username,
      email: user.email,
      id: user._id,
    },
  });
})


const getMeUser = asyncHandler(async function (req, res) {
  const user = await userModel.findById(req.user.id);
  if (!user) {
    throw new appError("User not found",404)
  }
  return res.status(200).json({
    message: "user data fetched successfully",
    user,
  });
})

const logOutUser = asyncHandler(async function (req, res) {
  const token = req.cookies.token;
  if (!token) {
    throw new appError("Token not provided,unauthorizes access",401);
  }

  res.clearCookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    path:"/login",
  });
  return res.status(200).json({
    message: "User logged out successfully",
  });
})

module.exports = {
  registerUser,
  loginUser,
  getMeUser,
  logOutUser,
};
