const express = require('express');
const router = express.Router();
const courseController = require('../controllers/course');
const authController = require('../controllers/auth');

router.get('/admin/main', (req, res) => res.render('admin_main'));
router.get('/admin/info', courseController.getCourses); 
router.post('/course/add', courseController.addCourse); 
router.post('/login', authController.login);

module.exports = router;
