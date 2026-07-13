import json
import re



from services.groq_service import ask_groq
from services.prompt_builder import build_resume_prompt
from ai.scoring import calculate_ats_score



def clean_response(text: str):

    text = text.strip()

    if text.startswith("```"):
        text = text.replace("```json", "")
        text = text.replace("```", "")
        text = text.strip()

    text = re.sub(r",\s*([\]}])", r"\1", text)

    return text


def parse_json(text: str):

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


def analyze_resume(resume_text):

    prompt = build_resume_prompt(resume_text)

    response = ask_groq(prompt)

    cleaned = clean_response(response)

    analysis = parse_json(cleaned)

    analysis.setdefault("candidate_name", "")
    analysis.setdefault("detected_role", "")
    analysis.setdefault("resume_summary", "")
    analysis.setdefault("skills", [])
    analysis.setdefault("missing_keywords", [])
    analysis.setdefault("strengths", [])
    analysis.setdefault("weaknesses", [])
    analysis.setdefault("suggestions", [])
    analysis.setdefault("recruiter_feedback", "")
    analysis.setdefault("interview_questions", [])

    filtered = []

    for w in analysis["weaknesses"]:

        if "future" in w.lower() and "date" in w.lower():
            continue

        filtered.append(w)

    analysis["weaknesses"] = filtered

    analysis["ats_score"] = calculate_ats_score(resume_text)

    return analysis