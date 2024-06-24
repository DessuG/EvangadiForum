import { Route, Router, Routes, useNavigate } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login.jsx";
import Register from "./Pages/Register";
import { useEffect, useState, createContext } from "react";
import axios from "./axiosConfig.js";
import AddQuestion from "./Pages/AddQuestion.jsx";
import AddAnswer from "./Pages/AddAnswer.jsx";
import Layout from './Pages/Layout.jsx'

export const AppState = createContext();

function App() {
  const [user, setUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  async function checkUser() {
    try {
      const { data } = await axios.get("/users/check", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setUser(data);
      setIsLoggedIn(true);
      navigate("/")
    } catch (error) {
      navigate('/login')
      console.log(error.response);
      setIsLoggedIn(false);
      
    }
  }

  useEffect(() => {
    checkUser();
  }, [token]);

  async function handleLogout() {
    try {
    
      // Clear user data and token from local storage
      setUser({});
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      navigate('/login')
      
    } catch (error) {
      console.error("Error logging out:", error);
      
    }
  }

  return (
    <AppState.Provider value={{ user, setUser, handleLogout, isLoggedIn }}>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/register" element={<Register />} /> */}
          <Route path="/addquestion" element={<AddQuestion />} />
          <Route path="/addanswer/:questionid" element={<AddAnswer />} />
        </Routes>
      </Layout>
    </AppState.Provider>
  );
}

export default App;