import React, { useState } from "react";
import "./App.css";

import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import AddUser from "./components/AddUser";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  const [showCreateUser, setShowCreateUser] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("isLoggedIn");
  setIsLoggedIn(false);
};


  // CREATE USER PAGE
  if (showCreateUser && !isLoggedIn) {
    return (
      <div className="create-user-page">

        <div className="create-user-card">

          <AddUser
            setUserId={() => {}}
            setUserName={() => {}}
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
      />
    </div>
  );
}

  // DASHBOARD
return (
  <div>
    <Dashboard onLogout={handleLogout} />
  </div>
);
}

export default App;