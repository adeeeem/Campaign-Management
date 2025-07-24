import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import campaignRoutes from "./routes/campaignRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Use campaign routes
app.use("/api/campaigns", campaignRoutes);

// In-memory users 
let users = [];

app.post("/api/auth/signup", (req, res) => {
  const { email, password } = req.body;
  if (users.find((u) => u.email === email)) {
    return res.status(400).json({ error: "User already exists" });
  }
  users.push({ email, password });
  res.json({ message: "Signup successful" });
});

// Login
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) return res.status(400).json({ error: "Invalid credentials" });

  res.json({ message: "Login successful" });
});

app.listen(5000, () => console.log("Server running on port 5000"));
