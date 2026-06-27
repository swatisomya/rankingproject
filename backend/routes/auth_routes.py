from flask import Blueprint, request, jsonify
from models.user import User
from database.db import db

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()
    existing_user = User.query.filter_by(email=data["email"]).first()
    if existing_user:
        return jsonify({"message": "Email already registered"}), 409
    user = User(
        name=data["name"],
        email=data["email"],
        password=data["password"],
        college=data.get("college", ""),
        branch=data.get("branch", ""),
        year=data.get("year", 1)
    )
    db.session.add(user)
    db.session.commit()
    return jsonify({"message": "Signup Successful", "user_id": user.id})

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data["email"]).first()
    if not user:
        return jsonify({"message": "User not found"}), 404
    if user.password != data["password"]:
        return jsonify({"message": "Wrong password"}), 401
    return jsonify({"message": "Login Successful", "user_id": user.id})

@auth_bp.route("/google-auth", methods=["POST"])
def google_auth():
    data = request.get_json()
    email = data.get("email")
    name = data.get("name")

    user = User.query.filter_by(email=email).first()

    if not user:
        user = User(
            name=name,
            email=email,
            password="google_oauth",
            college=data.get("college", ""),
            branch=data.get("branch", ""),
            year=data.get("year", 1)
        )
        db.session.add(user)
        db.session.commit()

    return jsonify({
        "message": "Google Login Successful",
        "user_id": user.id,
        "name": user.name,
        "is_new": user.college == ""
    })

@auth_bp.route("/users", methods=["GET"])
def get_users():
    users = User.query.all()
    result = []
    for user in users:
        result.append({
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "college": user.college,
            "branch": user.branch,
            "year": user.year
        })
    return jsonify(result)

@auth_bp.route("/update-profile/<int:user_id>", methods=["POST"])
def update_profile(user_id):
    data = request.get_json()
    user = User.query.get(user_id)
    if not user:
        return jsonify({"message": "User not found"}), 404
    user.college = data.get("college", user.college)
    user.branch = data.get("branch", user.branch)
    user.year = data.get("year", user.year)
    db.session.commit()
    return jsonify({"message": "Profile updated"})