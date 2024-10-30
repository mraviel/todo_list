# api/users_routes.py
from flask import Blueprint, jsonify, request
from bson.objectid import ObjectId
from db import db

users_bp = Blueprint('users', __name__)
users_collection = db['users']

@users_bp.route('/users/<id>', methods=['GET'])
def get_todo_by_id(id: str) -> jsonify:
    item = users_collection.find_one({"_id": ObjectId(id)})
    if item:
        item['_id'] = str(item['_id'])
        return jsonify(item), 200
    return jsonify({"error": "ToDo not found"}), 404

@users_bp.route('/users', methods=['GET'])
def get_all_todo() -> jsonify:
    all_todos = []
    for item in users_collection.find():
        item['_id'] = str(item['_id'])
        all_todos.append(item)
        print(item)
    return jsonify(all_todos), 200

@users_bp.route('/users', methods=['POST'])
def add_todo() -> jsonify:
    new_todo = request.json
    result = users_collection.insert_one(new_todo)
    return jsonify({"message": "Data created", "id": str(result.inserted_id)}), 201

@users_bp.route('/users/<user_id>', methods=['DELETE'])
def delete_user(user_id):
    result = users_collection.delete_one({"_id": ObjectId(user_id)})
    if result.deleted_count:
        return jsonify({"message": "User deleted"}), 200
    return jsonify({"error": "User not found"}), 404

@users_bp.route('/users/<id>', methods=['PUT'])
def update_todo(id: str) -> jsonify:
    update_todo = request.json
    result = users_collection.update_one({"_id": ObjectId(id)}, {"$set": update_todo})
    if result.matched_count:
        return jsonify({"message": "Data updated"}), 200
    return jsonify({"error": "Data not found"}), 404


