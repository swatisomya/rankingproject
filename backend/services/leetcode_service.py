import requests

def get_leetcode_data(username):
    if not username or not username.strip():
        return None
    
    username = username.strip()
    
    # Try GraphQL API first
    try:
        url = "https://leetcode.com/graphql"
        query = """
        query getUserProfile($username: String!) {
            matchedUser(username: $username) {
                username
                submitStats: submitStatsGlobal {
                    acSubmissionNum {
                        difficulty
                        count
                    }
                }
                profile {
                    ranking
                }
            }
        }
        """
        headers = {
            "Content-Type": "application/json",
            "Referer": "https://leetcode.com",
            "User-Agent": "Mozilla/5.0"
        }
        response = requests.post(
            url,
            json={"query": query, "variables": {"username": username}},
            headers=headers,
            timeout=15
        )
        
        if response.status_code == 200:
            data = response.json()
            user = data.get("data", {}).get("matchedUser")
            if user:
                stats = user.get("submitStats", {}).get("acSubmissionNum", [])
                total = next((s["count"] for s in stats if s["difficulty"] == "All"), 0)
                easy = next((s["count"] for s in stats if s["difficulty"] == "Easy"), 0)
                medium = next((s["count"] for s in stats if s["difficulty"] == "Medium"), 0)
                hard = next((s["count"] for s in stats if s["difficulty"] == "Hard"), 0)
                ranking = user.get("profile", {}).get("ranking", 0)
                return {
                    "totalSolved": total,
                    "easySolved": easy,
                    "mediumSolved": medium,
                    "hardSolved": hard,
                    "ranking": ranking,
                    "streak": 0
                }
    except Exception as e:
        print(f"LeetCode GraphQL error: {e}")

    # Fallback to stats API
    try:
        url = f"https://leetcode-stats-api.herokuapp.com/{username}"
        response = requests.get(url, timeout=15)
        if response.status_code == 200:
            data = response.json()
            if data.get("status") != "error":
                return {
                    "totalSolved": data.get("totalSolved", 0),
                    "easySolved": data.get("easySolved", 0),
                    "mediumSolved": data.get("mediumSolved", 0),
                    "hardSolved": data.get("hardSolved", 0),
                    "ranking": data.get("ranking", 0),
                    "streak": data.get("streak", 0)
                }
    except Exception as e:
        print(f"LeetCode stats API error: {e}")

    # Fallback 2
    try:
        url = f"https://alfa-leetcode-api.onrender.com/{username}"
        response = requests.get(url, timeout=15)
        if response.status_code == 200:
            data = response.json()
            if not data.get("errors"):
                return {
                    "totalSolved": data.get("totalSolved", 0),
                    "easySolved": data.get("easySolved", 0),
                    "mediumSolved": data.get("mediumSolved", 0),
                    "hardSolved": data.get("hardSolved", 0),
                    "ranking": data.get("ranking", 0),
                    "streak": data.get("streak", 0)
                }
    except Exception as e:
        print(f"LeetCode fallback API error: {e}")

    return None