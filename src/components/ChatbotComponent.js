import React, { useState } from "react";
import { getResumeScore, getResumeSuggestion } from "../services/api";
import "./ChatbotComponent.css";

function ChatbotComponent({ onClose }) {

  const [messages, setMessages] = useState([
    {
      text: "👋 Hello! I'm TalentLens Copilot.",
      sender: "bot"
    },
    {
      text: "I can help you understand resume scores, improve resumes and understand candidate ranking.",
      sender: "bot"
    }
  ]);

  const addMessage = (text, sender) => {
    setMessages(prev => [
      ...prev,
      { text, sender }
    ]);
  };

  // Resume Score
  const checkScore = async () => {

    addMessage("📊 Check my resume score", "user");

    try {

      const data = await getResumeScore();

      addMessage(
        `📊 Your resume score is ${data.score}/100.`,
        "bot"
      );

      if (data.score > 80) {

        addMessage(
          "🔥 Excellent! Your resume is a strong match.",
          "bot"
        );

      } else if (data.score > 60) {

        addMessage(
          "👍 Good score! Some improvements can make your resume stronger.",
          "bot"
        );

      } else {

        addMessage(
          "⚠️ Your resume needs improvement in skills and relevance.",
          "bot"
        );
      }

    } catch {

      addMessage(
        "❌ I couldn't connect to the resume analysis service.",
        "bot"
      );
    }
  };

  // Resume Improvement
  const improveResume = async () => {

    addMessage(
      "💡 How can I improve my resume?",
      "user"
    );

    try {

      const data = await getResumeSuggestion();

      addMessage(
        "💡 " + data.suggestion,
        "bot"
      );

    } catch {

      addMessage(
        "❌ I couldn't fetch resume suggestions.",
        "bot"
      );
    }
  };

  // Ranking explanation
  const howRankingWorks = () => {

    addMessage(
      "🎯 How does candidate ranking work?",
      "user"
    );

    addMessage(
      "TalentLens ranks candidates using factors such as skills, experience and relevant resume keywords.",
      "bot"
    );
  };

  // ATS explanation
  const whatATSMeans = () => {

    addMessage(
      "📊 What does ATS score mean?",
      "user"
    );

    addMessage(
      "ATS Score indicates how closely a candidate's resume matches the requirements and skills of the job.",
      "bot"
    );
  };

  // Platform explanation
  const whatTalentLensDoes = () => {

    addMessage(
      "🤖 What can TalentLens AI do?",
      "user"
    );

    addMessage(
      "TalentLens AI helps recruiters create jobs, upload resumes, analyze candidates, calculate ATS scores and rank candidates for recruitment.",
      "bot"
    );
  };

  return (

    <div className="chat-overlay">

      <div className="chat-modal">

        {/* HEADER */}

        <div className="chat-header">

          <div>
            🤖 <strong>TalentLens Copilot</strong>
            <div className="chat-subtitle">
              AI Recruitment Assistant
            </div>
          </div>

          <span
            onClick={onClose}
            className="close-btn"
          >
            ✕
          </span>

        </div>

        {/* BODY */}

        <div className="chat-body">

          {/* MESSAGES */}

          <div className="messages">

            {messages.map((msg, i) => (

              <div
                key={i}
                className={
                  msg.sender === "user"
                    ? "message user-message"
                    : "message bot-message"
                }
              >
                {msg.text}
              </div>

            ))}

          </div>

          {/* HELP SECTION */}

          <div className="chat-help">

            <h4>💡 What can I help with?</h4>

            <p>
              Ask me about resume analysis, ATS scoring
              and candidate ranking.
            </p>

          </div>

          {/* QUESTIONS */}

          <div className="chat-actions">

            <button onClick={checkScore}>
              📊 Check Resume Score
            </button>

            <button onClick={improveResume}>
              💡 Improve Resume
            </button>

            <button onClick={howRankingWorks}>
              🎯 How Ranking Works
            </button>

            <button onClick={whatATSMeans}>
              📈 What is ATS Score?
            </button>

            <button onClick={whatTalentLensDoes}>
              🤖 What can TalentLens AI do?
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ChatbotComponent;