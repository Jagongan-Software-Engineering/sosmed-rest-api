require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");

const db = require("./app/models/db");
const baseurl = require("./app/helper/baseurl");
const authRoutes = require("./app/routes/auth.routes");
const postRoutes = require("./app/routes/post.routes");
const likeRoutes = require("./app/routes/like.routes");
const firebaseTokenRoutes = require("./app/routes/firebaseToken.routes");
const commentRoutes = require("./app/routes/comment.routes");
const notificationRoutes = require("./app/routes/notification.routes");
const app = express();

console.log(`Connecting to ${baseurl.databaseurl}`);
db.mongoose
  .connect(baseurl.databaseurl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true,
    useFindAndModify:false,
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

app.use(cors());
app.use(fileUpload({ createParentPath: true }));

// Declare Routes
app.use(authRoutes);
app.use(postRoutes);
app.use(likeRoutes);
app.use(firebaseTokenRoutes);
app.use(commentRoutes);
app.use(notificationRoutes);

app.use("/image", express.static("uploads"));

app.use("/", (req, res) => {
  return res.send({
    status: true,
    message: "hey jude",
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
