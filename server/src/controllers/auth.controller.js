const userModel = require("../models/user.model");

const jwt = require("jsonwebtoken");

async function registerUser(req, res) {
  const { username, email, password } = req.body;

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
    passwordHash:password,
  });
  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
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
    }
  })
}

async function loginUser(req,res){
  const {email,username,password} = req.body;

  const user = await userModel.findOne({
    $or:[
      {username},{email}
    ]
  }).select("+passwordHash");

  if(!user){
    return res.status(401).json({
      message:"Invalid credentials",
      status:"failed"
    })
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if(!isPasswordCorrect){
    return res.status(401).json({
      message:"Invalid credentials"
    })
  }

  const token = jwt.sign({
    id:user._id,
    email:user.email
  },process.env.JWT_SECRET,{expiresIn:"1d"});

  res.cookie("token",token,{
    httpOnly:true,
    secure:process.env.NODE_ENV === "production",
     sameSite: "strict",    
  maxAge: 24 * 60 * 60 * 1000
  });
  res.status(200).json({
    message:"User logged in ",
    user:{
      username:user.username,
      email:user.email,
      id:user._id
    }
  })
}

async function getMeUser(req,res) {
 const user = await userModel.findById(req.user.id);
 if(!user){
  return res.status(404).json({
    message:"user not founded"
  })
 }
  return res.status(200).json({
    message:"user data fetched successfully",
    user
  })

}

async function logOutUser(req,res){
  const token = req.cookies.token;
  if(!token){
    return res.status(401).json({
      message:"Token not provided,unauthorizes access"
    })
  }

  res.clearCookie("token");
  return res.status(200).json({
    message:"User logged out successfully"
  })
}
module.exports = {
  registerUser,
  loginUser,
  getMeUser,
  logOutUser
};
