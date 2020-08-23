const admin = require("firebase-admin");

const serviceAccount = require("../config/serviceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://gawe-5dd57.firebaseio.com",
});

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

module.exports = { sendNotification };
