import React, { useState } from "react";
import { uploadResume } from "../services/api";
import "./AddResume.css";

function AddResume({ onUploadSuccess }) {

const [file, setFile] = useState([]);
const [loading, setLoading] = useState(false);
const [success, setSuccess] = useState("");
const [errorMsg, setErrorMsg] = useState("");
// const [candidate, setCandidate] = useState(null);

  const handleUploadResume = async () => {

    if (file.length === 0) {
        alert("Please upload resume");
        return;
    }

    const invalidFiles = file.filter(
        (f) => f.type !== "application/pdf"
    );

    if (invalidFiles.length > 0) {
        setErrorMsg("Only PDF resumes are allowed.");
        return;
    }

    const largeFiles = file.filter(
        (f) => f.size > 5 * 1024 * 1024
    );

    if (largeFiles.length > 0) {
        setErrorMsg("File size should not exceed 5 MB.");
        return;
    }

setLoading(true);

setSuccess("");

setErrorMsg("");

try {

    console.log("Selected Files:", file);

  for (let i = 0; i < file.length; i++) {

    const formData = new FormData();
    formData.append("file", file[i]);

    const response = await uploadResume(formData);

    console.log(response);

    // setCandidate(response);
}

    setSuccess("All Resumes Uploaded Successfully 🎉");
    setFile([]);

    if (onUploadSuccess) {
    onUploadSuccess();
}

} catch (error) {

    console.error(error);
    setErrorMsg("Upload Failed ❌");

} finally {

    setLoading(false);

}
  };

  return (
    <div className="card">

      <h2>Upload Resume</h2>
      <p
  style={{
    color: "#64748b",
    fontSize: "13px",
    marginBottom: "15px"
  }}
>
  Upload PDF resumes for AI-powered parsing, ATS scoring and candidate ranking.
</p>

   <label
style={{
display: "block",
padding: "35px",
border: "2px dashed #3b82f6",
borderRadius: "12px",
textAlign: "center",
cursor: "pointer",
background: "#f8fbff",
transition: "0.3s"
}}
>

<div style={{fontSize:"45px"}}>📂</div>

<h3 style={{margin:"10px 0"}}>
Drag & Drop or Click
</h3>

<p
style={{
color:"#64748b"
}}
>
Upload PDF Resumes
</p>

<input
type="file"
accept=".pdf"
multiple
style={{display:"none"}}
onChange={(e)=>setFile(Array.from(e.target.files))}
/>

</label>

{success && (
  <div
    style={{
      marginTop: "15px",
      padding: "12px",
      background: "#ecfdf5",
      border: "1px solid #22c55e",
      borderRadius: "8px",
      color: "#166534",
      fontWeight: "bold"
    }}
  >
    ✅ {success}
  </div>
)}

{errorMsg && (
  <div
    style={{
      marginTop: "15px",
      padding: "12px",
      background: "#fef2f2",
      border: "1px solid #ef4444",
      borderRadius: "8px",
      color: "#b91c1c",
      fontWeight: "bold"
    }}
  >
    ❌ {errorMsg}
  </div>
)}


 {file.length > 0 && (
  <div
    style={{
      marginTop: "15px",
      padding: "12px",
      background: "#f8fafc",
      border: "1px solid #dbeafe",
      borderRadius: "10px"
    }}
  >
    <p
      style={{
        marginBottom: "10px",
        fontWeight: "bold"
      }}
    >
      Total Selected : {file.length}
    </p>

    <strong>📂 Selected Files</strong>

    {file.map((f, index) => (
  <div
    key={index}
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      margin: "8px 0",
      padding: "8px",
      borderBottom: "1px solid #e2e8f0"
    }}
  >
    <div>
      📄 {f.name}
      <br />
      <small>{(f.size / 1024).toFixed(1)} KB</small>
    </div>

    <button
      onClick={() =>
  setFile((prevFiles) => prevFiles.filter((_, i) => i !== index))
}
      style={{
        background: "#ef4444",
        color: "white",
        border: "none",
        borderRadius: "6px",
        padding: "5px 10px",
        cursor: "pointer"
      }}
    >
      ❌
    </button>
  </div>
))}
  </div>
)}

<button
  onClick={handleUploadResume}
  disabled={loading}
  style={{
    width: "100%",
    marginTop: "18px",
    padding: "12px",
    border: "none",
    borderRadius: "10px",
    background: "linear-gradient(135deg,#2563eb,#06b6d4)",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "15px"
  }}
>
  {loading
    ? "⏳ Uploading..."
    : `⬆ Upload ${file.length || ""} Resume${file.length > 1 ? "s" : ""}`}
</button>

{loading && (
  <p
    style={{
      color: "#2563eb",
      marginTop: "10px",
      fontWeight: "bold"
    }}
  >
    ⏳ Uploading resumes...
  </p>
)}
    </div>
  );
}

export default AddResume;