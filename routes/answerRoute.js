const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const addAnswer = require("../controller/answerController");
// Adding Qwestions
// router.post("/add-questions", addQuestions)

router.post("/addanswer", addAnswer);

// router.post("/loadanswer", addAnswer);

// router.post("/addquestion", authMiddleware, addQuestions);
module.exports = router;