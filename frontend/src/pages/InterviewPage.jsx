import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import VoiceRecorder from "../components/Interview/VoiceRecorder";
import { useResume } from "../context/ResumeContext";
import api from "../services/api";

function InterviewPage() {
  const { analysis } = useResume();
  const navigate = useNavigate();

  const questions = analysis?.interview_questions || [];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState("");
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    if (questions.length > 0) {
      setAnswer(answers[currentQuestion] || "");
    }
  }, [currentQuestion]);

  if (!analysis) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <h1 className="text-3xl font-bold">
          Please analyze your resume first.
        </h1>
      </div>
    );
  }

  const nextQuestion = () => {
    if (!answer.trim()) {
      alert("Please answer this question first.");
      return;
    }

    const updatedAnswers = {
      ...answers,
      [currentQuestion]: answer,
    };

    setAnswers(updatedAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const previousQuestion = () => {
    const updatedAnswers = {
      ...answers,
      [currentQuestion]: answer,
    };

    setAnswers(updatedAnswers);

    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const finishInterview = async () => {
    if (!answer.trim()) {
      alert("Please answer the last question.");
      return;
    }

    const finalAnswers = {
      ...answers,
      [currentQuestion]: answer,
    };

    const unanswered = questions.some((_, index) => {
      return (
        !finalAnswers[index] ||
        finalAnswers[index].trim() === ""
      );
    });

    if (unanswered) {
      alert("Please answer all interview questions.");
      return;
    }

    try {
      const { data } = await api.post("/evaluate-interview", {
        questions,
        answers: finalAnswers,
      });

      if (data.success) {
        localStorage.setItem(
          "interviewResult",
          JSON.stringify(data.result)
        );

        navigate("/result");
      } else {
        alert("Interview evaluation failed.");
      }
    } catch (error) {
      console.error("Interview Error:", error);

      if (error.response) {
        console.log("Backend Response:", error.response.data);
      }

      alert("Server Error");
    }
  };

  const progress =
    questions.length === 0
      ? 0
      : ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">

      <h1 className="text-4xl font-bold">
        AI Mock Interview
      </h1>

      <div className="mt-8 h-3 overflow-hidden rounded-full bg-slate-800">
        <div
          className="h-full bg-violet-600 duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="mt-4 text-slate-400">
        Question {currentQuestion + 1} of {questions.length}
      </p>

      <div className="mt-10 rounded-3xl bg-slate-900 p-8">

        <h2 className="text-2xl font-semibold leading-10">
          {questions[currentQuestion]}
        </h2>

        <VoiceRecorder
          answer={answer}
          setAnswer={setAnswer}
        />

        <div className="mt-10 flex justify-between">

          <button
            onClick={previousQuestion}
            disabled={currentQuestion === 0}
            className="rounded-xl bg-slate-700 px-8 py-3 disabled:opacity-40"
          >
            Previous
          </button>

          {currentQuestion === questions.length - 1 ? (
            <button
              onClick={finishInterview}
              className="rounded-xl bg-green-600 px-8 py-3 font-bold hover:bg-green-700"
            >
              Finish Interview
            </button>
          ) : (
            <button
              onClick={nextQuestion}
              className="rounded-xl bg-violet-600 px-8 py-3 font-bold hover:bg-violet-700"
            >
              Next
            </button>
          )}

        </div>

      </div>

    </div>
  );
}

export default InterviewPage;