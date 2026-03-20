import React from "react";

const buttonStyle = {
  padding: "10px",
  borderRadius: "6px",
  background: "#2563eb",
  color: "white",
  border: "none",
  cursor: "pointer",
  transition: "0.3s"
};

const Options = ({ actionProvider }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>

      <button 
        onClick={actionProvider.handleCheckScore}
        style={buttonStyle}
        onMouseEnter={(e) => e.target.style.background = "#1d4ed8"}
        onMouseLeave={(e) => e.target.style.background = "#2563eb"}
      >
        📊 Check Resume Score
      </button>

      <button 
        onClick={actionProvider.handleImproveResume}
        style={buttonStyle}
        onMouseEnter={(e) => e.target.style.background = "#1d4ed8"}
        onMouseLeave={(e) => e.target.style.background = "#2563eb"}
      >
        📈 Improve Resume
      </button>

      <button 
        onClick={() => actionProvider.handleGeneralQuestion("how ranking works")}
        style={buttonStyle}
        onMouseEnter={(e) => e.target.style.background = "#1d4ed8"}
        onMouseLeave={(e) => e.target.style.background = "#2563eb"}
      >
        🧠 How Ranking Works
      </button>

    </div>
  );
};

export default Options;