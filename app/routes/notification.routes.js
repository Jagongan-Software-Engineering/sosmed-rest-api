const { validateToken } = require("../middlewares/auth.middleware");

const router = require("express").Router();
const notificationRoutes = require("express").Router();
const authMiddelware = require("../middlewares/auth.middleware");
const notificationController = require("../controllers/notification.controller");

router.get(
  "/",
  authMiddelware.validateToken,
  notificationController.getNotifications
);

notificationRoutes.use("/notification", router);

module.exports = notificationRoutes;
