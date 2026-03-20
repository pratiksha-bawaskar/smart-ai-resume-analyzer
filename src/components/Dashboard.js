import React, { useState } from "react";
import Ranking from "./Ranking";
import AddUser from "./AddUser";
import AddResume from "./AddResume";
import ChatbotComponent from "./ChatbotComponent";

function Dashboard() {

  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [showChat, setShowChat] = useState(false);

  return (

    <div style={mainContent}>

      <div style={container}>

        <h1 className="gradient-text">
          🤖 Smart AI Resume Analyzer 🚀
        </h1>

        <p style={{
          color: "#64748b",
          fontSize: "14px",
          marginTop: "-8px"
        }}>
          🚀 Built by Pratiksha Bawaskar
        </p>

        {/* ✅ OPEN CHAT BUTTON */}
        <button 
          onClick={() => setShowChat(true)} 
          style={{ marginBottom: "15px" }}
        >
          🤖 Open AI Assistant
        </button>

        <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
          <AddUser setUserId={setUserId} setUserName={setUserName} />
          <AddResume userId={userId} userName={userName} />
        </div>

        <Ranking />

      </div>

      {/* ✅ CHATBOT MODAL */}
      {showChat && (
        <ChatbotComponent onClose={() => setShowChat(false)} />
      )}

    </div>
  );
}

export default Dashboard;

/* 🎨 STYLES */

const mainContent = {
  flex: 1,
  padding: "30px",
  display: "flex",
  justifyContent: "center"
};

const container = {
  width: "100%",
  maxWidth: "1000px"
};