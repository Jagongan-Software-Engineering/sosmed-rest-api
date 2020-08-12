const mongoose = require("mongoose");

const User = mongoose.model(
  "user",
  mongoose.Schema(
    {
      username: {
        type: String,
        required: true,
        unique: true,
      },
      fullname: { type: String, required: true },
      email: { type: String, index: true, unique: true, required: true },
      password: { type: String, required: true },
      profilePicture: { type: String },
      isVerified: Boolean,
    },
    { timestamps: true }
  )
);

module.exports = User;
