const { Router } = require("express");

const router = Router();
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/search",authMiddleware.authUser,userController.searchUser);
router.get("/:userId/heatmap", userController.getHeatmap);
router.get("/:userId/leet-stats",authMiddleware.authUser,userController.getLeetcodeStats);
router.get("/:userId/leet-calander",authMiddleware.authUser,userController.getLeetCalander);
router.get("/:userId", userController.getProfile);
router.put("/update", authMiddleware.authUser, userController.updateProfile);
router.delete("/delete", authMiddleware.authUser, userController.deleteProfile);

module.exports = router;
