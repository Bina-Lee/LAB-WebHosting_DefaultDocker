const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

router.get('/admin/main',(req,res)=>res.render("admin_main"));
router.get('/admin/info',(req,res)=>res.render("admin_info"));
router.get('/admin/purchase',(req,res)=>res.render("admin_purchase"));
// router.get('/user',(req,res)=>res.render("main"));

// Login route
router.post('/login', authController.login);

module.exports = router;
