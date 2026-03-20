import React, { useState, useEffect } from "react";
import { getRanking, deleteAllData, downloadReportAPI } from "../services/api";

function Ranking(){

  const [rankingData, setRankingData] = useState([]);
  const [loading, setLoading] = useState(false);

  const generateRanking = async () => {
    setLoading(true);

    try {
      const data = await getRanking();
      setRankingData(data);
    } catch (error) {
  console.error("RANKING ERROR:", error.response?.data || error.message);
  alert("Backend error: " + (error.response?.data || error.message));
}

    setLoading(false);
  };

  useEffect(() => {
    generateRanking();
  }, []);

  const clearData = async () => {
    if (!window.confirm("Are you sure?")) return;

    try {
      await deleteAllData();
      setRankingData([]);
    } catch (error) {
      console.error(error);
    }
  };

  // ✅ FINAL DOWNLOAD FUNCTION
  const downloadReport = async () => {
    try {
      const blob = await downloadReportAPI();

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "report.csv";
      a.click();
    } catch (error) {
      console.error("Download failed", error);
    }
  };

  const getMedal = (index) => {
    if (index === 0) return "🥇";
    if (index === 1) return "🥈";
    if (index === 2) return "🥉";
    return index + 1;
  };

  return(

    <div className="card ranking-card">

      <div className="ranking-header">
        <h3>🏆 Resume Ranking</h3>

        <div>
          <button onClick={generateRanking}>Generate</button>
          <button className="danger" onClick={clearData}>Clear</button>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
        <h4>Total Candidates: {rankingData.length}</h4>

        {/* ✅ FIXED BUTTON */}
        <button onClick={downloadReport}>
          Download Report
        </button>
      </div>

      {loading && <p className="loading">Analyzing resumes... 🤖</p>}

      <table className="ranking-table">

        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>User ID</th>
            <th>Score</th>
          </tr>
        </thead>

        <tbody>

          {rankingData.length === 0 ? (
            <tr>
              <td colSpan="4" className="no-data">
                No Data Found
              </td>
            </tr>
          ) : (

            rankingData.map((r, index) => (

              <tr key={index}
                style={{ background: index === 0 ? "#ecfdf5" : "white" }}
              >

                <td>{getMedal(index)}</td>
                <td>{r.name || "User " + r.userId}</td>
                <td>{r.userId}</td>

                <td>
                  <div className="score-bar">
                    <div 
                      className="score-fill"
                      style={{ width: `${r.score}%` }}
                    ></div>
                  </div>

                  <span className={
                    r.score > 80 ? "high" :
                    r.score > 60 ? "medium" : "low"
                  }>
                    {r.score}
                  </span>

                  <div>
                    {r.score > 80 ? "🔥 Strong Match" :
                     r.score > 60 ? "👍 Good Match" :
                     "⚠️ Needs Improvement"}
                  </div>

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>
  );
}

export default Ranking;