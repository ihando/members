const { hash } = require("bcryptjs");
const db = require("../db/userqueries");
const { sign } = require("jsonwebtoken");
const { SECRET } = require("../constants");

async function getUsers(req, res) {
  try {
    const users = await db.getAllUsers();
    return res.status(201).json({
      success: true,
      users: { users },
    });
  } catch (err) {
    console.error(err.message);
  }
}

const signup = (req, res) => {
  res.send("signup");
};
async function createUser(req, res) {
  const { username, password } = req.body;
  try {
    const hashedPassword = await hash(password, 10);
    const user = await db.createUser(username, hashedPassword);
    return res.status(201).json({
      success: true,
      message: "signup success",
    });
  } catch (err) {
    console.error(err.message);
  }
}

async function login(req, res) {
  let user = req.user;
  let payload = {
    id: user.id,
    username: user.username,
  };
  try {
    const token = await sign(payload, SECRET);
    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // 24 hours x 60 minutes x 60 seconds x 1000 milliseconds
      })
      .json({
        success: true,
        message: "Logged in successfully",
      });
  } catch (err) {
    console.error(err.message);
  }
}

async function protected(req, res) {
  try {
    return res.status(201).json({
      info: "protected info",
    });
  } catch (err) {
    console.error(err.message);
  }
}

async function logout(req, res) {
  try {
    return res.status(200).clearCookie("token", { httpOnly: true }).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (err) {
    console.error(err.message);
  }
}

module.exports = {
  getUsers,
  createUser,
  signup,
  login,
  protected,
  logout,
};
