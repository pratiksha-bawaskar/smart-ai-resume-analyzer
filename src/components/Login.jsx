import React, { useState } from "react";
import { loginUser } from "../services/api";
import { Eye, EyeOff } from "lucide-react";
import "./Login.css";

function Login({ onLogin, onCreateUser }) {

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

      const data = await loginUser({
        email,
        password
      });

      // Save JWT token
      localStorage.setItem("token", data.token);

      // Save login state
      localStorage.setItem("isLoggedIn", "true");

      // Tell App that login was successful
      onLogin();

    } catch (error) {

      setError(
        error.response?.data?.message ||
        "Invalid email or password."
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="login-page">

      <div className="login-card">

        <div className="login-logo">
  <svg
    width="58"
    height="58"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="28"
      cy="28"
      r="17"
      stroke="#1769E0"
      strokeWidth="5"
    />

    <path
      d="M40 40L53 53"
      stroke="#10A9D8"
      strokeWidth="5"
      strokeLinecap="round"
    />

    <path
      d="M48 9L49.5 13.5L54 15L49.5 16.5L48 21L46.5 16.5L42 15L46.5 13.5L48 9Z"
      fill="#FF5FA2"
    />

    <path
      d="M56 24L57 27L60 28L57 29L56 32L55 29L52 28L55 27L56 24Z"
      fill="#FF5FA2"
    />
  </svg>
</div>

        <h1>TalentLens AI</h1>

        <p className="login-subtitle">
          AI Powered Intelligent Recruitment
        </p>

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

          {error && (
            <div className="login-error">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <p className="login-footer">
          TalentLens AI v1.0
        </p>

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