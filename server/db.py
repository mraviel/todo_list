# db.py
from pymongo import MongoClient
from config import Config

db_client = MongoClient(Config.MONGO_URI)
db = db_client[Config.DATABASE_NAME]
