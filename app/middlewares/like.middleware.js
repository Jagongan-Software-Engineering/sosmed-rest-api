const Joi = require("joi");
const { getUserByToken } = require("../helper/auth");
const Like = require("../models/like.model");

const validateLike = async (req, res, next) => {
  const likeScheme = Joi.object().keys({
    post_id: Joi.string().required(),
  });
  const result = likeScheme.validate(req.body, { abortEarly: false });
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
    const user = await getUserByToken(req);
    const filter = { user_id: user._id, post_id: req.body.post_id };
    const like = await Like.findOne(filter);
    if (like) {
      return res.status(400).json({
        status: false,
        message: "Post already liked",
      });
    } else {
      next();
    }
  }
};

const validateDislike = async (req, res, next) => {
  const likeScheme = Joi.object().keys({
    post_id: Joi.string().required(),
  });
  const result = likeScheme.validate(req.body, { abortEarly: false });
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
    const user = await getUserByToken(req);
    const filter = { user_id: user._id, post_id: req.body.post_id };
    const like = await Like.findOne(filter);
    if (like) {
      next();
    } else {
      return res.status(400).json({
        status: false,
        message: "Post not liked",
      });
    }
  }
};

module.exports = { validateLike, validateDislike };
