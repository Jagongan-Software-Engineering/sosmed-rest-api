const Joi = require("joi");
const User = require("../models/user.model");

exports.validateRegister = async (req, res, next) => {
  const registerScheme = Joi.object().keys({
    username: Joi.string().required(),
    email: Joi.string().required().email(),
    fullname: Joi.string().required(),
    password: Joi.string().required(),
  });
  const result = registerScheme.validate(req.body, { abortEarly: false });
  console.log(result);
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
      const username = await User.findOne({ username: req.body.username });
      const email = await User.findOne({ email: req.body.email });
      if (username || email) {
        return res.status(400).json({
          status: false,
          message: "Duplicate field",
          data: {
            username: username ? "Username sudah ada" : undefined,
            email: email ? "Email sudah ada" : undefined,
          },
        });
      } else {
        next();
      }
    } catch (err) {
      return res.status(500).json({
        status: false,
        message: "Server Error",
      });
    }
  }
};

exports.validateLogin = (req, res, next) => {
  const loginScheme = Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().min(8).required(),
  });
  const result = loginScheme.validate(req.body, { abortEarly: false });
  if (result.error) {
    const { details } = result.error;
    let pesan = [];
    details.map((i) => pesan.push({ [i.context.key]: i.message }));
    res.status(400).json({
      status: false,
      message: "Invalid request",
      data: pesan,
    });
  } else {
    next();
  }
};
