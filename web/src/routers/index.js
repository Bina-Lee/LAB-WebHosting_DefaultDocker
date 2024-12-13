const express = require('express');
const router = express.Router();
const courseController = require('../controllers/course');
const authController = require('../controllers/auth');
const projectController = require('../controllers/project');
const teamController = require('../controllers/team');

router.get('/admin/project/:projectId/teams', teamController.getTeamsByProject);
router.get('/admin/team/:teamId', teamController.getTeamDetails);
router.get('/admin/main', (req, res) => res.render('admin_main'));
router.get('/admin/info', async (req, res) => {
    try {
      const courses = await courseController.getCourses();
      const projects = await projectController.getProjects();
      res.render('admin_info', { courses, projects });
    } catch (err) {
      console.error('Error loading admin info:', err);
      res.status(500).send('Internal Server Error');
    }
  });
  
router.post('/project/add', projectController.addProject);
router.post('/course/add', courseController.addCourse); 
router.post('/login', authController.login);

module.exports = router;
