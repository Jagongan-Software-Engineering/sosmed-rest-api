const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.user;

exports.getUserByToken = async (req) => {
  const token = req.headers["authorization"].split(" ")[1];
  try {
    const user = jwt.verify(token, process.env.JWT_TOKEN);
    if (user) {
      const dataUser = await User.findOne({ username: user.username });
      return dataUser;
    }
  } catch (err) {
    return null;
  }
};
