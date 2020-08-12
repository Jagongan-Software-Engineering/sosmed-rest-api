const Joi = require("joi");

const validatePost = (req, res, next) => {
  const postScheme = Joi.object().keys({
    caption: Joi.string().required().allow(""),
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
    if (!req.files || !req.files.image) {
      return res.status(400).send({
        status: false,
        message: "Invalid request",
        data: {
          image: "Image field required",
        },
      });
    }
    const extensions = ["png", "jpg", "jpeg"];
    const { image } = req.files;
    if (image == null) {
      return res.status(400).json({
        status: false,
        message: "Invalid request",
        data: {
          image: "Image field not found",
        },
      });
    }
    const splitedName = image.name.split(".");
    const extension = splitedName[splitedName.length - 1];
    if (extensions.includes(extension)) {
      const maxFile = parseInt(process.env.MAX_FILE_SIZE);
      if (image.size > maxFile) {
        return res.status(400).json({
          status: false,
          message: "Please upload file under 2mb",
        });
      } else {
        next();
      }
    } else {
      return res.status(400).json({
        status: false,
        message: "Please upload images file",
      });
    }
  }
};

const validateUpdate = (req, res, next) => {
  const postScheme = Joi.object().keys({
    id: Joi.string().required(),
    caption: Joi.string().required().allow(""),
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
const validateDelete = (req, res, next) => {
  const postScheme = Joi.object().keys({
    id: Joi.string().required(),
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
module.exports = { validatePost, validateUpdate, validateDelete };
