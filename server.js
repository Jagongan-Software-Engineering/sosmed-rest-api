require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

const db = require("./app/models/db");
const baseurl = require("./app/helper/baseurl");
const authRoutes = require("./app/routes/auth.routes");
const postRoutes = require("./app/routes/post.routes");
const app = express();

db.mongoose
  .connect(baseurl.databaseurl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Connected to ${baseurl.databaseurl}`);
  })
  .catch((err) => {
    console.log(`Cannot connect to database because, ${err}`);
    process.exit();
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use(fileUpload({ createParentPath: true }));

// Declare Routes
app.use(authRoutes);
app.use(postRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
