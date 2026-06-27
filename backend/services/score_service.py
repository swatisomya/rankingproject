def calculate_score(leetcode_data, codeforces_data):
    score = 0
    if leetcode_data:
        score += leetcode_data.get("easySolved", 0) * 10
        score += leetcode_data.get("mediumSolved", 0) * 25
        score += leetcode_data.get("hardSolved", 0) * 50
    if codeforces_data:
        score += codeforces_data.get("rating", 0) * 0.5
    return round(score)