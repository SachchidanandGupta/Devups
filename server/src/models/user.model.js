const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");


  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const userSchema = new mongoose.Schema(
  {
    /** Core identity fields  */
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [emailRegex, "Please enter a valid email address"],
      trim: true,
      lowercase: true,
    },
    passwordHash: {
      type: String,
      required: function () {
        return !this.githubId;
      }, // it is used for third party github login the password would be required while login without github
      select: false,
    },
    avatar: {
      type: String,
      default: null,
    },
    /** Platform usernames  */
    leetcodeUsername: {
      type: String,
      default: null,
    },
    githubUsername: {
      type: String,
      default: null,
    },
    codeforcesHandle: {
      type: String,
      default: null,
    },
    /** XP & gamification  */
    xp: {
      type: Number,
      default: 0,
    },
    level: {
      type: Number,
      default: 1,
    },
    streak: {
      type: Number,
      default: 0,
    },
    maxStreak: {
      type: Number,
      default: 0,
    },
    lastSolvedDate: {
      type: Date,
      default: null,
    },
    /** Auth  */
    githubId: {
      type: String,
      default: undefined, // uset undefined so that we can get github as undefined as null raise the duplicate error
      unique: true,
      sparse: true,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function () {
  if (!this.isModified("passwordHash") || !this.passwordHash) return ; // when a user login via github this.password would be undefined and return an err
   this.passwordHash = await bcrypt.hash(this.passwordHash,10);
});

userSchema.methods.comparePassword = async function (password) {
  if (!this.passwordHash) return false;
  return bcrypt.compare(password, this.passwordHash);
};

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
