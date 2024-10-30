# api/__init__.py
from flask import Blueprint
from .todo_routes import todos_bp
from .users_routes import users_bp

def register_blueprints(app):
    app.register_blueprint(todos_bp, url_prefix='/api')
    app.register_blueprint(users_bp, url_prefix='/api')