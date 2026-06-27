from flask import Blueprint, jsonify
from models.user import User
from models.profile import Profile
from services.leetcode_service import get_leetcode_data
from services.codeforces_service import get_codeforces_data
from services.score_service import calculate_score

leaderboard_bp = Blueprint("leaderboard", __name__)

@leaderboard_bp.route("/leaderboard", methods=["GET"])
def leaderboard():
    profiles = Profile.query.all()
    result = []

    for profile in profiles:
        user = User.query.get(profile.user_id)
        if not user:
            continue

        leetcode_data = get_leetcode_data(profile.leetcode_username) if profile.leetcode_username else None
        codeforces_data = get_codeforces_data(profile.codeforces_username) if profile.codeforces_username else None
        score = calculate_score(leetcode_data, codeforces_data)

        result.append({
            "user_id": user.id,
            "name": user.name,
            "college": user.college,
            "branch": user.branch,
            "year": user.year,
            "leetcode": leetcode_data,
            "codeforces": codeforces_data,
            "score": score
        })

    result.sort(key=lambda x: x["score"], reverse=True)
    for i, entry in enumerate(result):
        entry["rank"] = i + 1

    return jsonify(result)