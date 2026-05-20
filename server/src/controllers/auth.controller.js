const userModel = require("../models/user.model");

const jwt = require("jsonwebtoken");
async function registerUser(req, res) {
  const { username, email, passwordHash } = req.body;

  const isUserExists = await userModel.findOne({
    $or: [{ email }, { username }],
  });

  if (isUserExists) {
    return res.status(409).json({
      message: "User already exists.",
      status: "failed",
    });
  }
  const user = await userModel.create({
    username,
    email,
    passwordHash,
  });
  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SCERET,
    { expiresIn: "1d" },
  );
  res.cookie("token",token);
  res.status(201).json({
    message:"user registered successfully",
    status:"success",
    user:{
        id:user._id,
        email:user.email,
        username:user.username
    },
    token
  })
}

module.exports = {
  registerUser,
};
