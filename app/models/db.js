const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);
const db = {};

db.mongoose = mongoose;

db.user = require("./user.model.js");
db.sessionToken = require("./sessionToken.model");

module.exports = db;
