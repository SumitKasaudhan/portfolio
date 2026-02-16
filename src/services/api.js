import axios from "axios";

const API = axios.create({
    baseURL: "https://portfolio-39rw.onrender.com/api",
});

export default API;
