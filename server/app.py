# app.py
from flask import Flask
from api import register_blueprints
from flask_cors import CORS  # Import CORS


app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
register_blueprints(app)

if __name__ == '__main__':
    app.run(debug=True)