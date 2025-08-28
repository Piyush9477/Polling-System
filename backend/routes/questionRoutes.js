const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');

router.post('/', questionController.createQuestion);

router.get('/active/:pollId', questionController.getActiveQuestion);

module.exports = router;
