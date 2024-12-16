const courseDAO = require('../dao/course');

exports.getCourses = async () => {
  try {
    const courses = await courseDAO.getAllCourses();
    return courses; // 데이터만 반환
  } catch (err) {
    console.error('Error fetching courses for dropdown:', err);
    throw err; // 에러는 호출한 곳에서 처리
  }

};

exports.addCourse = async (req, res) => {
  const { 'course-name': courseName, startDateTime, endDateTime } = req.body;

  if (!courseName || !startDateTime || !endDateTime) {
    return res.status(400).send('All fields are required');
  }

  try {
    await courseDAO.addCourse(courseName, startDateTime, endDateTime);
    res.redirect('/admin/info'); // 성공 시 info 페이지로 리다이렉트
  } catch (err) {
    console.error('Error adding course:', err);
    res.status(500).send('Internal Server Error');
  }
};
