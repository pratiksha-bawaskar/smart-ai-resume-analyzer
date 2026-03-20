import axios from "axios";

// ✅ Separate services
const USER_SERVICE = "http://localhost:8081";
const RESUME_SERVICE = "http://localhost:8082";


// ✅ CREATE USER
export const createUser = async (user) => {
  try {
    const response = await axios.post(`${USER_SERVICE}/users`, user);
    return response.data;
  } catch (error) {
    console.error("CREATE USER ERROR:", error.response?.data || error.message);
    throw error;
  }
};


// ✅ UPLOAD RESUME
export const uploadResume = async (formData) => {
  try {
    const response = await axios.post(
      `${RESUME_SERVICE}/resumes/upload`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" }
      }
    );
    return response.data;
  } catch (error) {
    console.error("UPLOAD ERROR:", error.response?.data || error.message);
    throw error;
  }
};


// ✅ GET RANKING
export const getRanking = async () => {
  try {
    const response = await axios.get(`${RESUME_SERVICE}/resumes/ranking`);
    return response.data;
  } catch (error) {
    console.error("RANKING ERROR:", error.response?.data || error.message);
    throw error;
  }
};


// ✅ DELETE DATA
export const deleteAllData = async () => {
  try {
    const response = await axios.delete(`${RESUME_SERVICE}/resumes/deleteAll`);
    return response.data;
  } catch (error) {
    console.error("DELETE ERROR:", error.response?.data || error.message);
    throw error;
  }
};


// ✅ GET SCORE
export const getResumeScore = async () => {
  try {
    const response = await axios.get(`${RESUME_SERVICE}/resumes/score`);
    return response.data;
  } catch (error) {
    console.error("SCORE ERROR:", error.response?.data || error.message);
    throw error;
  }
};


// ✅ GET SUGGESTION
export const getResumeSuggestion = async () => {
  try {
    const response = await axios.get(`${RESUME_SERVICE}/resumes/improve`);
    return response.data;
  } catch (error) {
    console.error("SUGGESTION ERROR:", error.response?.data || error.message);
    throw error;
  }
};

// DOWNLOAD REPORT
export const downloadReportAPI = async () => {
  try {
    const response = await fetch("http://localhost:8082/resumes/download-report");
    return await response.blob();
  } catch (error) {
    console.error("DOWNLOAD ERROR:", error);
    throw error;
  }
};