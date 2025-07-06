from flask import Flask
from flask_cors import CORS
from config import Config
from models import db
from routes import api

app = Flask(__name__)
app.config.from_object(Config)
CORS(app)

db.init_app(app)
app.register_blueprint(api)

@app.route('/')
def index():
    return {"message": "Job Board API is running"}

if __name__ == '__main__':
    app.run(debug=True)
