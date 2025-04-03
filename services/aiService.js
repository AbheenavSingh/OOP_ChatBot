import axios from 'axios';
import { CONFIG } from '../config.js';

const SYSTEM_PROMPT = `
You are an AI chatbot that ONLY answers questions related to Object-Oriented Programming (OOP).
If the user asks about:
✔️ Classes, Objects, Encapsulation, Inheritance, Polymorphism, Abstraction
✔️ SOLID principles, Design Patterns, and Best Practices
✔️ OOP in Java, Python, JavaScript, C++, etc.
Then provide an answer.

❌ If the user asks about ANY OTHER TOPIC (e.g., politics, sports, general coding, current events),
Respond with: "I'm only trained to discuss Object-Oriented Programming (OOP) topics."
`;

export const getAIResponse = async (message) => {
    try {
        const response = await axios.post(
            `${CONFIG.GEMINI_API_URL}?key=${CONFIG.GEMINI_API_KEY}`,
            {
                contents: [{ role: 'user', parts: [{ text: `${SYSTEM_PROMPT}\nUser: ${message}\nAI:` }] }],
            },
            {
                headers: { 'Content-Type': 'application/json' },
            }
        );

        return response.data.candidates[0]?.content?.parts[0]?.text || "Sorry, I couldn't process your request.";
    } catch (error) {
        console.error('Error fetching AI response:', error);
        return 'There was an error processing your request.';
    }
};
