const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const { loadQuestions, loadAnswer, loadUserAnswer } = require('../controller/LoadQuestionsController')
    // loadding Qwestions
    // router.post("/add-questions", addQuestions)

router.get("/loadquestion", loadQuestions)

router.get("/loadquestion/:questionid", loadAnswer)

router.get("/loadanswer/:questionid", loadUserAnswer)

module.exports = router;