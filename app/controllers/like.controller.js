const { getUserByToken } = require("../helper/auth");
const Like = require("../models/like.model");
const Post = require("../models/post.model");
const FirebaseToken = require("../models/firebaseToken.model");
const { sendNotification } = require("../helper/firebase");

const like = async (req, res) => {
  try {
    const { post_id } = req.body;
    const post = await Post.findById(post_id);
    if (!post) {
      return res
        .status(404)
        .json({ status: false, message: "Post with requested id not found" });
    }
    const user = await getUserByToken(req);
    const like = new Like({ post_id, user_id: user._id });
    const dataLike = await like.save();
    if (dataLike) {
      const tokenResult = await FirebaseToken.find({ user_id: post.user_id });
      const tokens = [];
      tokenResult.forEach((token) => {
        tokens.push(token.token);
      });
      const message = `${user.username} menyukai foto kamu.`;
      sendNotification(tokens, message);
      return res.send({
        status: true,
        message: "Like success",
      });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ status: false, message: "Server error", data: err.stack });
  }
};

const dislike = async (req, res) => {
  try {
    const { post_id } = req.body;
    const post = await Post.findById(post_id);
    if (!post) {
      return res
        .status(404)
        .json({ status: false, message: "Post with requested id not found" });
    }
    const user = await getUserByToken(req);
    const dislike = await Like.findOneAndDelete({
      post_id: post_id,
      user_id: user._id,
    });
    if (dislike) {
      return res.send({
        status: true,
        message: "Dislike success",
      });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ status: false, message: "Server error", data: err.stack });
  }
};

module.exports = { like, dislike };
