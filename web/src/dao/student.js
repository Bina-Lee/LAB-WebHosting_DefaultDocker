const pool = require('../config/database');

// 로그인: 학번과 비밀번호 확인
exports.getStudentByCredentials = async (studentId, password) => {
  const query = `SELECT * FROM Member WHERE memberId = ? AND password = ?`;
  const [rows] = await pool.query(query, [studentId, password]);
  return rows[0];
};

// 학생 정보 가져오기
exports.getStudentById = async (studentId) => {
    const query = `SELECT name, major FROM Member WHERE memberId = ?`;
    const [rows] = await pool.query(query, [studentId]);
    return rows[0];
  };

  
// 학생이 속한 팀 목록 가져오기
exports.getTeamsByStudentId = async (studentId) => {
  const query = `
    SELECT Team.teamId, Team.name 
    FROM TeamMember 
    JOIN Team ON TeamMember.teamId = Team.teamId
    WHERE TeamMember.studentId = ?
  `;
  const [rows] = await pool.query(query, [studentId]);
  return rows;
};
