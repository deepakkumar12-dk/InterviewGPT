import json
import re

from services.groq_service import ask_groq

def clean_response(text):
    text = text.strip()

    if text.startswith("```"):
        text = text.replace("```json", "")
        text = text.replace("```", "")
        text = text.strip()

    text = re.sub(r",\s*([\]}])", r"\1", text)

    return text


def parse_json(text):
    try:
        return json.loads(text)
    except Exception:
        fix_prompt = f"""
You are a JSON formatter.

Return ONLY valid JSON.

Fix this JSON:

{text}
"""
        fixed = ask_groq(fix_prompt)
        fixed = clean_response(fixed)
        return json.loads(fixed)


def generate_followup(question, answer):
    prompt = f"""
You are a Senior Technical Interviewer.

Question:
{question}

Candidate Answer:
{answer}

Generate ONE follow-up interview question.

Return ONLY JSON.

{{
    "followup_question":""
}}
"""

    response = ask_groq(prompt)

    cleaned = clean_response(response)

    return parse_json(cleaned)