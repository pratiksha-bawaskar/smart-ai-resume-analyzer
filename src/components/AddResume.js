import React, { useState } from "react";
import { uploadResume } from "../services/api";

function AddResume({ userId, userName }) {

  const [file, setFile] = useState(null);
  const [jobDesc, setJobDesc] = useState(""); // ✅ NEW

  const handleUploadResume = async () => {

    if (!userId) {
      alert("Please create user first");
      return;
    }

    if (!file) {
      alert("Please upload a resume");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", userId);
    formData.append("name", userName);
    formData.append("jobDescription", jobDesc); // ✅ NEW

    try {

      await uploadResume(formData);

      alert("Resume Uploaded Successfully 🎉");

      setFile(null);
      setJobDesc(""); // ✅ reset

    } catch (error) {
      console.error(error);
      alert("Upload failed ❌");
    }
  };

  return (
    <div className="card">

      <h2>Upload Resume</h2>

      {/* ✅ USER ID */}
      <input value={userId} readOnly />

      {/* ✅ JOB DESCRIPTION INPUT */}
      <input
        placeholder="Enter Job Description"
        value={jobDesc}
        onChange={(e)=>setJobDesc(e.target.value)}
      />

      {/* ✅ FILE INPUT */}
      <input 
        type="file" 
        onChange={(e) => setFile(e.target.files[0])} 
      />

      {/* ✅ FILE NAME SHOW */}
      {file && <p>Selected: {file.name}</p>}

      <button onClick={handleUploadResume}>
        Upload Resume
      </button>

    </div>
  );
}

export default AddResume;