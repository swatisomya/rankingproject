import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Signup() {
  const [form, setForm] = useState({ name:"", email:"", password:"", college:"", branch:"", year:"" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSignup = async () => {
    setError("");
    if (!form.name || !form.email || !form.password || !form.college || !form.branch || !form.year) {
      setError("Please fill in all fields"); return;
    }
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, year: parseInt(form.year) })
      });
      const data = await response.json();
      if (data.user_id) {
        localStorage.setItem("user_id", data.user_id);
        navigate("/dashboard");
      } else {
        setError(data.message);
      }
    } catch {
      setError("Cannot connect to server.");
    }
    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="particles"></div>
      <div className="auth-card">
        <div className="logo-icon">{"</>"}</div>
        <h1 className="title">RankHub</h1>
        <p className="subtitle">Join the competitive coding community</p>

        {error && <div className="error-msg">⚠️ {error}</div>}

        <input name="name" type="text" placeholder="Full Name" value={form.name} onChange={handleChange} />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} />

        <div className="password-box">
          <input name="password" type={showPassword ? "text" : "password"}
            placeholder="Password" value={form.password} onChange={handleChange} />
          <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        <input name="college" type="text" placeholder="College Name" value={form.college} onChange={handleChange} />

        <div style={{ display:"flex", gap:"10px" }}>
          <input name="branch" type="text" placeholder="Branch (CSE)" value={form.branch}
            onChange={handleChange} style={{ flex:1 }} />
          <input name="year" type="number" placeholder="Year" value={form.year}
            onChange={handleChange} style={{ width:"90px" }} />
        </div>

        <button onClick={handleSignup} disabled={loading} style={{ marginTop:"12px" }}>
          {loading ? "Creating Account..." : "Create Account →"}
        </button>

        <p className="signup-text">
          Already have an account? <Link to="/">Sign In</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;