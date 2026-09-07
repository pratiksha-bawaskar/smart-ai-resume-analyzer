import React, { useState } from "react";
import { loginUser } from "../services/api";
import { Eye, EyeOff } from "lucide-react";
import "./Login.css";

function Login({ onLogin, onCreateUser, setUserId, setUserName }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);

      const data = await loginUser({ email, password });

      // ✅ Save JWT token
      localStorage.setItem("token", data.token);

      // ✅ Save login state
      localStorage.setItem("isLoggedIn", "true");

      // ✅ Save userId and userName if backend returns them
      if (data.id && data.name) {
        setUserId(data.id);
        setUserName(data.name);
        localStorage.setItem("userId", data.id);
        localStorage.setItem("userName", data.name);
      }

      // Tell App that login was successful
      onLogin();
    } catch (error) {
      setError(
        error.response?.data?.message || "Invalid email or password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">
          {/* SVG logo */}
        </div>

        <h1>TalentLens AI</h1>
        <p className="login-subtitle">AI Powered Intelligent Recruitment</p>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {error && <div className="login-error">{error}</div>}

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="login-footer">TalentLens AI v1.0</p>

        <button
          type="button"
          className="create-user-button"
          onClick={onCreateUser}
        >
          Create New User
        </button>
      </div>
    </div>
  );
}

export default Login;
