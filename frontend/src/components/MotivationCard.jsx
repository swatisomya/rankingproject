function MotivationCard() {
  const accent = localStorage.getItem("accent") || "#8b5cf6";
  const quotes = [
    "Small improvements every day lead to big results.",
    "Every expert was once a beginner. Keep coding!",
    "The best time to solve a problem was yesterday. The next best time is now.",
    "Consistency beats talent when talent doesn't show up.",
    "Debug your fears. Compile your dreams.",
  ];
  const quote = quotes[new Date().getDay() % quotes.length];

  return (
    <div style={{
      background: `linear-gradient(135deg, rgba(0,212,255,0.06), ${accent}12)`,
      border: `1px solid ${accent}20`,
      borderRadius: "20px", padding: "22px", marginBottom: "20px",
      textAlign: "center"
    }}>
      <div style={{ fontSize: "24px", marginBottom: "10px" }}>💡</div>
      <p style={{ color: "#e2e8f0", fontSize: "15px", fontStyle: "italic", lineHeight: 1.6 }}>
        "{quote}"
      </p>
      <p style={{ color: "#475569", fontSize: "12px", marginTop: "10px" }}>Daily Motivation</p>
    </div>
  );
}

export default MotivationCard;