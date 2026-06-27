import requests

def get_codeforces_data(username):
    try:
        url = f"https://codeforces.com/api/user.info?handles={username}"
        response = requests.get(url, timeout=10)
        if response.status_code == 200:
            data = response.json()
            if data["status"] == "OK":
                user = data["result"][0]
                return {
                    "rating": user.get("rating", 0),
                    "rank": user.get("rank", "unrated"),
                    "maxRating": user.get("maxRating", 0),
                    "maxRank": user.get("maxRank", "unrated"),
                    "contribution": user.get("contribution", 0)
                }
    except:
        pass
    return None