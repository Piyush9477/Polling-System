const express = require('express');
const router = express.Router();
const pollController = require('../controllers/pollController');

router.post('/', pollController.createPoll);

router.get('/teacher/:teacherId', pollController.getPollsByTeacher);

module.exports = router;
