import axios from "axios";

const pollinationsBaseUrl = "https://text.pollinations.ai";
const instance = axios.create({
    baseURL: pollinationsBaseUrl,
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  export default instance; // ✅ Make sure this line is present!
  