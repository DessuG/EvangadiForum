const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const addQuestions = require("../controller/QuestionsController");

// Adding Qwestions


// router.post("/addquestion", addQuestions)

router.post("/addquestion", addQuestions);
module.exports = router;