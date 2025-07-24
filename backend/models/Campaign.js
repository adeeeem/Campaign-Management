import mongoose from "mongoose";

const campaignSchema = new mongoose.Schema({
  name: { type: String, required: true },
  objective: { type: String, required: true },
  budget: { type: Number, required: true },
  targetAudience: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export default mongoose.model("Campaign", campaignSchema);
