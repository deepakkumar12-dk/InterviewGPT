"""
InterviewGPT Recruiter Review Engine
Version: 2.0
"""


def build_recruiter_review(ai_response):
    """
    Build a recruiter-style review based on the AI analysis.
    """

    strengths = ai_response.get("strengths", [])
    weaknesses = ai_response.get("weaknesses", [])
    overall_score = ai_response.get("overall_score", 0)

    review = []

    review.append(
        "Your resume is professionally structured and has good potential."
    )

    if overall_score >= 85:
        review.append(
            "This resume is likely to perform well in ATS screening."
        )

    elif overall_score >= 70:
        review.append(
            "This resume has a good foundation but still needs improvements before applying to top companies."
        )

    else:
        review.append(
            "This resume requires significant improvements before it becomes competitive."
        )

    if strengths:
        review.append(
            f"Biggest strength: {strengths[0]}"
        )

    if weaknesses:
        review.append(
            f"Highest priority improvement: {weaknesses[0]}"
        )

    review.append(
        "Focus on measurable achievements, ATS keywords, and project impact to improve your chances of getting shortlisted."
    )

    return " ".join(review)