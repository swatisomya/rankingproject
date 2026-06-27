const BASE_URL = "https://rankingproject.onrender.com";

export const loginUser = async (email, password) => {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });
  return res.json();
};

export const signupUser = async (userData) => {
  const res = await fetch(`${BASE_URL}/signup`, {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData)
  });
  return res.json();
};

export const getDashboard = async (user_id) => {
  const res = await fetch(`${BASE_URL}/dashboard/${user_id}`);
  return res.json();
};

export const linkProfile = async (profileData) => {
  const res = await fetch(`${BASE_URL}/link-profile`, {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify(profileData)
  });
  return res.json();
};

export const getLeaderboard = async () => {
  const res = await fetch(`${BASE_URL}/leaderboard`);
  return res.json();
};

export const updateUserProfile = async (user_id, data) => {
  const res = await fetch(`${BASE_URL}/update-profile/${user_id}`, {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
};