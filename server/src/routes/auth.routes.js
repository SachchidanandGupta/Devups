const express = require("express");

const router = express.Router();

const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.get("/get-me", authMiddleware.authUser, authController.getMeUser);
router.post("/logout", authController.logOutUser);
router.get("/verify-email", authController.verifyEmail);
router.post("/resend-verification", authController.resendVerification);

module.exports = router;
