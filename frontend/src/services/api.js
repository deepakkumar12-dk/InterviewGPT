import axios from "axios";

const api = axios.create({
  baseURL: "https://interviewgpt-backend-bunj.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;