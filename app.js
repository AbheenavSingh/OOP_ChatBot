import express from 'express';
import cors from 'cors';
import { getAIResponse } from './services/aiService.js';
import { sendWhatsAppMessage } from './services/twilioService.js';
import { Chat } from './services/dbService.js';
import { CONFIG } from './config.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Webhook for WhatsApp
app.post('/whatsapp', async (req, res) => {
    const senderNumber = req.body.From?.replace('whatsapp:', '');
    const messageBody = req.body.Body;

    if (!senderNumber || !messageBody) {
        return res.status(400).json({ error: "Invalid request. Missing 'From' or 'Body' fields." });
    }

    try {
        console.log(`📩 Message from ${senderNumber}: ${messageBody}`);

        const aiResponse = await getAIResponse(messageBody);
        await sendWhatsAppMessage(senderNumber, aiResponse);

        // Save to MongoDB
        await Chat.create({ user: senderNumber, message: messageBody, aiResponse });

        console.log(`✅ Response sent to ${senderNumber}: ${aiResponse}`);
        res.status(200).json({ message: "Message sent successfully!" });

    } catch (error) {
        console.error("🔥 Error processing message:", error);
        res.status(500).json({ error: "Internal server error. Please try again later." });
    }
});

// Start the Server
app.listen(CONFIG.PORT, () => console.log(`🚀 Server running on port ${CONFIG.PORT}`));
