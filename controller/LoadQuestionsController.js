const dbConnection = require("../db/dbConfig");
const express = require("express");
const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

async function loadQuestions(req, res) {
    try {
        const [question] = await dbConnection.query(
            "select users.username, questions.title, questions.questionid, questions.description from users join questions on users.userid=questions.userid order by questions.id desc"
        );

        if (question.length === 0) {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({ msg: "no question available" });
        }
        res.send(question);
    } catch (error) {
        console.log(error.message);
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ msg: "something went wrong try again later!" });
    }
}

async function loadAnswer(req, res) {
    try {
        const questionid = req.params.questionid;
        const [answer] = await dbConnection.query(
            "select users.username,answers.answer from users join answers on users.userid=answers.userid where answers.questionid = ?", [questionid]
        );
        // console.log(questionid)
        // return res.json({user: user})
        if (answer.length === 0) {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({ msg: "no answer available" });
        }
        res.send(answer);
    } catch (error) {
        console.log(error.message);
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ msg: "something went wrong try again later!ssssssss" });
    }
}

async function loadUserAnswer(req, res) {
    try {
        const questionid1 = req.params.questionid;
        const [answer1] = await dbConnection.query(
            "select title, description from questions where questionid= ?", [questionid1]
        );
        // console.log(questionid)
        // return res.json({user: user})
        if (answer1.length === 0) {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({ msg: "no answer available" });
        }
        res.send(answer1);
    } catch (error) {
        console.log(error.message);
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ msg: "something went wrong try again later!ssssssss" });
    }
}

module.exports = { loadQuestions, loadAnswer, loadUserAnswer };