const router = require("express").Router();
const commentRoutes = require("express").Router();
const authMiddelware = require("../middlewares/auth.middleware");
const commentMiddleware = require("../middlewares/comment.middleware");
const commentController = require("../controllers/comment.controller");

router.post(
  "/",
  authMiddelware.validateToken,
  commentMiddleware.validateCommentPost,
  commentController.postComment
);

router.delete(
  "/",
  authMiddelware.validateToken,
  commentMiddleware.validateCommentDelete,
  commentController.deleteComment
);

router.get(
  "/",
  authMiddelware.validateToken,
  commentMiddleware.validateCommentGet,
  commentController.getComment
);

commentRoutes.use("/comment", router);

module.exports = commentRoutes;
