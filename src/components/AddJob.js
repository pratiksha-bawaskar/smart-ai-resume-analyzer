import React, { useState } from "react";
import axios from "axios";

function AddJob() {

  const [job, setJob] = useState({
    jobTitle: "",
    requiredSkills: "",
    jobDescription: ""
  });

  const handleChange = (e) => {
    setJob({
      ...job,
      [e.target.name]: e.target.value
    });
  };

const saveJob = async () => {

  if (!job.requiredSkills.includes(",")) {
    alert(
      "Please enter skills separated by commas.\nExample:\njava,spring,spring boot,microservices,aws,jwt"
    );
    return;
  }

  try {

      await axios.post(
        "http://localhost:8083/jobs",
        job
      );

    

      alert("Job Created Successfully 🎉");

      setJob({
        jobTitle: "",
        requiredSkills: "",
        jobDescription: ""
      });

    } catch (error) {
      console.error(error);
      alert("Error Saving Job");
    }
  };

  return (
  <div className="card">

   <h2 style={{ marginBottom: "20px" }}>
  💼 Create New Job
</h2>

<p
  style={{
    color: "#64748b",
    marginTop: "-10px",
    marginBottom: "20px",
    fontSize: "14px"
  }}
>
  Create a new job posting for AI-powered candidate screening.
</p>

<label>Job Title</label>

    <input
      type="text"
      name="jobTitle"
      placeholder="e.g. Senior Java Developer"
      value={job.jobTitle}
      onChange={handleChange}
    />

    <label style={{ fontWeight: "600" }}>
      Required Skills
    </label>

    <input
      type="text"
      name="requiredSkills"
      placeholder="Java, Spring Boot, React, MySQL, AWS"
      value={job.requiredSkills}
      onChange={handleChange}
    />

    <label style={{ fontWeight: "600" }}>
      Job Description
    </label>

    <textarea
      name="jobDescription"
      rows="6"
      placeholder="Enter complete job description..."
      value={job.jobDescription}
      onChange={handleChange}
      style={{
        width: "100%",
        padding: "12px",
        borderRadius: "8px",
        border: "1px solid #d1d5db",
        resize: "vertical",
        marginBottom: "20px",
        boxSizing: "border-box"
      }}
    />

    <button
      onClick={saveJob}
      style={{
        width: "100%",
        padding: "14px",
        fontSize: "16px",
        fontWeight: "bold"
      }}
    >
      🚀 Create Job Posting
    </button>

  </div>
);
}

export default AddJob;