import { motion } from "framer-motion";
import {
  FaBrain,
  FaChartLine,
  FaCode,
  FaSearch,
  FaUserTie,
  FaArrowRight,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useResume } from "../context/ResumeContext";

function AnalysisPage() {
  const navigate = useNavigate();
  const { analysis } = useResume();

  if (!analysis) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-5xl font-bold">No Resume Analysis Found</h1>
          <p className="text-gray-400 mt-4">
            Please upload and analyze your resume first.
          </p>

          <button
            onClick={() => navigate("/resume")}
            className="mt-8 bg-violet-600 hover:bg-violet-700 px-8 py-3 rounded-xl font-bold"
          >
            Analyze Resume
          </button>
        </div>
      </div>
    );
  }

  const Card = ({ children, className = "" }) => (
    <motion.div
      whileHover={{
        scale: 1.02,
        y: -5,
      }}
      className={`bg-slate-900/80 backdrop-blur-lg border border-slate-700 rounded-3xl p-8 shadow-2xl ${className}`}
    >
      {children}
    </motion.div>
  );

  const StatCard = ({ icon, title, value, color }) => (
    <Card>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400">{title}</p>

          <h2 className={`text-5xl font-bold mt-3 ${color}`}>
            {value}
          </h2>
        </div>

        <div className="text-5xl">{icon}</div>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white p-8">

      <div className="max-w-7xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-6xl font-black">
            AI Resume Analysis
          </h1>

          <p className="text-gray-400 mt-3 text-lg">
            Complete AI-powered analysis of your resume.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 mt-10"
        >
          <StatCard
            title="ATS Score"
            value={`${analysis.ats_score}/100`}
            color="text-green-400"
            icon={<FaChartLine className="text-green-400" />}
          />

          <StatCard
            title="Skills"
            value={analysis.skills?.length || 0}
            color="text-cyan-400"
            icon={<FaCode className="text-cyan-400" />}
          />

          <StatCard
            title="Missing Keywords"
            value={analysis.missing_keywords?.length || 0}
            color="text-red-400"
            icon={<FaSearch className="text-red-400" />}
          />

          <StatCard
            title="Role"
            value={analysis.detected_role || "N/A"}
            color="text-violet-400"
            icon={<FaUserTie className="text-violet-400" />}
          />
        </motion.div>

        <Card className="mt-10">

          <div className="flex items-center gap-4">

            <FaBrain className="text-4xl text-violet-400" />

            <h2 className="text-3xl font-bold">
              Resume Summary
            </h2>

          </div>

          <p className="mt-8 text-gray-300 leading-9 text-lg">
            {analysis.resume_summary}
          </p>

        </Card>

        <div className="grid lg:grid-cols-2 gap-8 mt-10">

          <Card>

            <h2 className="text-3xl font-bold text-cyan-400">
              Skills
            </h2>

            <div className="flex flex-wrap gap-4 mt-8">

              {analysis.skills?.map((skill, index) => (

                <motion.div
                  key={index}
                  whileHover={{
                    scale: 1.08,
                  }}
                  className="px-5 py-3 rounded-full bg-cyan-500/10 border border-cyan-500/30"
                >
                  {skill}
                </motion.div>

              ))}

            </div>

          </Card>

          <Card>

            <h2 className="text-3xl font-bold text-red-400">
              Missing Keywords
            </h2>

            <div className="flex flex-wrap gap-4 mt-8">

              {analysis.missing_keywords?.map((item, index) => (

                <motion.div
                  key={index}
                  whileHover={{
                    scale: 1.08,
                  }}
                  className="px-5 py-3 rounded-full bg-red-500/10 border border-red-500/30"
                >
                  {item}
                </motion.div>

              ))}

            </div>

          </Card>

        </div>
                <div className="grid lg:grid-cols-2 gap-8 mt-10">

          <Card>

            <h2 className="text-3xl font-bold text-green-400">
              💪 Strengths
            </h2>

            <div className="space-y-4 mt-8">

              {analysis.strengths?.map((item, index) => (

                <motion.div
                  key={index}
                  whileHover={{
                    x: 8,
                  }}
                  className="bg-green-500/10 border border-green-500/20 rounded-2xl p-5"
                >
                  <p className="text-lg">
                    ✅ {item}
                  </p>
                </motion.div>

              ))}

            </div>

          </Card>

          <Card>

            <h2 className="text-3xl font-bold text-red-400">
              ⚠ Weaknesses
            </h2>

            <div className="space-y-4 mt-8">

              {analysis.weaknesses?.map((item, index) => (

                <motion.div
                  key={index}
                  whileHover={{
                    x: 8,
                  }}
                  className="bg-red-500/10 border border-red-500/20 rounded-2xl p-5"
                >
                  <p className="text-lg">
                    ❌ {item}
                  </p>
                </motion.div>

              ))}

            </div>

          </Card>

        </div>

        <Card className="mt-10">

          <h2 className="text-3xl font-bold text-orange-400">
            👨‍💼 Recruiter Feedback
          </h2>

          <div className="mt-8 bg-orange-500/10 border border-orange-500/20 rounded-2xl p-6">

            <p className="text-lg text-gray-300 leading-9">

              {analysis.recruiter_feedback ||
                "Your resume demonstrates a good foundation. Continue improving your projects, quantify your achievements, and include more role-specific keywords to maximize ATS performance."}

            </p>

          </div>

        </Card>

        <Card className="mt-10">

          <h2 className="text-3xl font-bold text-cyan-400">
            💡 AI Suggestions
          </h2>

          <div className="space-y-4 mt-8">

            {analysis.suggestions?.map((item, index) => (

              <motion.div
                key={index}
                whileHover={{
                  scale: 1.02,
                }}
                className="bg-cyan-500/10 border border-cyan-500/20 rounded-2xl p-5"
              >

                <p className="text-lg">

                  🚀 {item}

                </p>

              </motion.div>

            ))}

          </div>

        </Card>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-wrap justify-center gap-6 mt-12"
        >

          <button
            onClick={() => navigate("/interview")}
            className="bg-violet-600 hover:bg-violet-700 transition-all duration-300 px-8 py-4 rounded-2xl font-bold text-lg flex items-center gap-3"
          >
            Start Interview
            <FaArrowRight />
          </button>

          <button
            onClick={() => navigate("/resume")}
            className="bg-green-600 hover:bg-green-700 transition-all duration-300 px-8 py-4 rounded-2xl font-bold text-lg"
          >
            Analyze Another Resume
          </button>

        </motion.div>

      </div>

    </div>
  );
}

export default AnalysisPage;