# app.py
from flask import Flask
from api import register_blueprints

app = Flask(__name__)
register_blueprints(app)

if __name__ == '__main__':
    app.run(debug=True)