const pool = require("./db");

async function getAllUsers() {
  const { rows } = await pool.query("SELECT id, username FROM users");
  return rows;
}

async function checkUserExists(username) {
  const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);
  return rows;
}

async function getOneUser(id) {
  const { rows } = await pool.query(
    "SELECT id, username FROM users WHERE id = $1",
    [id]
  );
  return rows;
}

async function createUser(username, password) {
  const query = `
      INSERT INTO users (username, password) 
      VALUES ($1, $2)
    `;
  await pool.query(query, [username, password]);
}
module.exports = { getAllUsers, checkUserExists, createUser, getOneUser };
