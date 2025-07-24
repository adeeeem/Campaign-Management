import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// In-memory campaigns 
let campaigns = [];

// OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Get all campaigns
router.get("/", (req, res) => {
  res.json(campaigns);
});

// Create new campaign
router.post("/", (req, res) => {
  const { name, objective, budget, targetAudience } = req.body;
  const newCampaign = {
    id: campaigns.length + 1,
    name,
    objective,
    budget,
    targetAudience,
  };
  campaigns.push(newCampaign);
  res.json(newCampaign);
});

// AI Suggestion (OpenAI)
router.get("/genai/suggest", async (req, res) => {
  try {
    const prompt = `
      Suggest a realistic marketing budget (number) and target audience (short text) for a campaign.
      Respond ONLY in JSON like:
      {
        "budget": 1200,
        "audience": "18-30 tech-savvy professionals"
      }
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const text = completion.choices[0].message.content;
    const jsonMatch = text.match(/{[\s\S]+}/);
    const suggestion = JSON.parse(jsonMatch[0]);

    res.json(suggestion);
  } catch (error) {
    console.error("AI Suggestion Error:", error.message);
    res.status(500).json({ error: "Failed to get AI suggestion" });
  }
});

export default router;
