from database.db import db

class Profile(db.Model):

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.Integer)

    leetcode_username = db.Column(db.String(100))

    codeforces_username = db.Column(db.String(100))

    github_username = db.Column(db.String(100))