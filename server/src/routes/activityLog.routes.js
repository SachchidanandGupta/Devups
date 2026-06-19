const { Router } = require("express");

const { getRecentActivity } = require("../controllers/activityLog.controller");
const { authUser } = require("../middlewares/auth.middleware");

const router = Router();

router.get("/",authUser,getRecentActivity);

module.exports = router;