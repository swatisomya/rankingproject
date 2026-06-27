import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signInWithGoogle } from "../firebase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");
    if (!email || !password) { setError("Please fill in all fields"); return; }
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("user_id", data.user_id);
        navigate("/dashboard");
      } else {
        setError(data.message);
      }
    } catch {
      setError("Cannot connect to server. Make sure backend is running.");
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    setError("");
    setGoogleLoading(true);
    try {
      const user = await signInWithGoogle();

      const response = await fetch("http://127.0.0.1:5000/google-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          name: user.displayName
        })
      });

      const data = await response.json();

      if (data.user_id) {
        localStorage.setItem("user_id", data.user_id);
        localStorage.setItem("user_name", data.name);

        if (data.is_new) {
          navigate("/complete-profile");
        } else {
          navigate("/dashboard");
        }
      }
    } catch (err) {
      setError("Google sign-in failed. Try again.");
      console.error(err);
    }
    setGoogleLoading(false);
  };

  const handleKeyDown = (e) => { if (e.key === "Enter") handleLogin(); };

  return (
    <div className="auth-container">
      <div className="particles"></div>
      <div className="auth-card">
        <div className="logo-icon">{"</>"}</div>
        <h1 className="title">RankHub</h1>
        <p className="subtitle">One Dashboard For Every Coding Platform</p>

        {error && <div className="error-msg">⚠️ {error}</div>}

        <input type="email" placeholder="Email address"
          value={email} onChange={(e) => setEmail(e.target.value)}
          onKeyDown={handleKeyDown} />

        <div className="password-box">
          <input type={showPassword ? "text" : "password"}
            placeholder="Password" value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown} />
          <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        <button onClick={handleLogin} disabled={loading}>
          {loading ? "Signing in..." : "Sign In →"}
        </button>

        <div className="divider">or continue with</div>

        <div className="socials">
          <button className="social-btn" onClick={handleGoogleLogin} disabled={googleLoading}>
            <img src="https://www.google.com/favicon.ico" width="16" alt="Google" />
            {googleLoading ? "Signing in..." : "Continue with Google"}
          </button>
        </div>

        <p className="signup-text">
          Don't have an account? <Link to="/signup">Create Account</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;