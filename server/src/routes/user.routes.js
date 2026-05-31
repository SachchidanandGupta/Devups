const { Router } = require("express");

const router = Router();
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/:userId/heatmap", userController.getHeatmap);
router.get("/:userId", userController.getProfile);
router.put("/update", authMiddleware.authUser, userController.updateProfile);
router.delete("/delete", authMiddleware.authUser, userController.deleteProfile);

module.exports = router;
