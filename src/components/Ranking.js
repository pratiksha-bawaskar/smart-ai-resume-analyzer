import React, { useState, useEffect } from "react";
import {
  getRanking,
  deleteAllData,
  downloadReportAPI,
  getCandidateDetails
} from "../services/api";
import "./Ranking.css";

function Ranking({ refreshRanking, onLogout }) {

  const [rankingData, setRankingData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const totalCandidates = rankingData.length;
  const [sortBy, setSortBy] = useState("HIGH_SCORE");

const interviewCount =
rankingData.filter(c => c.status === "INTERVIEW").length;

const selectedCount =
rankingData.filter(c => c.status === "SELECTED").length;

const reviewCount =
rankingData.filter(c => c.status === "UNDER REVIEW").length;

const rejectedCount =
rankingData.filter(c => c.status === "REJECTED").length;

const filteredRanking = rankingData.filter(candidate => {

  const matchesSearch =
    candidate.name?.toLowerCase().includes(search.toLowerCase()) ||
    candidate.email?.toLowerCase().includes(search.toLowerCase());

  const matchesStatus =
    statusFilter === "ALL" ||
    candidate.status === statusFilter;

  return matchesSearch && matchesStatus;

});


const sortedRanking = [...filteredRanking].sort((a, b) => {

  switch (sortBy) {

    case "HIGH_SCORE":
      return b.score - a.score;

    case "LOW_SCORE":
      return a.score - b.score;

    case "A_Z":
      return a.name.localeCompare(b.name);

    case "Z_A":
      return b.name.localeCompare(a.name);

    default:
      return 0;

  }

});


  const generateRanking = async () => {

    setLoading(true);

    try {

      const data = await getRanking();

      console.log(data);

      setRankingData(data);

    } catch (error) {

      console.error(
        "RANKING ERROR:",
        error.response?.data || error.message
      );

      alert(
        "Backend error: " +
        (error.response?.data || error.message)
      );
    }

    setLoading(false);
  };

 useEffect(() => {
  generateRanking();
}, [refreshRanking]);

  const clearData = async () => {

    if (!window.confirm("Are you sure?"))
      return;

    try {

      await deleteAllData();

      setRankingData([]);

    } catch (error) {

      console.error(error);
    }
  };

  const downloadReport = async () => {

    try {

      const blob = await downloadReportAPI();

      const url =
        window.URL.createObjectURL(blob);

      const a =
        document.createElement("a");

      a.href = url;
      a.download = "report.csv";

      a.click();

      window.URL.revokeObjectURL(url);


    } catch (error) {

      console.error(
        "Download failed",
        error
      );
    }
  };

  const getMedal = (index) => {

    if (index === 0) return "🥇";
    if (index === 1) return "🥈";
    if (index === 2) return "🥉";

    return index + 1;
  };

 const fetchCandidateDetails = async (id) => {

  try {

    const data = await getCandidateDetails(id);

    setSelectedCandidate(data);

  } catch (error) {

    console.error(error);

  }
};

  return (

  <div className="card ranking-card">

    {/* ================= Analytics Cards ================= */}

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(170px,1fr))",
        gap: "15px",
        marginBottom: "25px"
      }}
    >

      <div className="analytics-card">
        <h2>👥</h2>
        <h3>{totalCandidates}</h3>
        <p>Total Candidates</p>
      </div>

      <div className="analytics-card">
        <h2>📄</h2>
        <h3>{totalCandidates}</h3>
        <p>Uploaded Resumes</p>
      </div>

      <div className="analytics-card">
        <h2>🎯</h2>
        <h3>{interviewCount}</h3>
        <p>Interview</p>
      </div>

      <div className="analytics-card">
        <h2>✅</h2>
        <h3>{selectedCount}</h3>
        <p>Selected</p>
      </div>

      <div className="analytics-card">
        <h2>🟡</h2>
        <h3>{reviewCount}</h3>
        <p>Under Review</p>
      </div>

      <div className="analytics-card">
        <h2>❌</h2>
        <h3>{rejectedCount}</h3>
        <p>Rejected</p>
      </div>

    </div>

    {/* ================= Dashboard Header ================= */}

    <div className="ranking-header">

      <div>

        <h2 style={{ margin: 0 }}>
          🏆 Resume Ranking Dashboard
        </h2>

        <p
          style={{
            color: "#64748b",
            marginTop: "5px"
          }}
        >
          AI Powered Candidate Ranking & Analysis
        </p>

      </div>

 <div
style={{
display:"flex",
justifyContent:"space-between",
alignItems:"flex-start",
flexWrap:"wrap",
gap:"20px",
width:"100%"
}}
>

<input
  type="text"
  placeholder="Search Candidate..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>

<select
  value={sortBy}
  onChange={(e) => setSortBy(e.target.value)}
  style={{
    padding: "10px",
    borderRadius: "8px",
    marginBottom: "10px"
  }}
>
  <option value="HIGH_SCORE">Highest Score</option>
  <option value="LOW_SCORE">Lowest Score</option>
  <option value="A_Z">A → Z</option>
  <option value="Z_A">Z → A</option>
</select>

<div
  style={{
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
    marginTop: "10px"
  }}
>
 {[
  "ALL",
  "SELECTED",
  "INTERVIEW",
  "UNDER REVIEW",
  "REJECTED"
].map((status) => (

<button
  key={status}
  onClick={() => setStatusFilter(status)}
  style={{
    padding: "8px 14px",
    borderRadius: "20px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    background:
      statusFilter === status
        ? "#2563eb"
        : "#e5e7eb",
    color:
      statusFilter === status
        ? "#fff"
        : "#111827"
  }}
>
  {status}

  {status === "ALL"
    ? ` (${totalCandidates})`
    : status === "SELECTED"
    ? ` (${selectedCount})`
    : status === "INTERVIEW"
    ? ` (${interviewCount})`
    : status === "UNDER REVIEW"
    ? ` (${reviewCount})`
    : ` (${rejectedCount})`}
</button>

))}
</div>

<button onClick={generateRanking}>
  ⚡ Generate Ranking
</button>

<button onClick={downloadReport}>
  📥 Download Report
</button>

<button
  className="danger"
  onClick={clearData}
>
  🗑 Clear
</button>

</div>

    </div>

    {/* ================= Loading ================= */}

    {loading && (
      <p className="loading">
        Analyzing resumes... 🤖
      </p>
    )}

    {/* ================= Ranking Table starts here ================= */}

      <div style={{overflowX:"auto"}}>

<table className="ranking-table">

        <thead>
  <tr>
    <th>Rank</th>
    <th>Candidate</th>
    <th>Email</th>
    <th>Candidate ID</th>
    <th>ATS Score</th>
    <th>Status</th>
    <th>Action</th>
  </tr>
</thead>

        <tbody>

          {rankingData.length === 0 ? (

            <tr>
<td
colSpan="7"
className="no-data"
>
No Data Found
</td>

            </tr>

          ) : (

        sortedRanking.map((r, index) => (
              <tr
                key={r.id}
                style={{
                  background:
                    index === 0
                      ? "#ecfdf5"
                      : "white"
                }}
              >

                <td>
                  {getMedal(index)}
                </td>
<td>
  👤 {r.name || "Unknown Candidate"}
</td>

<td>
  {r.email || "Not Available"}
</td>

<td>
  {r.id}
</td>

<td>

  <div className="score-bar">

    <div
      className="score-fill"
      style={{
        width: `${r.score}%`
      }}
    ></div>

  </div>

  <span
    className={
      r.score > 80
        ? "high"
        : r.score > 60
        ? "medium"
        : "low"
    }
  >
    {r.score}
  </span>

  <div>

    {r.score > 80
      ? "🔥 Strong Match"
      : r.score > 60
      ? "👍 Good Match"
      : "⚠️ Needs Improvement"}

  </div>

</td>

<td>

<span
style={{
padding:"7px 14px",
borderRadius:"20px",
fontWeight:"bold",
color:"#fff",
background:
r.status==="INTERVIEW"
?"#16a34a"
:r.status==="SELECTED"
?"#2563eb"
:r.status==="UNDER REVIEW"
?"#f59e0b"
:"#dc2626"
}}
>

{r.status || "UNDER REVIEW"}

</span>

</td>

<td>

<button
onClick={() => fetchCandidateDetails(r.id)}
>

View Details

</button>

</td>

              </tr>

            ))

          )}

        </tbody>

            </table>

      <div className="logout-section">
        <button
          className="logout-btn"
          onClick={onLogout}
        >
          🚪 Logout
        </button>
      </div>

      {selectedCandidate && (

        <div
          style={{
            background: "#fff",
            padding: "20px",
            marginTop: "20px",
            border: "1px solid #ddd"
          }}
        >

<div className="ai-analysis-card">

<h2>🤖 AI Resume Analysis</h2>

<div className="ai-grid">

<div>
<h4>🎯 Skill Match</h4>
<p>{selectedCandidate.score}%</p>
</div>

<div>
<h4>📈 Hiring Probability</h4>
<p>
{selectedCandidate.score >= 85
? "95%"
: selectedCandidate.score >= 75
? "80%"
: selectedCandidate.score >= 50
? "65%"
: "30%"}
</p>
</div>

<div>
<h4>⭐ Candidate Level</h4>
<p>
{selectedCandidate.score >= 85
? "Excellent"
: selectedCandidate.score >= 75
? "Good"
: selectedCandidate.score >= 50
? "Average"
: "Poor"}
</p>
</div>

<div>
<h4>💼 Recommended Role</h4>
<p>Java Developer</p>
</div>

</div>

</div>

          <h3>
            Candidate Details
          </h3>

          <p>
            Name:
            {" "}
            {selectedCandidate.name}
          </p>

          <p>
            Email:
            {" "}
            {selectedCandidate.email}
          </p>

          <p>
            Phone:
            {" "}
            {selectedCandidate.phone}
          </p>

          <p>
            Skills:
            {" "}
            {selectedCandidate.skills}
          </p>

       <p>


<strong>Resume Score</strong>

<br/><br/>

<progress
value={selectedCandidate.score}
max="100"
style={{
width:"100%",
height:"18px"
}}
></progress>

<br/>

<b
style={{
fontSize:"24px",
color:"#2563eb"
}}
>
{selectedCandidate.score} /100
</b>

</p>

          <p>
  <strong>Status : </strong>

  <span
    style={{
      padding: "8px 18px",
      borderRadius: "20px",
      color: "#fff",
      fontWeight: "bold",
      background:
        selectedCandidate.status === "INTERVIEW"
          ? "#16a34a"
          : selectedCandidate.status === "SELECTED"
          ? "#2563eb"
          : selectedCandidate.status === "UNDER REVIEW"
          ? "#f59e0b"
          : "#dc2626"
    }}
  >
    {selectedCandidate.status}
  </span>
</p>

         <p>

<strong>Missing Skills</strong>

<br/><br/>

<span
style={{
background:"#fee2e2",
padding:"8px 15px",
borderRadius:"15px",
color:"#dc2626",
fontWeight:"bold"
}}
>
{selectedCandidate.missingSkills || "None"}
</span>

</p>

          <div
style={{
marginTop:"20px",
padding:"18px",
background:"#f0fdf4",
borderLeft:"6px solid green",
borderRadius:"10px"
}}
>

<h4>
💡 AI Recommendation
</h4>

<p>
{selectedCandidate.suggestion}
</p>

</div>

         <button
onClick={() => setSelectedCandidate(null)}
style={{
marginTop:"20px",
padding:"10px 25px",
background:"#2563eb",
color:"#fff",
border:"none",
borderRadius:"8px",
cursor:"pointer"
}}
>
Close
</button>

        </div>

      )}

    </div>

  </div>

);

}

export default Ranking;