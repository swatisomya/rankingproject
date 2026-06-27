import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function CompleteProfile() {
  const [form, setForm] = useState({ college:"", branch:"", year:"" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const user_id = localStorage.getItem("user_id");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    if (!form.college || !form.branch || !form.year) {
      alert("Please fill all fields"); return;
    }
    setLoading(true);
    try {
      await fetch(`https://rankingproject.onrender.com/update-profile/${user_id}`,  {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, year: parseInt(form.year) })
      });
      navigate("/dashboard");
    } catch {
      alert("Error saving profile");
    }
    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="particles"></div>
      <div className="auth-card">
        <div className="logo-icon">{"</>"}</div>
        <h1 className="title" style={{ fontSize:"32px" }}>One Last Step</h1>
        <p className="subtitle">Complete your profile to join the leaderboard</p>

        <input name="college" type="text" placeholder="College Name"
          value={form.college} onChange={handleChange} />
        <div style={{ display:"flex", gap:"10px" }}>
          <input name="branch" type="text" placeholder="Branch (CSE)"
            value={form.branch} onChange={handleChange} style={{ flex:1 }} />
          <input name="year" type="number" placeholder="Year"
            value={form.year} onChange={handleChange} style={{ width:"90px" }} />
        </div>

        <button onClick={handleSubmit} disabled={loading} style={{ marginTop:"12px" }}>
          {loading ? "Saving..." : "Go to Dashboard →"}
        </button>
      </div>
    </div>
  );
}

export default CompleteProfile;