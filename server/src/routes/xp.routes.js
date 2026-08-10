const { Router } = require("express");
const xpController = require("../controllers/xp.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = Router();

router.get("/:userId/history", authMiddleware.authUser, xpController.getXpHistory);

module.exports = router;