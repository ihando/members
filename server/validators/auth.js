const db = require("../db/userqueries");
const { check } = require("express-validator");
const { compare } = require("bcryptjs");

const password = check("password")
  .isLength({ min: 6, max: 15 })
  .withMessage("Password must be between 6 and 15 characters");

const username = check("username")
  .isLength({ min: 3, max: 15 })
  .withMessage("Password must be between 3 and 15 characters");

const usernameExists = check("username").custom(async (username) => {
  const rows = await db.checkUserExists(username);

  if (rows.length) {
    throw new Error("Username already exists");
  }
});

//login validation
const loginFieldsCheck = check("username").custom(async (username, { req }) => {
  const user = await db.checkUserExists(username);
  if (!user.length) {
    throw new Error("username does not exist");
  }

  const validPassword = await compare(req.body.password, user[0].password);

  if (!validPassword) {
    throw new Error("incorrect password");
  }

  req.user = user[0];
});

module.exports = {
  registerValidation: [password, username, usernameExists],
  loginValidation: [loginFieldsCheck],
};
