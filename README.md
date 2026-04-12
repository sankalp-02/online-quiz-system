# 🧠 Online Quiz System (Backend - MVP)

A basic backend-driven Online Quiz System built using **Node.js, Express.js, and MySQL**.
This project demonstrates REST API design, relational database usage, and backend logic for quiz creation, question management, and scoring.

---

## 🚀 Features

* Create quizzes
* Add questions with multiple options
* Mark correct answers
* Fetch quiz with questions
* Submit quiz answers
* Automatic score calculation
* Store results in database

---

## 🛠️ Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MySQL
* **Authentication:** Basic JWT middleware (optional for MVP)
* **API Testing:** Thunder Client / Postman

---

## 📂 Project Structure

```
online-quiz-system/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── quizController.js
│   └── userController.js
│
├── routes/
│   ├── quizRoutes.js
│   └── userRoutes.js
│
├── middleware/
│   └── auth.js
│
├── .env
├── server.js
├── package.json
```

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/sankalp-02/online-quiz-system.git
cd online-quiz-system
```

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Configure environment variables

Create a `.env` file:

```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=quiz_app
JWT_SECRET=your_secret
```

---

### 4. Run the server

```bash
node server.js
```

Server runs on:

```
http://localhost:5000
```

---

## 🧪 API Endpoints

### 1. Create Quiz

```
POST /api/quiz/create
```

Body:

```json
{
  "title": "Test Quiz",
  "duration": 30
}
```

---

### 2. Add Question

```
POST /api/quiz/add-question
```

Body:

```json
{
  "quiz_id": 8,
  "question_text": "What is 2 + 2?",
  "options": [
    { "option_text": "3", "is_correct": false },
    { "option_text": "4", "is_correct": true },
    { "option_text": "5", "is_correct": false }
  ]
}
```

---

### 3. Get Quiz

```
GET /api/quiz/:quizId
```

Example:

```
GET /api/quiz/8
```

---

### 4. Submit Quiz

```
POST /api/quiz/submit
```

Body:

```json
{
  "quiz_id": 8,
  "answers": [
    {
      "question_id": 2,
      "selected_option": 6
    }
  ]
}
```

Response:

```json
{
  "message": "Quiz submitted",
  "score": 1
}
```

---

## 🗄️ Database Tables

* users
* quizzes
* questions
* options
* results

(Relational design with foreign keys)

---

## ⚠️ Limitations (MVP Scope)

* No frontend UI
* Basic authentication
* No timer enforcement
* Static user ID used in scoring

---

## 📌 Future Improvements

* Add frontend (React or HTML/CSS)
* Implement timer-based quiz
* Full authentication system
* Admin dashboard
* Pagination & filtering
* Better validation and error handling

---

## 👨‍💻 Author

**Sankalp**

---

## 📎 Submission

GitHub Repo:
https://github.com/sankalp-02/online-quiz-system

---
