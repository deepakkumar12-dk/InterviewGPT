import re


def calculate_ats_score(resume_text: str):

    score = 0

    resume = resume_text.lower()

    # --------------------
    # Contact Information
    # --------------------

    if "@" in resume:
        score += 10

    if re.search(r"\+?\d{10,13}", resume):
        score += 5

    if "linkedin" in resume:
        score += 5

    # --------------------
    # Skills
    # --------------------

    skills = [
        "python",
        "java",
        "javascript",
        "react",
        "fastapi",
        "django",
        "flask",
        "sql",
        "mysql",
        "mongodb",
        "git",
        "github",
        "docker",
        "aws",
        "html",
        "css",
        "tailwind",
    ]

    found = 0

    for skill in skills:

        if skill in resume:
            found += 1

    score += min(found * 3, 30)

    # --------------------
    # Projects
    # --------------------

    if "project" in resume:
        score += 15

    # --------------------
    # Experience
    # --------------------

    if "experience" in resume:
        score += 15

    if "intern" in resume:
        score += 5

    # --------------------
    # Education
    # --------------------

    if "b.tech" in resume or "bachelor" in resume:
        score += 10

    # --------------------

    return min(score, 100)