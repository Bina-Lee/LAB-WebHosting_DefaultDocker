const pool = require('../config/database');

// Project 조회
exports.getAllProjects = async () => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        p.projectId, p.name AS projectName, p.maxTeamPersonnel, p.budgetType, p.budget, 
        c.name AS courseName, p.startDateTime, p.endDateTime
      FROM Project p
      JOIN Course c ON p.courseId = c.courseId
    `);
    return rows;
  } catch (err) {
    console.error('Database query error:', err);
    throw err;
  }
};

// Project 추가
exports.addProject = async (project) => {
  try {
    const {
      name,
      maxTeamPersonnel,
      budgetType,
      budget,
      courseId,
      adminId,
      startDateTime,
      endDateTime,
    } = project;
    await pool.query(
      `
      INSERT INTO Project (name, maxTeamPersonnel, budgetType, budget, courseId, adminId, startDateTime, endDateTime)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [name, maxTeamPersonnel, budgetType, budget, courseId, adminId, startDateTime, endDateTime]
    );
  } catch (err) {
    console.error('Database insert error:', err);
    throw err;
  }
};
