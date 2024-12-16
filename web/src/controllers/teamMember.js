const teamMemberDAO = require('../dao/teamMember');

// 팀 멤버 추가 페이지 렌더링
exports.getAddTeamMemberPage = async (req, res) => {
  try {
    const teams = await teamMemberDAO.getTeams(); // 팀 목록 가져오기
    const members = await teamMemberDAO.getMembers(); // 멤버 목록 가져오기
    res.render('team_member_add', { teams, members, error: null });
  } catch (err) {
    console.error(err);
    res.render('team_member_add', {
      teams: [],
      members: [],
      error: '데이터를 불러오는 중 오류가 발생했습니다.',
    });
  }
};

// 팀 멤버 추가 처리
exports.postAddTeamMember = async (req, res) => {
  const { studentId, teamId } = req.body;

  try {
    await teamMemberDAO.insertTeamMember(studentId, teamId);
    res.redirect('/admin/info'); // 성공 시 관리자 메인 페이지로 리디렉트
  } catch (err) {
    console.error(err);
    res.render('team_member_add', {
      error: '팀 멤버 추가 중 오류가 발생했습니다.',
    });
  }
};
