const express = require('express');
const router = express.Router();
const { getMember } = require('../controllers');

router.get('/something', getMember);
// router.get('/add', controller.createPurchase);

module.exports = router;
