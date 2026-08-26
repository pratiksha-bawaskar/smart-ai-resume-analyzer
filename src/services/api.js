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
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("UPLOAD SUCCESS:", response.data);
    return response.data;

  } catch (error) {

    console.log("============== UPLOAD ERROR ==============");
    console.log("Status :", error.response?.status);
    console.log("Data   :", error.response?.data);
    console.log("Message:", error.response?.data?.message);
    console.log("Full Response:", JSON.stringify(error.response?.data, null, 2));
    console.log("Headers:", error.response?.headers);
    console.log("Error  :", error);
    console.log("==========================================");

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

// ✅ DOWNLOAD REPORT
export const downloadReportAPI = async () => {
  try {
    const response = await fetch(
      `${RESUME_SERVICE}/resumes/download-report`
    );
    return await response.blob();
  } catch (error) {
    console.error("DOWNLOAD ERROR:", error);
    throw error;
  }
};

// ✅ Candidate Details
export const getCandidateDetails = async (id) => {
  const response = await axios.get(
    `${RESUME_SERVICE}/resumes/candidate/${id}`
  );
  return response.data;
};

// ✅ UPDATE STATUS
export const updateCandidateStatus = async (id, status) => {
  const response = await axios.put(
    `${RESUME_SERVICE}/resumes/${id}/status?status=${status}`
  );

  return response.data;
};

// ✅ LOGIN USER
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(
      `${USER_SERVICE}/auth/login`,
      credentials
    );

    console.log("LOGIN SUCCESS:", response.data);

    return response.data;

  } catch (error) {
    console.error(
      "LOGIN ERROR:",
      error.response?.data || error.message
    );

    throw error;
  }
};