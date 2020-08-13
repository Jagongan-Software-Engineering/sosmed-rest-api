const Joi = require("joi");
const Post = require("../models/post.model");

const validateCommentPost = async (req, res, next) => {
  const postScheme = Joi.object().keys({
    post_id: Joi.string().required(),
    comment: Joi.string().required(),
  });
  const result = postScheme.validate(req.body, { abortEarly: false });
  if (result.error) {
    const { details } = result.error;
    let pesan = [];
    details.map((i) => pesan.push({ [i.context.key]: i.message }));
    return res.status(400).json({
      status: false,
      message: "Invalid request",
      data: pesan,
    });
  } else {
    try {
      const post = await Post.findById(req.body.post_id);
      if (post) {
        next();
      } else {
        return res.status(404).json({
          status: false,
          message: "Post withnrequired id not found",
        });
      }
    } catch (err) {
      return res.status(500).json({
        status: false,
        message: "Server error",
        data: err.stack,
      });
    }
  }
};

const validateCommentDelete = (req, res, next) => {
  const postScheme = Joi.object().keys({
    comment_id: Joi.string().required(),
  });
  const result = postScheme.validate(req.body, { abortEarly: false });
  if (result.error) {
    const { details } = result.error;
    let pesan = [];
    details.map((i) => pesan.push({ [i.context.key]: i.message }));
    return res.status(400).json({
      status: false,
      message: "Invalid request",
      data: pesan,
    });
  } else {
    next();
  }
};

const validateCommentGet = (req, res, next) => {
  const postScheme = Joi.object().keys({
    post_id: Joi.string().required(),
  });
  const result = postScheme.validate(req.query, { abortEarly: false });
  if (result.error) {
    const { details } = result.error;
    let pesan = [];
    details.map((i) => pesan.push({ [i.context.key]: i.message }));
    return res.status(400).json({
      status: false,
      message: "Invalid request",
      data: pesan,
    });
  } else {
    next();
  }
};

module.exports = {
  validateCommentPost,
  validateCommentDelete,
  validateCommentGet,
};
