const Joi = require("joi");
const validateToken = (req, res, next) => {
  const firebaseScheme = Joi.object().keys({
    token: Joi.string().required(),
  });
  const result = firebaseScheme.validate(req.body, { abortEarly: false });
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

module.exports = { validateToken };
