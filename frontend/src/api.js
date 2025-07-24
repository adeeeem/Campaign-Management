import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // Backend URL
});

// Auth
export const loginUser = (data) => API.post("/auth/login", data);
export const signupUser = (data) => API.post("/auth/signup", data);

// Campaigns
export const fetchCampaigns = () => API.get("/campaigns");
export const createCampaign = (data) => API.post("/campaigns", data);

// AI Suggest
export const getAISuggestions = () => API.get("/campaigns/genai/suggest");

export default API;
