import requests

def get_leetcode_data(username):
    try:
        url = f"https://leetcode-stats-api.herokuapp.com/{username}"
        response = requests.get(url, timeout=10)
        if response.status_code == 200:
            data = response.json()
            if data.get("status") != "error":
                return {
                    "totalSolved": data.get("totalSolved", 0),
                    "easySolved": data.get("easySolved", 0),
                    "mediumSolved": data.get("mediumSolved", 0),
                    "hardSolved": data.get("hardSolved", 0),
                    "ranking": data.get("ranking", 0),
                    "streak": data.get("streak", 0),
                    "totalQuestions": data.get("totalQuestions", 0)
                }
    except:
        pass
    return None