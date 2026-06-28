from flask import Blueprint, request, jsonify
from models.user import User
from models.profile import Profile
from database.db import db
from services.leetcode_service import get_leetcode_data
from services.codeforces_service import get_codeforces_data
from services.github_service import get_github_data
from datetime import datetime

profile_bp = Blueprint("profile", __name__)

@profile_bp.route("/update-user/<int:user_id>", methods=["POST"])
def update_user(user_id):
    data = request.get_json()
    user = User.query.get(user_id)
    if not user:
        return jsonify({"message": "User not found"}), 404
    user.name = data.get("name", user.name)
    user.college = data.get("college", user.college)
    user.branch = data.get("branch", user.branch)
    user.year = data.get("year", user.year)
    db.session.commit()
    return jsonify({"message": "Profile updated successfully"})

@profile_bp.route("/verify-leetcode/<username>", methods=["GET"])
def verify_leetcode(username):
    print(f"Verifying LeetCode username: {username}")
    data = get_leetcode_data(username)
    print(f"LeetCode data: {data}")
    if data:
        return jsonify({"valid": True, "data": data})
    return jsonify({"valid": False, "error": "Username not found"}), 404

@profile_bp.route("/verify-codeforces/<username>", methods=["GET"])
def verify_codeforces(username):
    from services.codeforces_service import get_codeforces_data
    data = get_codeforces_data(username)
    if data:
        return jsonify({"valid": True, "data": data})
    return jsonify({"valid": False, "error": "Username not found"}), 404

@profile_bp.route("/link-profile", methods=["POST"])
def link_profile():
    data = request.get_json()
    user_id = data["user_id"]
    
    profile = Profile.query.filter_by(user_id=user_id).first()
    if not profile:
        profile = Profile(user_id=user_id)
        db.session.add(profile)

    results = {}

    if data.get("leetcode_username"):
        username = data["leetcode_username"].strip()
        print(f"Linking LeetCode: {username}")
        lc = get_leetcode_data(username)
        print(f"LeetCode result: {lc}")
        if lc:
            profile.leetcode_username = username
            profile.leetcode_verified = True
            profile.leetcode_total = lc.get("totalSolved", 0)
            profile.leetcode_easy = lc.get("easySolved", 0)
            profile.leetcode_medium = lc.get("mediumSolved", 0)
            profile.leetcode_hard = lc.get("hardSolved", 0)
            profile.leetcode_ranking = lc.get("ranking", 0)
            profile.leetcode_streak = lc.get("streak", 0)
            results["leetcode"] = "connected"
        else:
            results["leetcode"] = "invalid"
    elif data.get("keep_leetcode") and profile.leetcode_username:
        results["leetcode"] = "connected"

    if data.get("codeforces_username"):
        username = data["codeforces_username"].strip()
        cf = get_codeforces_data(username)
        if cf:
            profile.codeforces_username = username
            profile.codeforces_verified = True
            profile.cf_rating = cf.get("rating", 0)
            profile.cf_max_rating = cf.get("maxRating", 0)
            profile.cf_rank = cf.get("rank", "")
            profile.cf_max_rank = cf.get("maxRank", "")
            profile.cf_contribution = cf.get("contribution", 0)
            results["codeforces"] = "connected"
        else:
            results["codeforces"] = "invalid"
    elif data.get("keep_codeforces") and profile.codeforces_username:
        results["codeforces"] = "connected"

    if data.get("github_username"):
        username = data["github_username"].strip()
        gh = get_github_data(username)
        if gh:
            profile.github_username = username
            profile.github_verified = True
            results["github"] = "connected"
        else:
            results["github"] = "invalid"
    elif data.get("keep_github") and profile.github_username:
        results["github"] = "connected"

    profile.last_synced = datetime.utcnow()
    db.session.commit()
    return jsonify({"message": "Profiles updated", "results": results})

@profile_bp.route("/dashboard/<int:user_id>", methods=["GET"])
def dashboard(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"message": "User not found"}), 404
    profile = Profile.query.filter_by(user_id=user_id).first()

    return jsonify({
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "college": user.college,
            "branch": user.branch,
            "year": user.year
        },
        "profile": {
            "leetcode_username": profile.leetcode_username if profile else None,
            "codeforces_username": profile.codeforces_username if profile else None,
            "github_username": profile.github_username if profile else None,
            "leetcode_verified": profile.leetcode_verified if profile else False,
            "codeforces_verified": profile.codeforces_verified if profile else False,
            "github_verified": profile.github_verified if profile else False,
            "leetcode_total": profile.leetcode_total if profile else 0,
            "leetcode_easy": profile.leetcode_easy if profile else 0,
            "leetcode_medium": profile.leetcode_medium if profile else 0,
            "leetcode_hard": profile.leetcode_hard if profile else 0,
            "leetcode_ranking": profile.leetcode_ranking if profile else 0,
            "leetcode_streak": profile.leetcode_streak if profile else 0,
            "cf_rating": profile.cf_rating if profile else 0,
            "cf_max_rating": profile.cf_max_rating if profile else 0,
            "cf_rank": profile.cf_rank if profile else "",
            "cf_max_rank": profile.cf_max_rank if profile else "",
            "cf_contribution": profile.cf_contribution if profile else 0,
            "last_synced": profile.last_synced.isoformat() if profile and profile.last_synced else None
        } if profile else None
    })