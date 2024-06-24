require("dotenv").config();
const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");

//db connection
const dbConnection = require("./db/dbConfig");

//user routes middleware file
const userRoutes = require("./routes/userRoute");
const answerRoute = require('./routes/answerRoute')
    //questions routes middleware file
const questionsRoutes = require("./routes/questionsRoute");

const LoadQuestionRoute = require('./routes/LoadQuestionRoute')
    // authentication middleware file
const authMiddleware = require("./middleware/authMiddleware");
const { all } = require("axios");
const loadQuestions = require("./controller/LoadQuestionsController");

// json middleware  to extract json data
app.use(express.json());

// user routes middleware
// app.use(cors)

app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
        preflightContinue: false,
        optionsSuccessStatus: 204,
    })
);

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
    res.send("Database Server Running");
});

// questions routes middleware ??
app.use("/api/questions", questionsRoutes);
// app.use("/api/questions", authMiddleware, questionsRoutes);

// answers routes middle??

app.use("/api/answer", answerRoute);

app.use("/api/load", LoadQuestionRoute);

async function start() {
    try {
        const result = await dbConnection.execute("select 'test' ");
        // console.log(result)
        await app.listen(port);
        console.log("database connection established");
        console.log(`listening on port ${port}`);
    } catch (error) {
        console.log(error.message);
    }
}
start();

// app.listen(port, (err) => {
// 	if (err) {
// 		console.log(err);
// 	} else {
// 		console.log(`listening on ${port}`);
// 	}
// });onsole.log(err);
// 	} else {
// 		console.log(`listening on ${port}`);
// 	}
// });