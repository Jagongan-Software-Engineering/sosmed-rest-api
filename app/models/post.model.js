const mongoose = require("mongoose");

const Post = mongoose.model(
  "post",
  mongoose.Schema(
    {
      imgsrc: {
        type: String,
        required: true,
      },
      user_id: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
      caption: { type: String },
    },
    { timestamps: true }
  )
);

module.exports = Post;
