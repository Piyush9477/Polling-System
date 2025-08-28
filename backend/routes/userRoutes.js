const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/student', userController.createOrGetStudent);

router.post('/teacher', userController.createTeacher);

module.exports = router;
