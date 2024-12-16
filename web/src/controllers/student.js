web/src/controllers/student.js
const studentDAO = require('../dao/student');

// 로그인 페이지 렌더링
exports.getLoginPage = (req, res) => {
  res.render('student_login', { error: null });
};

// 로그인 처리
exports.postLogin = async (req, res) => {
  const { studentId, password } = req.body;

  try {
    const student = await studentDAO.getStudentByCredentials(studentId, password);
    if (student) {
      req.session.studentId = studentId; // 세션에 로그인 정보 저장
      res.redirect('/student/main');
    } else {
      res.render('student_login', { error: '학번 또는 비밀번호가 잘못되었습니다.' });
    }
  } catch (err) {
    console.error(err);
    res.render('student_login', { error: '서버 오류가 발생했습니다.' });
  }
};

// 학생 메인 페이지 렌더링
exports.getStudentMainPage = async (req, res) => {
    const studentId = req.session.studentId;
  
    try {
      const studentInfo = await studentDAO.getStudentById(studentId);
      const teams = await studentDAO.getTeamsByStudentId(studentId);
  
      res.render('student_main', {
        student: studentInfo,
        teams,
        error: null,
      });
    } catch (err) {
      console.error(err);
      res.render('student_main', {
        student: null,
        teams: [],
        error: '데이터를 불러오는 중 오류가 발생했습니다.',
      });
    }
  };
  

// 구매 요청 페이지 이동
exports.getPurchasePage = (req, res) => {
  res.render('student_purchase');
};
