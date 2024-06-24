import React, { useContext } from "react";
import { useRef } from "react";
import axios from "../axiosConfig";
import { useNavigate,Link } from "react-router-dom";
import { AppState } from "../App";
import classes from './CSS/addQuestion.module.css'
import BallotSharpIcon from '@mui/icons-material/BallotSharp';

const token = localStorage.getItem("token");

function AddQuestion() {
  const { user } = useContext(AppState);

  // console.log(user.userid)
  const navigate = useNavigate();

  const titleDom = useRef();
  const descriptionDom = useRef();

  async function handleAddQuestion(e) {
    e.preventDefault();
    const titleValue = titleDom.current.value;
    const descriptionValue = descriptionDom.current.value;

    if (!titleValue || !descriptionValue) {
      alert("Please insert the title and the description");
      return;
    }
    try {
      await axios.post("/questions/addquestion", {
        title: titleValue,
        description: descriptionValue,
        currentUser: user.userid
      },{headers:{
        Authorization: "Bearer " + token,
      }});
      alert("Question Posted Sucessfully ");
      navigate("/");
    } catch (error) {
      alert("Error adding the question");
      console.log(error);
    }
  }

  return (
    <section className={classes.all_addQ}
      style={{
        
      }}
    >
      <div>
        <h2>Steps to write a good question</h2>
      </div>
      <br />
      <div className={classes.guideline}>
        <ul>
          <li><BallotSharpIcon/> &nbsp; &nbsp;Sammerize your Problem in a one-line title</li>
          <li><BallotSharpIcon/> &nbsp;&nbsp;Describe your problem in more detail</li>
          <li><BallotSharpIcon/> &nbsp;&nbsp;Describe what you tried and what you expected to happen</li>
          <li><BallotSharpIcon/> &nbsp;&nbsp;Review your question and post it to the site</li>
        </ul>
      </div>
      <br />
      <div>
        <h2>Ask a public question</h2>
        <br />
        <Link to={"/"}>Go to Questions</Link>
      </div>
      <br />
      <div>
        <form onSubmit={handleAddQuestion}>
          <div className={classes.Text_inputs}
            
          >
            <input
              ref={titleDom}
              type="text"
              placeholder="Title"
              style={{ width: "300px" }}
            />
            <textarea
              ref={descriptionDom}
              type="textarea"
              placeholder="Question Description"
              
            ></textarea>
            <button type="submit">Post your question</button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default AddQuestion;
