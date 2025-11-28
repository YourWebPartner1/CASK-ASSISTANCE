const express = require("express");
const OpenAI = require("openai");
const Conversation = require("../models/Conversation");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ✅ Protected AI Route (Updated with History)
router.post("/ask", verifyToken, async (req, res) => {
  const { userSpeech, language, chatId } = req.body;
  const langInstruction = language ? `Reply in ${language}.` : "Reply in the language the user asked.";
  
  try {
    // Fetch conversation history if chatId is provided
    let conversation;
    let history = [];
    
    if (chatId) {
      conversation = await Conversation.findOne({ _id: chatId, userId: req.userId });
      if (conversation) {
        // Get last 10 messages for context
        history = conversation.messages.slice(-10).map(m => ({ role: m.role, content: m.text }));
      }
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: `You are a helpful voice assistant. ${langInstruction}` },
        ...history,
        { role: "user", content: userSpeech }
      ],
    });
    const reply = response.choices[0].message.content;

    // Save to database
    if (!conversation) {
      conversation = new Conversation({ userId: req.userId, title: userSpeech.substring(0, 30) + (userSpeech.length > 30 ? "..." : "") });
    }

    conversation.messages.push({ role: "user", text: userSpeech });
    conversation.messages.push({ role: "assistant", text: reply });
    
    // Update title if it's the first message (and we just created it or it's short)
    if (conversation.messages.length <= 2) {
      conversation.title = userSpeech.substring(0, 30) + (userSpeech.length > 30 ? "..." : "");
    }
    
    await conversation.save();

    res.json({ reply, chatId: conversation ? conversation._id : null, title: conversation ? conversation.title : null });
  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).json({ error: "Error processing voice input" });
  }
});

// ✅ Text-to-Speech Route
router.post("/speak", verifyToken, async (req, res) => {
  const { text, voice } = req.body;
  try {
    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: voice || "alloy",
      input: text,
    });
    const buffer = Buffer.from(await mp3.arrayBuffer());
    res.set("Content-Type", "audio/mpeg");
    res.send(buffer);
  } catch (error) {
    console.error("❌ TTS Error:", error);
    res.status(500).json({ error: "Error generating speech" });
  }
});

module.exports = router;
