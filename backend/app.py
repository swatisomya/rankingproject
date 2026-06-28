from flask import Flask
from config import Config
from database.db import db
from flask_cors import CORS
from models.user import User
from models.profile import Profile
from routes.auth_routes import auth_bp
from routes.profile_routes import profile_bp
from routes.leaderboard_routes import leaderboard_bp

app = Flask(__name__)
CORS(app)
app.config.from_object(Config)
db.init_app(app)

app.register_blueprint(auth_bp)
app.register_blueprint(profile_bp)
app.register_blueprint(leaderboard_bp)

with app.app_context():
    db.drop_all()
    db.create_all()

@app.route("/")
def home():
    return "RankHub Backend Running"

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=10000, debug=False)