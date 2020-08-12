const { getUserByToken } = require("../helper/auth");
const FirebaseToken = require("../models/firebaseToken.model");

const sendToken = async (req, res) => {
  try {
    const user = await getUserByToken(req);
    const firebaseToken = new FirebaseToken({
      user_id: user._id,
      token: req.body.token,
    });
    const result = await firebaseToken.save();
    if (result)
      return res.send({
        status: true,
        messsage: "Firebase token sent",
        data: result,
      });
  } catch (err) {
    return res.send({
      status: false,
      message: "Server error",
      data: err.stack,
    });
  }
};

module.exports = { sendToken };
