const admin = require("firebase-admin");
var path = require("path");

const serviceAccount = require("../config/serviceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://gawe-5dd57.firebaseio.com",
  storageBucket: "gs://gawe-5dd57.appspot.com",
});

const uploadImage = async (image) => {
  const storageRef = admin.storage().bucket();
  const rootPath = path.dirname(
    require.main.filename || process.mainModule.filename
  );
  const result = await storageRef.upload(`${rootPath}/uploads/${image.name}`, {
    gzip: true,
    metadata: {
      cacheControl: "public, max-age=31536000",
    },
  });
  await storageRef.file(image.name).makePublic();
  const url = result[0].metadata.mediaLink;
  return url;
};

const sendNotification = (tokens, message) => {
  const config = {
    data: { message: message },
    tokens: tokens,
  };
  admin
    .messaging()
    .sendMulticast(config)
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { sendNotification, uploadImage  };

