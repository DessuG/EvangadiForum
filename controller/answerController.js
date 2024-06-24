const dbConnection = require("../db/dbConfig");

const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");

const jwt = require("jsonwebtoken");

async function addAnswer(req, res) {
  const { answer, answerUser, questionId } = req.body;
  if (!answer || !answerUser) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "please provide the answer for the question" });
  }

  try {
    await dbConnection.query(
      "INSERT INTO answers (userid, questionid, answer) VALUES (?,?,?) ",
      [answerUser, questionId, answer]
    );
    return res
      .status(StatusCodes.CREATED)
      .json({ msg: "Answer has been submited." });
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "something went wrong try again later!" });
  }
  // console.log("hello answer")
}
module.exports = addAnswer;
