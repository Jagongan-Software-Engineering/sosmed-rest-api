const { getUserByToken } = require("../helper/auth");
const Post = require("../models/post.model");
const baseurl = require("../helper/baseurl");
const Comment = require("../models/comment.model");
const Like = require("../models/like.model");
const User = require("../models/user.model");
const { uploadImage } = require("../helper/firebase");

const post = async (req, res) => {
  try {
    const user = await getUserByToken(req);

    const { image } = req.files;
    const { caption } = req.body;

    const splitedName = image.name.split(".");
    const extension = splitedName[splitedName.length - 1];
    const fileName = `${user._id}-${Date.now()}.${extension}`;
    await image.mv(`./uploads/${fileName}`);
    image.name = fileName;
    const urlImage = await uploadImage(image);
    const post = await new Post({
      imgsrc: urlImage,
      caption: caption,
      user_id: user._id,
    }).save();
    if (post) {
      return res.send({
        status: true,
        message: "Posting success",
        data: post,
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

const update = async (req, res) => {
  try {
    const user = await getUserByToken(req);
    const { id, caption } = req.body;
    const filter = {
      _id: id,
      user_id: user._id,
    };
    const updatePost = await Post.findOneAndUpdate(filter, {
      caption,
    });
    if (updatePost) {
      return res.send({
        status: true,
        message: "Update post success",
      });
    } else {
      return res.status(404).json({
        status: false,
        message: "Post with authentication token not found",
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

const remove = async (req, res) => {
  try {
    const user = await getUserByToken(req);
    const { id } = req.body;
    const filter = {
      user_id: user._id,
      _id: id,
    };
    const deletePost = await Post.findOneAndDelete(filter);
    if (deletePost) {
      return res.send({
        status: true,
        message: "Delete post success",
      });
    } else {
      return res.status(404).json({
        status: false,
        message: "Post with authentication token not found",
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

const getAll = async (req, res) => {
  try {
    let { page } = req.params;
    page = page ? page : 0;
    const index = page * 5;
    const user = await getUserByToken(req);
    const posts = await Post.find({}, "-__v", {
      sort: { createdAt: -1 },
      skip: index,
      limit: 5,
    })
      .populate("user_id", "fullname email username profilePicture", "user")
      .lean();

    await Promise.all(
      posts.map(async (post) => {
        let likes = await Like.find({
          post_id: post._id,
        });
        let comments = await Comment.find({ post_id: post._id });
        post.isLiked = likes.some(
          (like) => like.user_id.toString() == user._id.toString()
        );
        post.totalLike = likes.length;
        post.totalComment = comments.length;
        post.imgsrc = `${baseurl.url}/image/${post.imgsrc}`;
      })
    );

    let nextUrl = null;
    if (posts.length == 5) {
      const nextPage = parseInt(page) + 1;
      nextUrl = `${baseurl.url}/post/${nextPage}`;
    }
    return res.send({
      status: true,
      message: "Get all post",
      data: { nextUrl, posts },
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "Server error",
      data: err.stack,
    });
  }
};

const getMyPost = async (req, res) => {
  try {
    const user = await getUserByToken(req);
    const filter = { user_id: user._id };
    const posts = await Post.find(filter, "-__v -user_id", {
      sort: { createdAt: -1 },
    }).lean();

    await Promise.all(
      posts.map(async (post) => {
        let likes = await Like.find({
          post_id: post._id,
        });
        let comments = await Comment.find({ post_id: post._id });
        post.isLiked = likes.some(
          (like) => like.user_id.toString() == user._id.toString()
        );
        post.totalLike = likes.length;
        post.totalComment = comments.length;
        post.imgsrc = `${baseurl.url}/image/${post.imgsrc}`;
      })
    );
    return res.send({
      status: true,
      message: "Get all my post",
      data: {
        posts,
      },
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "Server error",
      data: err.stack,
    });
  }
};

module.exports = { post, update, remove, getAll, getMyPost };
