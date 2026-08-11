const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const asyncHandler = require("../utils/asyncHandler");
const appError = require("../utils/appError");
const { getLevelProgress } = require("../services/xp.service");
const { sendVerificationEmail } = require("../services/mail.service");

function issueAuthCookie(res, user) {
  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 24 * 60 * 60 * 1000,
  });
}

function issueVerificationToken(userId) {
  return jwt.sign(
    { id: userId, purpose: "email_verification" },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
  );
}

async function dispatchVerificationEmail(user) {
  const verifyToken = issueVerificationToken(user._id);
  const link = `${process.env.CLIENT_URL}/verify-email?token=${verifyToken}`;
  await sendVerificationEmail(user.email, user.username, link);
}

const registerUser = asyncHandler(async function (req, res) {
  const { username, email, password } = req.body;

  const isUserExists = await userModel.findOne({
    $or: [{ email }, { username }],
  });

  if (isUserExists) {
    if (isUserExists.isEmailVerified) {
      throw new appError("User already exists.", 409);
    }
    isUserExists.username = username;
    isUserExists.email = email;
    isUserExists.passwordHash = password;
    await isUserExists.save();

    await dispatchVerificationEmail(isUserExists);

    return res.status(201).json({
      message: "Registration successful — check your email to verify your account.",
      status: "success",
      user: {
        id: isUserExists._id,
        email: isUserExists.email,
        username: isUserExists.username,
      },
    });
  }

  const user = await userModel.create({
    username,
    email,
    passwordHash: password,
  });

  await dispatchVerificationEmail(user);

  res.status(201).json({
    message: "Registration successful — check your email to verify your account.",
    status: "success",
    user: {
      id: user._id,
      email: user.email,
      username: user.username,
    },
  });
});

const loginUser = asyncHandler(async function (req, res) {
  const { identifier, password } = req.body;
  const user = await userModel
    .findOne({
      $or: [{ username: identifier }, { email: identifier }],
    })
    .select("+passwordHash");

  if (!user) {
    throw new appError("Invalid credentials", 401);
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new appError("Invalid credentials", 401);
  }

  if (!user.isEmailVerified) {
    throw new appError("Please verify your email before logging in", 403);
  }

  issueAuthCookie(res, user);
  res.status(200).json({
    message: "User logged in ",
    user: {
      username: user.username,
      id: user._id,
    },
  });
});

const verifyEmail = asyncHandler(async function (req, res) {
  const { token } = req.query;
  if (!token) {
    throw new appError("Verification token is required", 400);
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    throw new appError("Verification link is invalid or has expired", 400);
  }

  if (decoded.purpose !== "email_verification") {
    throw new appError("Invalid verification token", 400);
  }

  const user = await userModel.findById(decoded.id);
  if (!user) {
    throw new appError("User not found", 404);
  }

  if (!user.isEmailVerified) {
    user.isEmailVerified = true;
    await user.save();
  }

  issueAuthCookie(res, user);
  res.status(200).json({
    message: "Email verified successfully",
    status: "success",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
});

const resendVerification = asyncHandler(async function (req, res) {
  const { identifier } = req.body;
  if (!identifier) {
    throw new appError("Email or username is required", 400);
  }

  const user = await userModel.findOne({
    $or: [{ email: identifier }, { username: identifier }],
  });
  if (!user) {
    return res.status(200).json({
      message: "If that account exists, a verification link has been sent.",
      status: "success",
    });
  }

  if (user.isEmailVerified) {
    throw new appError("This email is already verified", 400);
  }

  await dispatchVerificationEmail(user);
  res.status(200).json({
    message: "If that account exists, a verification link has been sent.",
    status: "success",
  });
});

const getMeUser = asyncHandler(async function (req, res) {
  const user = await userModel.findById(req.user.id);
  const { currentXP, requiredXP, level } = getLevelProgress(user.xp);
  if (!user) {
    throw new appError("User not found", 404);
  }
  return res.status(200).json({
    message: "user data fetched successfully",
    user: {
      ...user.toObject(),
      currentXP,
      requiredXP,
    },
  });
});

const logOutUser = asyncHandler(async function (req, res) {
  const token = req.cookies.token;
  if (!token) {
    throw new appError("Token not provided,unauthorizes access", 401);
  }

  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });
  return res.status(200).json({
    message: "User logged out successfully",
  });
});

module.exports = {
  registerUser,
  loginUser,
  verifyEmail,
  resendVerification,
  getMeUser,
  logOutUser,
};