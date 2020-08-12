const postController = require("../controllers/post.controller");
const postMiddlewares = require("../middlewares/post.middlewares");
const authMiddlewares = require("../middlewares/auth.middleware");

const router = require("express").Router();
const postRoutes = require("express").Router();

router.post(
  "/",
  authMiddlewares.validateToken,
  postMiddlewares.validatePost,
  postController.post
);

router.patch(
  "/",
  authMiddlewares.validateToken,
  postMiddlewares.validateUpdate,
  postController.update
);

router.delete(
  "/",
  authMiddlewares.validateToken,
  postMiddlewares.validateDelete,
  postController.remove
);

router.get("/me", authMiddlewares.validateToken, postController.getMyPost);

router.get("/:page", authMiddlewares.validateToken, postController.getAll);
router.get("/", authMiddlewares.validateToken, postController.getAll);

postRoutes.use("/post", router);

module.exports = postRoutes;
