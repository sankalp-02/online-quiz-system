const express = require("express");
const router = express.Router();

const { createQuiz, addQuestion } = require("../controllers/quizController");

router.post("/create", createQuiz);
router.post("/add-question", addQuestion);

module.exports = router;