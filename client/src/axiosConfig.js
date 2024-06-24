// import axios from "axios";

// const axiosBase = axios.create({
//     baseURL: "http://localhost:5000/api",
// });

// export default axiosBase;


import axios from "axios";

const getAccessToken = () => {
    // Replace this with the actual logic to get the access token
    // for example, from localStorage or a cookie
    return localStorage.getItem("authToken");
};

const axiosBase = axios.create({
    baseURL: "http://localhost:5000/api",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getAccessToken()}`
    }
});

export default axiosBase;