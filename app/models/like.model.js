const mongoose = require("mongoose");

const Like = mongoose.model(
  "like",
  mongoose.Schema(
    {
      post_id: { type: mongoose.Schema.Types.ObjectId, ref: "post" },
      user_id: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    },
    { timestamps: true }
  )
);

module.exports = Like;
