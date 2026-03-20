import React, { useState } from "react";
import { getResumeScore, getResumeSuggestion } from "../services/api";

function ChatbotComponent({ onClose }) {

  const [messages, setMessages] = useState([
    { text: "👋 Hello! I can analyze your resume.", sender: "bot" }
  ]);

  const addMessage = (text, sender) => {
    setMessages(prev => [...prev, { text, sender }]);
  };

  const checkScore = async () => {
    addMessage("Check my resume score", "user");

    try {
      const data = await getResumeScore(); // ✅ FIXED

      addMessage(`📊 Your score is ${data.score}`, "bot");

      if (data.score > 80) {
        addMessage("🔥 Excellent! You are a strong candidate.", "bot");
      } 
      else if (data.score > 60) {
        addMessage("👍 Good, but you can improve some skills.", "bot");
      } 
      else {
        addMessage("⚠️ You need to improve your resume significantly.", "bot");
      }

    } catch {
      addMessage("❌ Error connecting to backend", "bot");
    }
  };

  const improveResume = async () => {
    addMessage("How to improve resume?", "user");

    try {
      const data = await getResumeSuggestion(); // ✅ FIXED
      addMessage("💡 " + data.suggestion, "bot");
    } catch {
      addMessage("❌ Error fetching suggestion", "bot");
    }
  };

  const howRankingWorks = () => {
    addMessage("How ranking works?", "user");
    addMessage("📊 Based on skills, experience & keywords.", "bot");
  };

  return (
    <div className="chat-overlay">
      <div className="chat-modal">

        <div className="chat-header">
          Resume AI Assistant
          <span onClick={onClose} className="close-btn">❌</span>
        </div>

        <div className="chat-body">

          {messages.map((msg, i) => (
            <p key={i}>{msg.text}</p>
          ))}

          <button onClick={checkScore}>Check Resume Score</button>
          <button onClick={improveResume}>Improve Resume</button>
          <button onClick={howRankingWorks}>How Ranking Works</button>

        </div>

      </div>
    </div>
  );
}

export default ChatbotComponent;