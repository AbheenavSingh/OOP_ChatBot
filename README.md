# Chatbot with Express, Gemini AI & Ngrok

This project is a chatbot API that uses **Express.js** as the backend, integrates with **Google Gemini 1.5 Flash AI**, and exposes a **webhook via ngrok** for external services like WhatsApp bots.

## 🚀 Features
- AI-powered chatbot using **Gemini 1.5 Flash API**.
- Webhook for handling incoming messages.
- Uses **ngrok** to expose the local server to the internet.

---
## 🛠 Setup & Installation

### 1️⃣ Clone the Repository
```bash
git clone [https://github.com/AbheenavSingh/OOP_ChatBot.git]
cd oop-chatbot
```

### 2️⃣ Install Dependencies
```bash
npm install express axios dotenv ngrok
```

### 3️⃣ Configure Environment Variables
Create a `.env` file in the root directory:
```env
PORT=3000
GEMINI_API_KEY=your_google_gemini_api_key
```

### 4️⃣ Start the Express Server
```bash
node app.js
```
**OR**, if using ES Modules:
```bash
node --loader tsx app.js
```

### 5️⃣ Start Ngrok
```bash
ngrok http 3000
```
Copy the generated HTTPS URL (`https://xxxx.ngrok-free.app`) and update it in your bot settings.

---
## 📌 API Endpoints

### ➤ Webhook (POST /webhook)
Handles incoming messages.
```http
POST /whatsapp
```
#### Request Body:
```json
{
    "message": "What is polymorphism?"
}
```
#### Response:
```json
{
    "response": "Polymorphism in OOP allows objects of different types to be treated as instances of the same type."
}
```

---
## 📜 Code Structure
```
📂 srm-oop-chatbot/
 ├── 📜 app.js          # Main Express server
 ├── 📜 .env            # Environment variables
 ├── 📂 services/
 │   ├── 📜 aiService.js  # Handles AI responses via Gemini API
 │   ├── 📜 webhook.js    # Webhook processing logic
 ├── 📜 package.json     # Dependencies
 ├── 📜 README.md        # Documentation
```

---
## 🤖 AI Integration (Gemini API)
**`services/aiService.js`**:
```javascript
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const getAIResponse = async (message) => {
    const response = await axios.post(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent',
        {
            prompt: { text: message }
        },
        { headers: { Authorization: `Bearer ${process.env.GEMINI_API_KEY}` } }
    );
    return response.data.candidates[0].content;
};
export { getAIResponse };
```

---
## ✅ Testing Webhook
Use **Postman** or `curl` to test:
```bash
curl -X POST https://your-ngrok-url/webhook -H "Content-Type: application/json" -d '{"message": "Explain OOP?"}'
```

---
## 📌 Troubleshooting
- **Ngrok not recognized?** Try reinstalling: `npm install -g ngrok`
- **404 Webhook Not Found?** Ensure `app.js` has:
  ```javascript
  app.post('/whatsapp', (req, res) => {
      console.log("Received webhook:", req.body);
      res.status(200).send("Webhook received!");
  });
  ```
- **AI not responding?** Check `GEMINI_API_KEY` validity.

---
## 🚀 Future Enhancements
- Add **Twilio WhatsApp** integration.
- Improve **error handling** and logging.

---
## 📜 License
MIT License © 2025 Abhinav Singh

