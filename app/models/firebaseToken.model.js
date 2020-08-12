const mongoose = require("mongoose");

const FirebaseToken = mongoose.model(
  "firebaseToken",
  mongoose.Schema(
    {
      token: { type: String },
      user_id: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    },
    { timestamps: true }
  )
);

module.exports = FirebaseToken;
