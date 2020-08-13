const mongoose = require("mongoose");
const { string } = require("joi");

const Comment = mongoose.model(
  "comment",
  mongoose.Schema(
    {
      post_id: { type: mongoose.Schema.Types.ObjectId, ref: "post" },
      user_id: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
      comment: { type: String, required: true },
    },
    { timestamps: true }
  )
);

module.exports = Comment;
