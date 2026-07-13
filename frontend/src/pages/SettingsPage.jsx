import { motion } from "framer-motion";
import {
  FaUser,
  FaChartBar,
  FaTrash,
  FaGithub,
  FaLinkedin,
  FaRobot,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useResume } from "../context/ResumeContext";

function SettingsPage() {
  const navigate = useNavigate();
  const { analysis, clearAnalysis } = useResume();

  const interviewResult = JSON.parse(
    localStorage.getItem("interviewResult") || "null"
  );

  const Card = ({ children }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-slate-900/80 backdrop-blur-lg border border-slate-700 rounded-3xl p-8 shadow-xl"
    >
      {children}
    </motion.div>
  );

  const StatCard = ({ title, value, color }) => (
    <div className="bg-slate-800 rounded-2xl p-6">
      <h3 className="text-gray-400">{title}</h3>

      <h2 className={`text-4xl font-bold mt-3 ${color}`}>
        {value}
      </h2>
    </div>
  );

  const clearInterview = () => {
    localStorage.removeItem("interviewResult");
    alert("Interview Result Cleared");
  };

  const resetAll = () => {
    clearAnalysis();
    localStorage.removeItem("interviewResult");

    alert("Application Reset Successfully");

    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white p-8">

      <div className="max-w-7xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-6xl font-black">
            Settings
          </h1>

          <p className="text-gray-400 mt-3 text-lg">
            Manage your InterviewGPT profile and application data.
          </p>
        </motion.div>

        <Card>

          <div className="flex items-center gap-4 mb-8">

            <FaUser className="text-4xl text-cyan-400" />

            <h2 className="text-3xl font-bold">
              Profile
            </h2>

          </div>

          <div className="space-y-5 text-lg">

            <p>
              <span className="font-semibold text-cyan-400">
                Candidate :
              </span>{" "}
              {analysis?.candidate_name || "Candidate"}
            </p>

            <p>
              <span className="font-semibold text-cyan-400">
                Role :
              </span>{" "}
              {analysis?.detected_role || "Not Detected"}
            </p>

            <p>
              <span className="font-semibold text-cyan-400">
                Resume :
              </span>{" "}
              {analysis ? "Uploaded ✅" : "Not Uploaded ❌"}
            </p>

            <p>
              <span className="font-semibold text-cyan-400">
                Interview :
              </span>{" "}
              {interviewResult ? "Completed ✅" : "Not Attempted"}
            </p>

          </div>

        </Card>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">

          <StatCard
            title="ATS Score"
            value={analysis?.ats_score || 0}
            color="text-green-400"
          />

          <StatCard
            title="Skills"
            value={analysis?.skills?.length || 0}
            color="text-blue-400"
          />

          <StatCard
            title="Missing Keywords"
            value={analysis?.missing_keywords?.length || 0}
            color="text-red-400"
          />

          <StatCard
            title="Interview Score"
            value={interviewResult?.overall_score || 0}
            color="text-violet-400"
          />

        </div>
                <Card>

          <div className="flex items-center gap-4 mb-8 mt-10">

            <FaTrash className="text-4xl text-red-400" />

            <h2 className="text-3xl font-bold">
              Data Management
            </h2>

          </div>

          <div className="flex flex-wrap gap-5">

            <button
              onClick={clearAnalysis}
              className="bg-red-600 hover:bg-red-700 px-8 py-4 rounded-xl font-bold transition"
            >
              🗑 Clear Resume Analysis
            </button>

            <button
              onClick={clearInterview}
              className="bg-orange-600 hover:bg-orange-700 px-8 py-4 rounded-xl font-bold transition"
            >
              🗑 Clear Interview Result
            </button>

            <button
              onClick={resetAll}
              className="bg-violet-600 hover:bg-violet-700 px-8 py-4 rounded-xl font-bold transition"
            >
              🔄 Reset Application
            </button>

          </div>

        </Card>

        <Card>

          <div className="flex items-center gap-4 mb-8 mt-10">

            <FaRobot className="text-4xl text-cyan-400" />

            <h2 className="text-3xl font-bold">
              About InterviewGPT
            </h2>

          </div>

          <div className="space-y-5 text-lg leading-8 text-gray-300">

            <p>
              InterviewGPT is an AI-powered Resume Analyzer and Mock Interview
              platform that helps students and professionals improve their
              resumes, prepare for interviews, and receive AI-generated
              performance reports.
            </p>

            <div className="grid md:grid-cols-2 gap-6">

              <div className="bg-slate-800 rounded-2xl p-5">
                <h3 className="text-xl font-bold text-cyan-400 mb-3">
                  Tech Stack
                </h3>

                <ul className="space-y-2">
                  <li>⚛ React.js</li>
                  <li>🐍 FastAPI</li>
                  <li>🤖 Groq AI</li>
                  <li>🎨 Tailwind CSS</li>
                  <li>💻 Python</li>
                </ul>
              </div>

              <div className="bg-slate-800 rounded-2xl p-5">
                <h3 className="text-xl font-bold text-green-400 mb-3">
                  Version
                </h3>

                <p>InterviewGPT v1.0.0</p>

                <p className="mt-3">
                  Built for AI Resume Analysis & Mock Interview Preparation.
                </p>
              </div>

            </div>

          </div>

        </Card>

        <Card>

          <div className="flex items-center gap-4 mb-8 mt-10">

            <FaUser className="text-4xl text-violet-400" />

            <h2 className="text-3xl font-bold">
              Developer
            </h2>

          </div>

          <div className="text-center">

            <div className="w-28 h-28 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 flex items-center justify-center mx-auto text-5xl font-bold">
              DK
            </div>

            <h2 className="text-3xl font-bold mt-6">
              Deepak Kumar
            </h2>

            <p className="text-cyan-400 text-xl mt-2">
              Python Developer & AI/ML Developer
            </p>

            <div className="flex justify-center gap-6 mt-8">

              <a
                href="https://github.com/deepakkumar12-dk"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-slate-800 hover:bg-slate-700 px-6 py-3 rounded-xl transition"
              >
                <FaGithub size={24} />
                GitHub
              </a>

              <a
                href="https://www.linkedin.com/in/deepak-kumar-643734285/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl transition"
              >
                <FaLinkedin size={24} />
                LinkedIn
              </a>

            </div>

          </div>

        </Card>

      </div>

    </div>
  );
}

export default SettingsPage;
