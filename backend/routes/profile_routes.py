from flask import Blueprint, request, jsonify
from models.user import User
from models.profile import Profile
from database.db import db
from services.github_service import get_github_data

profile_bp = Blueprint("profile", __name__)

@profile_bp.route("/link-profile", methods=["POST"])
def link_profile():
    data = request.get_json()
    existing = Profile.query.filter_by(user_id=data["user_id"]).first()
    if existing:
        existing.leetcode_username = data.get("leetcode_username", existing.leetcode_username)
        existing.codeforces_username = data.get("codeforces_username", existing.codeforces_username)
        existing.github_username = data.get("github_username", existing.github_username)
        db.session.commit()
        return jsonify({"message": "Profile Updated Successfully"})
    profile = Profile(
        user_id=data["user_id"],
        leetcode_username=data.get("leetcode_username"),
        codeforces_username=data.get("codeforces_username"),
        github_username=data.get("github_username")
    )
    db.session.add(profile)
    db.session.commit()
    return jsonify({"message": "Profile Linked Successfully"})

@profile_bp.route("/dashboard/<int:user_id>", methods=["GET"])
def dashboard(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"message": "User not found"}), 404
    profile = Profile.query.filter_by(user_id=user_id).first()
    github_data = {}
    if profile and profile.github_username:
        github_data = get_github_data(profile.github_username) or {}
    return jsonify({
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "college": user.college,
            "branch": user.branch,
            "year": user.year
        },
        "github": github_data,
        "profile": {
            "leetcode_username": profile.leetcode_username if profile else None,
            "codeforces_username": profile.codeforces_username if profile else None,
            "github_username": profile.github_username if profile else None
        } if profile else None
    })