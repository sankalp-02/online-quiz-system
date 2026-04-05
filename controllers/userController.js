const db = require("../config/db");
const bcrypt = require("bcrypt");

// REGISTER
exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // check if user exists
    db.query("SELECT * FROM users WHERE email = ?", [email], async (err, result) => {
      if (result.length > 0) {
        return res.status(400).json({ message: "User already exists" });
      }

      // hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // insert user
      db.query(
        "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
        [name, email, hashedPassword],
        (err, result) => {
          if (err) return res.status(500).json(err);

          res.json({ message: "User registered successfully" });
        }
      );
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

// LOGIN
exports.login = (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, result) => {
    if (result.length === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    const user = result[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.json({
      message: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  });
};