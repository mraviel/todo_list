from dotenv import load_dotenv
import os 

load_dotenv()   # add .env props

class Config:

    MONGO_URI = os.getenv('MONGODB_URL')
    DATABASE_NAME = os.getenv('DATABASE_NAME')
