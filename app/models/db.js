const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);
const db = {};

db.mongoose = mongoose;

db.user = require("./user.model.js");
db.sessionToken = require("./sessionToken.model");
db.post = require("./post.model");
db.like = require("./like.model");
db.firebaseToken = require("./firebaseToken.model");

module.exports = db;
