# api/routes.py
from flask import Blueprint, jsonify, request
from bson.objectid import ObjectId
from db import db
from typing import Optional


todos_bp = Blueprint('todos', __name__)
todos_collection = db['todos']


@todos_bp.route('/todos/<id>', methods=['GET'])
def get_todo_by_id(id: str) -> jsonify:
    item = todos_collection.find_one({"_id": ObjectId(id)})
    if item:
        item['_id'] = str(item['_id'])
        return jsonify(item), 200
    return jsonify({"error": "ToDo not found"}), 404

@todos_bp.route('/todos', methods=['GET'])
def get_all_todo() -> jsonify:
    all_todos = []
    for item in todos_collection.find():
        item['_id'] = str(item['_id'])
        all_todos.append(item)
        print(item)
    return jsonify(all_todos), 200

@todos_bp.route('/todos', methods=['POST'])
def add_todo() -> jsonify:
    new_todo = request.json
    result = todos_collection.insert_one(new_todo)
    return jsonify({"message": "Data created", "id": str(result.inserted_id)}), 201

@todos_bp.route('/todos/<todo_id>', methods=['DELETE'])
def delete_todo(todo_id):
    result = todos_collection.delete_one({"_id": ObjectId(todo_id)})
    if result.deleted_count:
        return jsonify({"message": "Todo deleted"}), 200
    return jsonify({"error": "Todo not found"}), 404


@todos_bp.route('/todos/<id>', methods=['PUT'])
def update_todo(id: str) -> jsonify:
    update_todo = request.json
    result = todos_collection.update_one({"_id": ObjectId(id)}, {"$set": update_todo})
    if result.matched_count:
        return jsonify({"message": "Data updated"}), 200
    return jsonify({"error": "Data not found"}), 404


