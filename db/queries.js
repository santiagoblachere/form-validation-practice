const pool = require("./pool");

async function getAllMessages() {
  const { rows } = await pool.query("SELECT * FROM messages");
  return rows;
}
async function deleteMessage(id) {
  await pool.query("DELETE FROM messages WHERE id = $1", [id]);
}

async function insertMessage(user,message) {
  await pool.query("INSERT INTO messages (username, message) VALUES ($1, $2)", [user, message]);
}

module.exports = {
  getAllMessages,
  insertMessage,
  deleteMessage
};
