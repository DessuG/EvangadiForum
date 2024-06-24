const dbConnection = require("../db/dbConfig");

const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");

const jwt = require("jsonwebtoken");

async function addQuestions(req, res) {
    // console.log("question added")

    const { title, description, currentUser } = req.body;
    const date = new Date();
    const rand = (Math.trunc(Math.random() * (10000 - 1) + 1));
    const questionid = `${rand + date + currentUser}`;
    if (!currentUser || !title || !description) {
        console.log(currentUser);
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ msg: "please provide full information about the question" });
    }

    try {
        await dbConnection.query(
            "INSERT INTO questions (questionid, userid, title, description) VALUES (?,?,?,?) ", [questionid, currentUser, title, description]
        );
        return res
            .status(StatusCodes.CREATED)
            .json({ msg: "Question has been added." });
    } catch (error) {
        console.log(error.message);
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ msg: "something went wrong try again later!" });
    }
}
module.exports = addQuestions;