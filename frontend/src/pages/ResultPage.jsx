import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateReport } from "../utils/generateReport";

function ResultPage() {
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem("interviewResult");

    if (data) {
      setResult(JSON.parse(data));
    }
  }, []);

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <h1 className="text-3xl font-bold">No Interview Result Found</h1>
      </div>
    );
  }

  const ScoreCard = ({ title, value, color }) => (
    <div className="bg-slate-800 rounded-2xl p-6 shadow-lg">
      <h3 className="text-gray-400 text-lg">{title}</h3>

      <p className={`text-4xl font-bold mt-3 ${color}`}>
        {value}/100
      </p>

      <div className="w-full h-3 bg-slate-700 rounded-full mt-5 overflow-hidden">
        <div
          className={`h-full ${color.replace("text", "bg")}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white p-8">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl font-bold text-center">
          AI Interview Report
        </h1>

        <p className="text-center text-gray-400 mt-3">
          Detailed analysis of your interview performance
        </p>

        <div className="mt-10 bg-slate-900 rounded-3xl p-10 shadow-xl">

          <div className="flex flex-col items-center">

            <div className="w-48 h-48 rounded-full border-[10px] border-violet-500 flex items-center justify-center">

              <div className="text-center">

                <h2 className="text-6xl font-bold text-green-400">
                  {result.overall_score}
                </h2>

                <p className="text-gray-400 mt-2">
                  Overall Score
                </p>

              </div>

            </div>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">

            <ScoreCard
              title="Technical"
              value={result.technical_score}
              color="text-blue-400"
            />

            <ScoreCard
              title="Communication"
              value={result.communication_score}
              color="text-green-400"
            />

            <ScoreCard
              title="Confidence"
              value={result.confidence_score}
              color="text-yellow-400"
            />

            <ScoreCard
              title="Grammar"
              value={result.grammar_score}
              color="text-pink-400"
            />

          </div>

          <div className="grid lg:grid-cols-2 gap-8 mt-12">

            <div className="bg-slate-800 rounded-2xl p-6">

              <h2 className="text-2xl font-bold text-green-400 mb-5">
                💪 Strengths
              </h2>

              <ul className="space-y-3">

                {result.strengths?.map((item, index) => (
                  <li key={index}>
                    ✅ {item}
                  </li>
                ))}

              </ul>

            </div>

            <div className="bg-slate-800 rounded-2xl p-6">

              <h2 className="text-2xl font-bold text-red-400 mb-5">
                ⚠ Weaknesses
              </h2>

              <ul className="space-y-3">

                {result.weaknesses?.map((item, index) => (
                  <li key={index}>
                    ❌ {item}
                  </li>
                ))}

              </ul>

            </div>

          </div>

          <div className="bg-slate-800 rounded-2xl p-6 mt-8">

            <h2 className="text-2xl font-bold text-cyan-400 mb-5">
              💡 AI Suggestions
            </h2>

            <ul className="space-y-3">

              {result.suggestions?.map((item, index) => (
                <li key={index}>
                  🚀 {item}
                </li>
              ))}

            </ul>

          </div>

          {result.recruiter_feedback && (

            <div className="bg-slate-800 rounded-2xl p-6 mt-8">

              <h2 className="text-2xl font-bold text-orange-400 mb-4">
                👨‍💼 Recruiter Feedback
              </h2>

              <p className="leading-8 text-gray-300">
                {result.recruiter_feedback}
              </p>

            </div>

          )}

          <div className="flex flex-wrap gap-5 justify-center mt-12">

            <button
              onClick={() => generateReport(result)}
                className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-xl font-bold transition"
                       > 
                   📄 Download PDF Report
                       </button>

            <button
              onClick={() => {
                localStorage.removeItem("interviewResult");
                navigate("/");
              }}
              className="bg-violet-600 hover:bg-violet-700 px-8 py-3 rounded-xl font-bold transition"
            >
              🏠 Back to Home
            </button>

            <button
              onClick={() => navigate("/interview")}
              className="bg-green-600 hover:bg-green-700 px-8 py-3 rounded-xl font-bold transition"
            >
              🔄 Restart Interview
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ResultPage;