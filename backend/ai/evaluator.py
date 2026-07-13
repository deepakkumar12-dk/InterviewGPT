"""
InterviewGPT Evaluation Engine
Version: 2.0
"""

from ai.scoring import (
    calculate_overall_score,
    get_grade,
    get_shortlisting_probability,
)


def evaluate_resume(ai_response):
    """
    Build the final InterviewGPT response.
    """

    category_scores = ai_response.get("category_scores", {})

    overall_score = calculate_overall_score(category_scores)

    result = {
        "candidate_name": ai_response.get("name", ""),
        "detected_role": ai_response.get("detected_role", ""),
        "experience_level": ai_response.get("experience_level", ""),

        "overall_score": overall_score,

        "grade": get_grade(overall_score),

        "shortlisting_probability":
            get_shortlisting_probability(overall_score),

        "category_scores": category_scores,

        "strengths":
            ai_response.get("strengths", []),

        "weaknesses":
            ai_response.get("weaknesses", []),

        "suggestions":
            ai_response.get("suggestions", []),

        "missing_keywords":
            ai_response.get("missing_keywords", []),

        "resume_summary":
            ai_response.get("resume_summary", ""),

        "recruiter_feedback":
            ai_response.get("recruiter_feedback", ""),

        "interview_questions":
            ai_response.get("interview_questions", {}),
    }

    return result