const auth = require("../controllers/auth.controller");
const userMiddleware = require("../middlewares/user.middleware");
const authValidator = require("../middlewares/auth.middleware");

var router = require("express").Router();
var authRoutes = require("express").Router();

// Create a new Tutorial
router.post("/register", userMiddleware.validateRegister, auth.register);
router.get("/verify/:id", auth.verify);
router.post("/login", userMiddleware.validateLogin, auth.login);
router.get("/me", authValidator.validateToken, auth.me);
router.post("/logout", authValidator.validateToken, auth.logout);

authRoutes.use("/auth", router);

module.exports = authRoutes;
