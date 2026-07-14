import os
import shutil
from services.interview_service import evaluate_interview
from services.followup_service import generate_followup


from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from services.gemini_service import analyze_resume
from resume_parser import extract_text_from_pdf




app = FastAPI(title="InterviewGPT API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_FOLDER = "uploads"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@app.get("/")
def home():
    return {
        "status": "success",
        "message": "InterviewGPT Backend Running 🚀"
    }


@app.post("/upload-resume")
async def upload_resume(file: UploadFile = File(...)):

    if not file.filename.lower().endswith(".pdf"):
        return {
            "success": False,
            "message": "Only PDF files are allowed."
        }

    file_path = os.path.join(UPLOAD_FOLDER, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    resume_text = extract_text_from_pdf(file_path)

    analysis = analyze_resume(resume_text)

    return {
        "success": True,
        "filename": file.filename,
        "analysis": analysis
    }
from pydantic import BaseModel


class InterviewRequest(BaseModel):
    questions: list
    answers: dict

class FollowupRequest(BaseModel):
    question: str
    answer: str    


@app.post("/evaluate-interview")
async def evaluate(req: InterviewRequest):

    result = evaluate_interview(
        req.questions,
        req.answers,
    )

    return {
        "success": True,
        "result": result,
    }

@app.post("/generate-followup")
async def generate_followup_question(req: FollowupRequest):

    result = generate_followup(
        req.question,
        req.answer,
    )

    return {
        "success": True,
        "result": result,
    }