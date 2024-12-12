const courseDAO = require('../dao/course');

exports.getCourses = async (req, res) => {
  try {
    const courses = await courseDAO.getAllCourses();
    res.render('admin_info', { courses }); // 데이터와 함께 admin_info 렌더링
  } catch (err) {
    console.error('Error fetching courses:', err);
    res.status(500).send('Internal Server Error');
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
