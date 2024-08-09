const express = require("express");
const router = express.Router();
const indexController = require("../controllers/indexcontroller");
const { registerValidation, loginValidation } = require("../validators/auth");
const { userAuth } = require("../middlewares/auth-middleware");
const {
  validationMiddleware,
} = require("../middlewares/validations-middleware");

router.get("/", indexController.getUsers);
router.get("/signup", indexController.signup);
router.get("/protected", userAuth, indexController.protected);
router.get("/logout", indexController.logout);
router.post(
  "/signup",
  registerValidation,
  validationMiddleware,
  indexController.createUser
);
router.post(
  "/login",
  loginValidation,
  validationMiddleware,
  indexController.login
);

module.exports = router;
