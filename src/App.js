import React, { useState } from "react";
import "./App.css";

import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import AddUser from "./components/AddUser";

function App() {
  // ✅ initialize from localStorage so values persist after refresh
 const [userId, setUserId] = useState(
  () => localStorage.getItem("userId")
);

const [userName, setUserName] = useState(
  () => localStorage.getItem("userName") || ""
);

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  const [showCreateUser, setShowCreateUser] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
  };

  const handleLogout = () => {
    setUserId(null);
    setUserName("");
    setIsLoggedIn(false);

    // ✅ clear localStorage
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("token"); // if you store token
  };

  // CREATE USER PAGE
  if (showCreateUser && !isLoggedIn) {
    return (
      <div className="create-user-page">
        <div className="create-user-card">
          <AddUser
            setUserId={setUserId}
            setUserName={setUserName}
          />
          <button
            className="back-login-button"
            onClick={() => setShowCreateUser(false)}
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  // LOGIN PAGE
  if (!isLoggedIn) {
    return (
      <div className="auth-wrapper">
       <Login
  onLogin={handleLogin}
  onCreateUser={() => setShowCreateUser(true)}
  setUserId={setUserId}
  setUserName={setUserName}
/>
      </div>
    );
  }

  // DASHBOARD
  return (
    <div>
      <Dashboard
        onLogout={handleLogout}
        userId={userId}
        userName={userName}
      />
    </div>
  );
}

export default App;
