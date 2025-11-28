# ⚡ Viva Quick Reference Card

## 🎯 Project in 30 Seconds
**CASK** is a voice-enabled AI assistant that lets users speak naturally, get AI responses, and hear replies in multiple languages. Built with React frontend, Express backend, MongoDB database, and OpenAI AI.

---

## 📊 Tech Stack (One Line Each)

| Technology | Purpose |
|------------|---------|
| **React 19** | Frontend UI framework |
| **Vite** | Build tool & dev server |
| **Express.js** | Backend API server |
| **MongoDB** | Database for users & chats |
| **OpenAI** | AI responses & text-to-speech |
| **JWT** | User authentication |
| **Tailwind CSS** | Styling |

---

## 🔄 How It Works (3 Steps)

1. **User speaks** → Browser converts speech to text
2. **Text sent to backend** → OpenAI generates response
3. **Response played** → Text-to-speech converts to audio

---

## 🎤 Top 5 Viva Questions

### Q1: Why this tech stack?
**A**: React for modern UI, Express for fast APIs, MongoDB for flexible data, OpenAI for AI, JWT for security.

### Q2: How does voice work?
**A**: Browser Web Speech API captures voice → converts to text → sends to backend → OpenAI processes → response → text-to-speech → audio played.

### Q3: How is data stored?
**A**: MongoDB stores users (email, hashed password) and conversations (messages array with user/assistant roles).

### Q4: How is it deployed?
**A**: Frontend on Vercel, backend on Render, database on MongoDB Atlas. Environment variables configured in each platform.

### Q5: Security measures?
**A**: Password hashing (bcrypt), JWT tokens, CORS protection, environment variables, input validation.

---

## 📁 Key Files

- `frontend/src/components/VoiceAssistant.jsx` - Main voice component
- `backend/routes/voice.js` - AI processing routes
- `backend/routes/auth.js` - Authentication
- `backend/models/Conversation.js` - Chat data model
- `backend/index.js` - Server entry point

---

## 🔑 Key Features

1. ✅ Voice input/output
2. ✅ Multi-language (3 languages)
3. ✅ Chat history
4. ✅ User authentication
5. ✅ AI-powered responses

---

## 🚀 Deployment URLs

- **Frontend**: `https://cask-assistance.vercel.app`
- **Backend**: `https://your-backend.onrender.com`
- **GitHub**: `https://github.com/YourWebPartner1/CASK-ASSISTANCE`

---

## 💡 Remember

- **Frontend**: React components, voice recognition, UI
- **Backend**: Express routes, OpenAI integration, database
- **Database**: MongoDB for users and conversations
- **Security**: JWT, password hashing, CORS
- **Deployment**: Vercel + Render + MongoDB Atlas

---

**Good Luck! 🎓**

