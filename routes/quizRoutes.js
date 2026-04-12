const express = require('express');
const router = express.Router();

const quizController = require('../controllers/quizController');

// Create quiz
router.post('/create', quizController.createQuiz);

// Add question
router.post('/add-question', quizController.addQuestion);

// Get quiz
router.get('/:quizId', quizController.getQuiz);

// Test route
router.get('/test', (req, res) => {
  res.send("Quiz route working");
});

//submit route
router.post('/submit', quizController.submitQuiz);

module.exports = router;