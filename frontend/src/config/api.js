// frontend/src/config/api.js

const API_BASE =
  import.meta.env.PROD
    ? "https://trustrafx.onrender.com"
    : "http://localhost:5000";

export default API_BASE;
