import mongoose from "mongoose";
import { CONFIG } from "../config.js";

mongoose.connect(CONFIG.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch(err => console.error("🔴 MongoDB Connection Error:", err));

const chatSchema = new mongoose.Schema({
    user: String,
    message: String,
    aiResponse: String,
    timestamp: { type: Date, default: Date.now }
});

export const Chat = mongoose.model("Chat", chatSchema);
