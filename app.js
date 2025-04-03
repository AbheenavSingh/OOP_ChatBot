import express from 'express';
import { getAIResponse } from './services/aiService.js';
import { sendWhatsAppMessage } from './services/twilioService.js';
import { CONFIG } from './config.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/whatsapp', async (req, res) => {
    const senderNumber = req.body.From?.replace('whatsapp:', '');
    const messageBody = req.body.Body;

    if (!senderNumber || !messageBody) {
        return res.status(400).send('Invalid request.');
    }

    try {
        console.log(`Received from ${senderNumber}: ${messageBody}`);
        const aiResponse = await getAIResponse(messageBody);
        await sendWhatsAppMessage(senderNumber, aiResponse);
        res.status(200).send('Message sent!');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error processing message.');
    }
});

app.listen(CONFIG.PORT, () => console.log(`🚀 Server running on port ${CONFIG.PORT}`));
