const teamDAO = require('../dao/team');

// 특정 프로젝트의 팀 리스트 조회
exports.getTeamsByProject = async (req, res) => {
  const { projectId } = req.params;
  try {
    const teams = await teamDAO.getTeamsByProject(projectId);
    res.json(teams); // JSON 형식으로 팀 리스트 반환
  } catch (err) {
    console.error('Error fetching teams by project:', err);
    res.status(500).send('Internal Server Error');
  }
};

// 특정 팀의 상세 조회
exports.getTeamDetails = async (req, res) => {
  const { teamId } = req.params;
  try {
    const teamMembers = await teamDAO.getTeamMembers(teamId);
    const purchaseRecords = await teamDAO.getPurchaseRecords(teamId);
    res.render('team_details', { teamMembers, purchaseRecords });
  } catch (err) {
    console.error('Error fetching team details:', err);
    res.status(500).send('Internal Server Error');
  }
};
