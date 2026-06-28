from flask import Blueprint, jsonify
from models.user import User
from models.profile import Profile
from services.leetcode_service import get_leetcode_data
from services.codeforces_service import get_codeforces_data
from services.score_service import calculate_score

leaderboard_bp = Blueprint("leaderboard", __name__)

@leaderboard_bp.route("/leaderboard", methods=["GET"])
def leaderboard():
    users = User.query.all()
    result = []

    for user in users:
        profile = Profile.query.filter_by(user_id=user.id).first()

        leetcode_data = None
        codeforces_data = None

        if profile:
            if profile.leetcode_verified and profile.leetcode_total:
                leetcode_data = {
                    "totalSolved": profile.leetcode_total,
                    "easySolved": profile.leetcode_easy,
                    "mediumSolved": profile.leetcode_medium,
                    "hardSolved": profile.leetcode_hard,
                    "ranking": profile.leetcode_ranking,
                    "streak": profile.leetcode_streak
                }
            if profile.codeforces_verified and profile.cf_rating:
                codeforces_data = {
                    "rating": profile.cf_rating,
                    "maxRating": profile.cf_max_rating,
                    "rank": profile.cf_rank,
                    "maxRank": profile.cf_max_rank
                }

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