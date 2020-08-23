const { validateToken } = require("../middlewares/auth.middleware");

const router = require("express").Router();
const likeRoutes = require("express").Router();
const authMiddelware = require("../middlewares/auth.middleware");
const likeController = require("../controllers/like.controller");
const likeMiddleware = require("../middlewares/like.middleware");

router.post(
  "/",
  authMiddelware.validateToken,
  likeMiddleware.validateLike,
  likeController.like
);

router.delete(
  "/",
  authMiddelware.validateToken,
  likeMiddleware.validateDislike,
  likeController.dislike
);

likeRoutes.use("/like", router);

module.exports = likeRoutes;
