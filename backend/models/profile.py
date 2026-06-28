from database.db import db
from datetime import datetime

class Profile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)

    leetcode_username = db.Column(db.String(100))
    codeforces_username = db.Column(db.String(100))
    github_username = db.Column(db.String(100))

    leetcode_verified = db.Column(db.Boolean, default=False)
    codeforces_verified = db.Column(db.Boolean, default=False)
    github_verified = db.Column(db.Boolean, default=False)

    leetcode_total = db.Column(db.Integer, default=0)
    leetcode_easy = db.Column(db.Integer, default=0)
    leetcode_medium = db.Column(db.Integer, default=0)
    leetcode_hard = db.Column(db.Integer, default=0)
    leetcode_ranking = db.Column(db.Integer, default=0)
    leetcode_streak = db.Column(db.Integer, default=0)

    cf_rating = db.Column(db.Integer, default=0)
    cf_max_rating = db.Column(db.Integer, default=0)
    cf_rank = db.Column(db.String(50))
    cf_max_rank = db.Column(db.String(50))
    cf_contribution = db.Column(db.Integer, default=0)

    last_synced = db.Column(db.DateTime, default=datetime.utcnow)