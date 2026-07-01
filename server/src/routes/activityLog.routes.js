const { Router } = require("express");

const { getRecentActivity, getUserActivity } = require("../controllers/activityLog.controller");
const { authUser } = require("../middlewares/auth.middleware");

const router = Router();

router.get("/:userId",getUserActivity);
router.get("/",authUser,getRecentActivity);

module.exports = router;