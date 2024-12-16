const pool = require('../config/database');

// 모든 팀 목록 가져오기
exports.getTeams = async () => {
  const query = `SELECT teamId, name FROM Team`;
  const [rows] = await pool.query(query);
  return rows;
};

// 모든 멤버 목록 가져오기
exports.getMembers = async () => {
  const query = `SELECT memberId, name FROM Member`;
  const [rows] = await pool.query(query);
  return rows;
};

// TeamMember 테이블에 데이터 삽입
exports.insertTeamMember = async (studentId, teamId) => {
  const query = `
    INSERT INTO TeamMember (studentId, teamId) 
    VALUES (?, ?)
  `;
  await pool.query(query, [studentId, teamId]);
};
