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

def evaluate_interview(questions, answers):

    qa = ""

    for i, q in enumerate(questions):

        ans = answers.get(str(i), answers.get(i, "")).strip()

        if ans == "":
            ans = "No Answer Provided"

        qa += f"""

Question {i+1}
{q}

Candidate Answer
{ans}

"""

    prompt = f"""
You are an experienced Senior Technical Interviewer working at Google, Microsoft and Amazon.

Evaluate the interview fairly and professionally.

Do NOT be overly strict.

Scoring Guidelines:

- Excellent answer = 90-100
- Good answer = 75-89
- Average answer = 60-74
- Weak answer = 40-59
- Wrong or irrelevant answer = 20-39
- No answer = 0-15

Evaluation Rules:

1. Reward logical thinking.
2. Reward practical examples.
3. Reward confidence.
4. Do not reduce marks for small grammar mistakes.
5. If the answer is mostly correct, give a high score.
6. If the answer is empty, give a very low score.
7. Evaluate each question independently before calculating the final score.
8. Be encouraging but honest.

Return ONLY valid JSON.

{{
    "overall_score":0,
    "technical_score":0,
    "communication_score":0,
    "confidence_score":0,
    "grammar_score":0,
    "strengths":[
        ""
    ],
    "weaknesses":[
        ""
    ],
    "suggestions":[
        ""
    ],
    "recruiter_feedback":""
}}

Interview Questions and Answers:

{qa}
"""

    response = ask_groq(prompt)

    cleaned = clean_response(response)

    result = parse_json(cleaned)

    result.setdefault("overall_score", 0)
    result.setdefault("technical_score", 0)
    result.setdefault("communication_score", 0)
    result.setdefault("confidence_score", 0)
    result.setdefault("grammar_score", 0)
    result.setdefault("strengths", [])
    result.setdefault("weaknesses", [])
    result.setdefault("suggestions", [])
    result.setdefault("recruiter_feedback", "")

    return result