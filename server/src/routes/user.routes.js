const express = require("express");

const router = express.Router();

const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/register",authController.registerUser);
router.post("/login",authController.loginUser);
router.get("/get-me",authMiddleware.authUser,authController.getMeUser);
router.get("/logout",authController.logOutUser);

module.exports = router;