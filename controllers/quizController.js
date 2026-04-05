const db = require("../config/db");

// CREATE QUIZ
exports.createQuiz = (req, res) => {
  const { title, duration, created_by } = req.body;

  if (!title || !duration || !created_by) {
    return res.status(400).json({ message: "All fields are required" });
  }

  db.query(
    "INSERT INTO quizzes (title, duration, created_by) VALUES (?, ?, ?)",
    [title, duration, created_by],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: "Quiz created successfully",
        quizId: result.insertId,
      });
    }
  );
};

// ADD QUESTION WITH OPTIONS
exports.addQuestion = (req, res) => {
  const { quiz_id, question_text, options } = req.body;

  if (!quiz_id || !question_text || !options || options.length < 2) {
    return res.status(400).json({ message: "Invalid data" });
  }

  // insert question
  db.query(
    "INSERT INTO questions (quiz_id, question_text) VALUES (?, ?)",
    [quiz_id, question_text],
    (err, questionResult) => {
      if (err) return res.status(500).json(err);

      const questionId = questionResult.insertId;

      // insert options
      const optionValues = options.map((opt) => [
        questionId,
        opt.option_text,
        opt.is_correct || false,
      ]);

      db.query(
        "INSERT INTO options (question_id, option_text, is_correct) VALUES ?",
        [optionValues],
        (err) => {
          if (err) return res.status(500).json(err);

          res.json({
            message: "Question and options added successfully",
          });
        }
      );
    }
  );
};