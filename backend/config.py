import os
from dotenv import load_dotenv

load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

UPLOAD_FOLDER = "uploads"

MAX_FILE_SIZE = 5 * 1024 * 1024