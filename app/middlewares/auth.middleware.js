const jwt = require("jsonwebtoken");
const db = require("../models/db");
const SessionToken = db.sessionToken;

exports.validateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    return res
      .status(412)
      .json({ status: false, message: "Authorization token required" });
  }
  try {
    const sessionToken = await SessionToken.findOne({ token: token });
    if (!sessionToken) {
      return res.status(404).send({
        status: false,
        message: "Authorization token not valid or not found",
      });
    }
    const user = jwt.verify(token, process.env.JWT_TOKEN);
    if (user) {
      next();
    } else {
      return res.status(401).send({ status: false, message: "Not authorized" });
    }
  } catch (err) {
    return res.status(404).send({
      status: false,
      message: err.message,
    });
  }
};
