import React, { useState } from "react";
import Ranking from "./Ranking";
import AddResume from "./AddResume";
import ChatbotComponent from "./ChatbotComponent";
import { motion } from "framer-motion";
import "./Dashboard.css";
import {
  FaRobot,
  FaChartLine
} from "react-icons/fa";

function Dashboard({ onLogout }) {
  const [showChat, setShowChat] = useState(false);
  const [refreshRanking, setRefreshRanking] = useState(false);

  return (
    <div className="dashboard-page">

      <div className="dashboard-container">

        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="hero-card"
        >
          <h1 className="hero-title">
            🧠 TalentLens AI
          </h1>

          <h3 className="hero-subtitle">
            Welcome Recruiter 👋
          </h3>

          <p>
            AI Powered Intelligent Recruitment Platform
          </p>

          <div className="hero-tags">
            <span>✅ Resume Parsing</span>
            <span>🎯 ATS Scoring</span>
            <span>🤖 AI Matching</span>
            <span>🏆 Candidate Ranking</span>
            <span>📊 Analytics</span>
          </div>
        </motion.div>

        {/* OPEN CHAT BUTTON */}
        <button
          className="copilot-btn"
          onClick={() => setShowChat(true)}
        >
          <FaRobot className="btn-icon" />
          TalentLens Copilot
        </button>

        <div className="dashboard-grid">

          <AddResume
            onUploadSuccess={() =>
              setRefreshRanking(prev => !prev)
            }
          />

        </div>

        {/* RANKING */}
        <Ranking
          refreshRanking={refreshRanking}
          onLogout={onLogout}
        />

        {/* FOOTER - TABLE KE BAAD */}
        <div className="footer">

          <h3>
            <FaChartLine className="footer-icon" />
            TalentLens AI v1.0
          </h3>

          <p>
            Java • Spring Boot • React • MySQL • REST APIs • Microservices
          </p>

          <p>
            © 2026 Pratiksha Bawaskar
          </p>

        </div>

      </div>

      {/* CHATBOT MODAL */}
      {showChat && (
        <ChatbotComponent
          onClose={() => setShowChat(false)}
        />
      )}

    </div>
  );
}

export default Dashboard;