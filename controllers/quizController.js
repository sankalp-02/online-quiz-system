const db = require("../config/db");

// CREATE QUIZ
exports.createQuiz = async (req, res) => {
  try {
    console.log("API HIT");

    const { title, duration } = req.body;
    const created_by = req.user.id;

    if (!title || !duration) {
      return res.status(400).json({ message: "Title and duration required" });
    }

    const [result] = await db.query(
      "INSERT INTO quizzes (title, duration, created_by) VALUES (?, ?, ?)",
      [title, duration, created_by]
    );

    res.json({
      message: "Quiz created successfully",
      quizId: result.insertId,
    });

  } catch (err) {
    console.log("DB ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ADD QUESTION WITH OPTIONS
exports.addQuestion = async (req, res) => {
  try {
    const { quiz_id, question_text, options } = req.body;

    if (!quiz_id || !question_text || !options || options.length < 2) {
      return res.status(400).json({ message: "Invalid data" });
    }

    const [questionResult] = await db.query(
      "INSERT INTO questions (quiz_id, question_text) VALUES (?, ?)",
      [quiz_id, question_text]
    );

    const questionId = questionResult.insertId;

    const optionValues = options.map(opt => [
      questionId,
      opt.option_text,
      opt.is_correct || false
    ]);

    await db.query(
      "INSERT INTO options (question_id, option_text, is_correct) VALUES ?",
      [optionValues]
    );

    res.json({
      message: "Question and options added successfully",
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getQuiz = async (req, res) => {
  const quizId = req.params.quizId;

  console.log("getQuiz HIT", quizId);

  try {
    const [quizResult] = await db.query(
      "SELECT * FROM quizzes WHERE id = ?",
      [quizId]
    );

    if (quizResult.length === 0) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    const [questions] = await db.query(
      "SELECT * FROM questions WHERE quiz_id = ?",
      [quizId]
    );

    res.json({
      quiz: quizResult[0],
      questions: questions,
    });

  } catch (err) {
    console.log("DB ERROR:", err);
    res.status(500).json(err);
  }
};