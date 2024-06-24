import React, { useContext, useEffect, useState } from "react";
import { useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "../axiosConfig";
import { Link, useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { AppState } from "../App";
import classes from './CSS/addAnswer.module.css'
import DoubleArrowTwoToneIcon from '@mui/icons-material/DoubleArrowTwoTone';
import KeyboardArrowRightSharpIcon from '@mui/icons-material/KeyboardArrowRightSharp';
function AddAnswer({ responses }) {
  const { user } = useContext(AppState);
  const navigate = useNavigate();
  const answerDom = useRef();
  const { questionid } = useParams();
  const [question, setQuestion] = useState([]);
  const [answer, setAnswer] = useState([]);


console.log(answer)
console.log(question)
  useEffect(() => {
    const loadAnswer = async (questionid) => {
      try {
        const answers = await axios.get(`/load/loadquestion/${questionid}`);
        setAnswer(answers.data);
      } catch (error) {
        console.error(`Error fetching the answer ${questionid}:`, error);
      }
    };
    loadUserAnswer(questionid);
    loadAnswer(questionid);
    
  }, [questionid]);

  const loadUserAnswer = async (questionid) => {
    try {
      const questions = await axios.get(`/load/loadanswer/${questionid}`);
      setQuestion(questions.data);
    } catch (error) {
      console.error(`Error fetching the answer ${questionid}:`, error);
    }
  };

  // console.log(questionid)
  // console.log(answer)
  async function handleAddAnswer(e) {
    e.preventDefault();
    const answerValue = answerDom.current.value;

    if (!answerValue) {
      alert("You didn't write any answer");
      return;
    }
    try {
      await axios.post("/answer/addanswer", {
        answer: answerValue,
        answerUser: user.userid,
        questionId: questionid,
      });
      alert("Your answer is submited");
      navigate(`/addanswer/${questionid}`);
    } catch (error) {
      alert("Error answering the question");
      console.log(error.response);
    }
    // console.log(answerValue);
    // console.log(user.userid);
    
  }

  return (
    <section className={classes.main_wraper} >
      <div>
        <h2>Question</h2>
        <h2><DoubleArrowTwoToneIcon style={{fontSize:"40px"}}/>{question[0]?.title}</h2>
       
        <p style={{paddingLeft:"50px"}}><KeyboardArrowRightSharpIcon style={{fontSize:"40px"}}/>{question[0]?.description}</p>
      </div>
      <div>
        <hr />
        <h2>Answer From The Community</h2>
        <hr />
        <div>
          <div className={classes.text_fields} >
            {answer.map((eachresp) => (
              <div style={{margin:"0"}}>
                <div className={classes.answers}>
                <AccountCircleIcon style={{ fontSize: "80px" }} />
                <p style={{ marginLeft: "30px" }}>{eachresp.answer}</p>
                </div>
                <p style={{fontSize:"18px",fontWeight:"bold"}}>{eachresp.username}</p>
                <hr />
              </div>

            ))}
          </div>
          <div>
            
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div
            className={classes.last_texts}
          >
            <h2>Answer The Top Question</h2>
            <p>
              <Link to={"/"}>go to Questions page</Link>
              
            </p>
          </div>

          <form onSubmit={handleAddAnswer}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "80%",
                margin: "auto",
              }}
            >
              <textarea
                ref={answerDom}
                placeholder="Your Answer"
                style={{ height: "80px" }}
              ></textarea>
              <br />
              <br />
              <button>Post Your Answer</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default AddAnswer;
