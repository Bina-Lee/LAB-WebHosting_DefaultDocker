const pool = require('../config/database');

exports.findMemberById = async (memberId) => {
  try {
    const [rows] = await pool.query(
      'SELECT memberId, name, password FROM Member WHERE memberId = ?',
      [memberId]
    );
    return rows[0]; // Return the first row (user data) or undefined if not found
  } catch (err) {
    console.error('Database query error:', err);
    throw err;
  }
};
