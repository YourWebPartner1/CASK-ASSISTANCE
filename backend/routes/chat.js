const express = require("express");
const Conversation = require("../models/Conversation");
const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ Get All Chats for User
router.get("/chats", verifyToken, async (req, res) => {
  try {
    const chats = await Conversation.find({ userId: req.userId }).sort({ updatedAt: -1 });
    res.json(chats);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch chats" });
  }
});

// ✅ Create New Chat
router.post("/chats", verifyToken, async (req, res) => {
  try {
    const chat = new Conversation({ userId: req.userId, title: "New Chat" });
    await chat.save();
    res.json(chat);
  } catch (err) {
    res.status(500).json({ error: "Failed to create chat" });
  }
});

// ✅ Get Single Chat
router.get("/chats/:id", verifyToken, async (req, res) => {
  try {
    const chat = await Conversation.findOne({ _id: req.params.id, userId: req.userId });
    if (!chat) return res.status(404).json({ error: "Chat not found" });
    res.json(chat);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch chat" });
  }
});

// ✅ Delete Chat
router.delete("/chats/:id", verifyToken, async (req, res) => {
  try {
    await Conversation.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    res.json({ message: "Chat deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete chat" });
  }
});

module.exports = router;
