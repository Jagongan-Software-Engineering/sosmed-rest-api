const { getUserByToken } = require("../helper/auth");
const Like = require("../models/like.model");
const Post = require("../models/post.model");
const Comment = require("../models/comment.model");

const getNotifications = async (req, res) => {
  try {
    const user = await getUserByToken(req);
    const posts = await Post.find({ user_id: user._id });
    let notifications = [];
    let response = [];
    await Promise.all(
      posts.map(async (post) => {
        const likes = await Like.find({
          post_id: post._id,
        })
          .populate("user_id", "profilePicture username", "user")
          .lean();

        const commnets = await Comment.find({ post_id: post._id })
          .populate("user_id", "profilePicture username", "user")
          .lean();
        notifications = notifications.concat(likes);
        notifications = notifications.concat(commnets);
      })
    );

    notifications.sort((a, b) => {
      const notificationsA = a.createdAt;
      const notificationsB = b.createdAt;

      let comparison = 0;
      if (notificationsA < notificationsB) {
        comparison = 1;
      } else if (notificationsA > notificationsB) {
        comparison = -1;
      }

      return comparison;
    });

    res.send({
      status: true,
      message: "Get notifications",
      data: { notifications },
    });
  } catch (err) {
    return res.status(500).send({
      status: false,
      message: "Server error",
      data: err.stack,
    });
  }
};

module.exports = { getNotifications };
