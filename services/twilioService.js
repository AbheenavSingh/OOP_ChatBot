import twilio from 'twilio';
import { CONFIG } from '../config.js';

const client = twilio(CONFIG.TWILIO_ACCOUNT_SID, CONFIG.TWILIO_AUTH_TOKEN);

export const sendWhatsAppMessage = async (to, message) => {
    try {
        await client.messages.create({
            from: CONFIG.TWILIO_WHATSAPP_NUMBER,
            to: `whatsapp:${to}`,
            body: message,
        });
        console.log(`Message sent to ${to}`);
    } catch (error) {
        console.error('Error sending WhatsApp message:', error);
    }
};
