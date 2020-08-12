module.exports = {
  url:
    process.env.MODE == "DEVELOPMENT"
      ? process.env.BASE_URL + ":" + process.env.PORT
      : process.env.BASE_URL_PROD,
  databaseurl:
    process.env.MODE == "DEVELOPMENT"
      ? process.env.DATABASE_URL
      : process.env.DATABASE_URL_PROD,
};
