const pool = require('../config/database');

const getMember = async () => {
  const [rows] = await pool.query('SELECT * FROM Member');
  return rows;
};



module.exports = { getMember };
