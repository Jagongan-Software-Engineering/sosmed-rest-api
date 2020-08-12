const mongoose = require("mongoose");

const SessionToken = mongoose.model(
  "sessiontoken",
  mongoose.Schema(
    {
      token: { type: String, required: true },
    },
    { timestamps: true }
  )
);

module.exports = SessionToken;
