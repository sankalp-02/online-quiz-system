# Online Quiz System (MVP)

## Features-----

* Create Quiz
* Add Questions with Options
* Fetch Quiz with Questions

## Tech Stack--

* Node.js
* Express.js
* MySQL

## API Endpoints :

### Create Quiz-------

POST /api/quiz/create

Body:
{
"title": "Test Quiz",
"duration": 30
}

---

### Add Question------

POST /api/quiz/add-question

Body:
{
"quiz_id": 8,
"question_text": "What is 2 + 2?",
"options": [
{ "option_text": "3", "is_correct": false },
{ "option_text": "4", "is_correct": true }
]
}

---

### Get Quiz---------

GET /api/quiz/:quizId

---

## Setup Instructions : : 

1. Clone repo
2. Run:
   npm install
3. Create `.env` file:
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=quizdb
   JWT_SECRET=your_secret
4. Run server:
   node server.js
