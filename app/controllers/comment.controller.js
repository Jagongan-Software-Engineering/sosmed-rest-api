const { getUserByToken } = require("../helper/auth");
const Comment = require("../models/comment.model");
const FirebaseToken = require("../models/firebaseToken.model");
const { sendNotification } = require("../helper/firebase");
const Post = require("../models/post.model");

const postComment = async (req, res) => {
  try {
    const { comment, post_id } = req.body;
    const post = await Post.findById(post_id);
    if (!post) {
      return res
        .status(404)
        .json({ status: false, message: "Post with requested id not found" });
    }
    const user = await getUserByToken(req);
    const dataComment = new Comment({
      post_id: post_id,
      comment: comment,
      user_id: user._id,
    });
    const commentResponse = await dataComment.save();
    if (commentResponse) {
      const tokenResult = await FirebaseToken.find({ user_id: post.user_id });
      const tokens = [];
      tokenResult.forEach((token) => {
        tokens.push(token.token);
      });
      const message = `${user.username} berkomentar di foto kamu.`;
      sendNotification(tokens, message);
      return res.send({
        status: true,
        message: "Comment posted",
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "Server error",
      data: err.stack,
    });
  }
};

const deleteComment = async (req, res) => {
  try {
    const user = await getUserByToken(req);
    const { comment_id } = req.body;
    const comment = await Comment.findOneAndDelete({
      _id: comment_id,
      user_id: user._id,
    });
    if (comment) {
      return res.send({ status: true, message: "Comment deleted" });
    } else {
      return res.status(404).json({
        status: false,
        messsage: "Comment with required id and auth token not found",
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "Server error",
      data: err.stack,
    });
  }
};

const getComment = async (req, res) => {
  try {
    const { post_id } = req.query;
    const comments = await Comment.find({ post_id }).populate(
      "user_id",
      "fullname",
      "user"
    );
    if (comments) {
      return res.send({
        status: true,
        message: "Get all comment",
        data: { comments },
      });
    } else {
      return res.status(404).json({
        status: false,
        message: "Comment with request post id not found",
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "Server error",
      data: err.stack,
    });
  }
};

module.exports = { postComment, deleteComment, getComment };
