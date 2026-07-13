import os
import json
from google import genai

from config import GEMINI_API_KEY

client = genai.Client(api_key=GEMINI_API_KEY)

MODEL = "gemini-2.5-flash"
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise ValueError("GEMINI_API_KEY not found in .env file")

genai.configure(api_key=api_key)

model = genai.GenerativeModel("gemini-2.5-flash")


def analyze_resume(resume_text):
    prompt = f"""
You are an expert ATS Resume Analyzer.

Analyze the following resume.

Return ONLY valid JSON.

Format:

{{
    "ats_score": 0,
    "strengths": [],
    "weaknesses": [],
    "suggestions": [],
    "interview_questions": []
}}

Resume:

{resume_text}
"""

    response = model.generate_content(prompt)

    text = response.text.strip()

    if text.startswith("```"):
        text = (
            text.replace("```json", "")
            .replace("```", "")
            .strip()
        )

    return json.loads(text)