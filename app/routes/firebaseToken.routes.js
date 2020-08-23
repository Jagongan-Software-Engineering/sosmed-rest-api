const router = require("express").Router();
const firebaseTokenRoutes = require("express").Router();
const authMiddelware = require("../middlewares/auth.middleware");
const firebaseTokenMiddleware = require("../middlewares/firebaseToken.middleware");
const firebaseTokenController = require("../controllers/firebase.controller");

router.post(
  "/",
  authMiddelware.validateToken,
  firebaseTokenMiddleware.validateToken,
  firebaseTokenController.sendToken
);

firebaseTokenRoutes.use("/firebaseToken", router);

module.exports = firebaseTokenRoutes;
