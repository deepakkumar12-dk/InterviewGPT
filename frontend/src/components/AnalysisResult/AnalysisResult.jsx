import {
  FaCheckCircle,
  FaTimesCircle,
  FaLightbulb,
  FaQuestionCircle,
  FaUserTie,
  FaCode,
  FaSearch,
} from "react-icons/fa";

function AnalysisResult({ analysis }) {
  if (!analysis) return null;

  return (
    <div className="mt-10 space-y-8">

      {/* Candidate */}

      <div className="rounded-3xl border border-white/10 bg-slate-900 p-8">

        <h2 className="text-3xl font-bold text-violet-400">
          {analysis.candidate_name || "Candidate"}
        </h2>

        <p className="mt-2 text-lg text-slate-400">
          {analysis.detected_role}
        </p>

        <p className="mt-6 leading-8 text-slate-300">
          {analysis.resume_summary}
        </p>

      </div>

      {/* ATS */}

      <div className="rounded-3xl bg-gradient-to-r from-violet-600 to-blue-600 p-8 text-center">

        <h2 className="text-2xl font-bold">
          ATS SCORE
        </h2>

        <h1 className="mt-4 text-7xl font-bold">
          {analysis.ats_score}/100
        </h1>

      </div>

      {/* Skills */}

      <div className="rounded-3xl border border-white/10 bg-slate-900 p-8">

        <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold text-cyan-400">
          <FaCode />
          Skills Found
        </h2>

        <div className="flex flex-wrap gap-3">

          {analysis.skills?.map((skill, index) => (

            <span
              key={index}
              className="rounded-full bg-cyan-500/20 px-4 py-2 text-cyan-300"
            >
              {skill}
            </span>

          ))}

        </div>

      </div>

      {/* Missing Keywords */}

      <div className="rounded-3xl border border-white/10 bg-slate-900 p-8">

        <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold text-red-400">
          <FaSearch />
          Missing Keywords
        </h2>

        <div className="flex flex-wrap gap-3">

          {analysis.missing_keywords?.map((item, index) => (

            <span
              key={index}
              className="rounded-full bg-red-500/20 px-4 py-2 text-red-300"
            >
              {item}
            </span>

          ))}

        </div>

      </div>

      {/* Recruiter */}

      <div className="rounded-3xl border border-white/10 bg-slate-900 p-8">

        <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold text-yellow-400">
          <FaUserTie />
          Recruiter Feedback
        </h2>

        <p className="leading-8 text-slate-300">
          {analysis.recruiter_feedback}
        </p>

      </div>

      {/* Grid */}

      <div className="grid gap-8 lg:grid-cols-2">

        <div className="rounded-3xl bg-slate-900 p-8">

          <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-green-400">
            <FaCheckCircle />
            Strengths
          </h2>

          <ul className="space-y-3">

            {analysis.strengths?.map((item, index) => (
              <li key={index}>✔ {item}</li>
            ))}

          </ul>

        </div>

        <div className="rounded-3xl bg-slate-900 p-8">

          <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-red-400">
            <FaTimesCircle />
            Weaknesses
          </h2>

          <ul className="space-y-3">

            {analysis.weaknesses?.map((item, index) => (
              <li key={index}>✖ {item}</li>
            ))}

          </ul>

        </div>

        <div className="rounded-3xl bg-slate-900 p-8">

          <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-yellow-400">
            <FaLightbulb />
            Suggestions
          </h2>

          <ul className="space-y-3">

            {analysis.suggestions?.map((item, index) => (
              <li key={index}>💡 {item}</li>
            ))}

          </ul>

        </div>

        <div className="rounded-3xl bg-slate-900 p-8">

          <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold text-blue-400">
            <FaQuestionCircle />
            Interview Questions
          </h2>

          <ol className="list-decimal list-inside space-y-3">

            {analysis.interview_questions?.map((item, index) => (
              <li key={index}>{item}</li>
            ))}

          </ol>

        </div>

            </div>

      <div className="flex justify-center pt-6">

        <button
          onClick={() => {
            localStorage.setItem(
              "interviewQuestions",
              JSON.stringify(analysis.interview_questions || [])
            );

            localStorage.setItem(
              "resumeAnalysis",
              JSON.stringify(analysis)
            );

            window.location.href = "/interview";
          }}
          className="rounded-xl bg-violet-600 px-10 py-4 text-lg font-bold hover:bg-violet-700"
        >
          🚀 Start AI Interview
        </button>

      </div>

    </div>
  );
}

export default AnalysisResult;