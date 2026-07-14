import axios from "axios";

const api = axios.create({
  baseURL: "https://interviewgpt-backend-bunj.onrender.com",
});

export default api;