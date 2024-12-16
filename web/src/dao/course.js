const pool = require('../config/database');

exports.getAllCourses = async () => {
  try {
    const [rows] = await pool.query(
      'SELECT courseId, name, startDateTime, endDateTime FROM Course'
    ); // 모든 Course 데이터를 가져옴
    return rows;
  } catch (err) {
    console.error('Database query error:', err);
    throw err;
  }
};

exports.addCourse = async (courseName, startDateTime, endDateTime) => {
  try {
    await pool.query(
      'INSERT INTO Course (name, startDateTime, endDateTime) VALUES (?, ?, ?)',
      [courseName, startDateTime, endDateTime]
    ); // 새로운 Course 추가
  } catch (err) {
    console.error('Database insert error:', err);
    throw err;
  }
};
