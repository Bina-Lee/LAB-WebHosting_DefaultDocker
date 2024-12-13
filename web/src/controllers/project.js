const projectDAO = require('../dao/project');

// Project 조회
exports.getProjects = async () => {
  try {
    const projects = await projectDAO.getAllProjects();
    return projects;
  } catch (err) {
    console.error('Error fetching projects:', err);
    throw err;
  }
};

// Project 추가
exports.addProject = async (req, res) => {
  const { name, maxTeamPersonnel, budgetType, budget, courseId, startDateTime, endDateTime } = req.body;

  if (!name || !maxTeamPersonnel || !budgetType || !budget || !courseId || !startDateTime || !endDateTime) {
    return res.status(400).send('All fields are required');
  }

  try {
    const adminId = 202201673; // 고정값
    await projectDAO.addProject({
      name,
      maxTeamPersonnel,
      budgetType,
      budget,
      courseId,
      adminId,
      startDateTime,
      endDateTime,
    });
    res.redirect('/admin/info'); // 성공 시 admin_info 페이지로 리다이렉트
  } catch (err) {
    console.error('Error adding project:', err);
    res.status(500).send('Internal Server Error');
  }
};
