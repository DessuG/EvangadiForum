import { useContext, useState, useEffect } from "react";
import { AppState } from "../App";
import { Link, useNavigate } from "react-router-dom";
import axios from "../axiosConfig";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import AddAnswer from "./AddAnswer";
import classes from '../Pages/CSS/home.module.css'

function Home() {
  const { user } = useContext(AppState);
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/load/loadquestion');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  function navigateAddquestion() {
    navigate("/addquestion");
  }

  function navigateAddanswer() {
    navigate("/addanswer");
  }

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className={classes.home_wraper}>
      <div className={classes.home_container}>
        <button className={classes.sm_button} onClick={navigateAddquestion}>
          Ask Question
        </button>
        <hr />
        <h2 style={{ marginTop: "30px", marginBottom: "20px" }}>Wellcome : {user.username}</h2>
      </div>
      <div>
        <input
          type="text"
          name="search"
          className={classes.Question_search}
          placeholder="Search Question"
          onChange={handleSearch}
        />
      </div>
      <h1 style={{ marginTop: "40px", marginBottom: "20px" }}>Questions</h1>
      {data
        .filter((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase()))
        .map((item) => (
          <div style={{ opacity: "0.7" }} key={item.questionid}>
            <hr />
            <Link style={{ textDecoration: "none" }} to={`/addanswer/${item.questionid}`}>
              <button className={classes.big_button}>
                <div className={classes.mid_div}>
                  <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <div>
                      <AccountCircleIcon style={{ fontSize: "70px", marginTop: "0" }} />
                      <p style={{ opacity: "1" }}>{item.username}</p>
                    </div>
                    <p style={{ marginLeft: "30px", fontSize: "14px" }}> {item.title}</p>
                  </div>
                  <KeyboardArrowRightIcon style={{ fontSize: "35px" }} />
                </div>
              </button>
            </Link>
          </div>
        ))}
    </div>
  );
}

export default Home;