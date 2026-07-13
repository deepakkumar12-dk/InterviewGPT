import { NavLink } from "react-router-dom";
import { useState } from "react";
import UploadResume from "../UploadResume/UploadResume";
import {
  FaHome,
  FaFileAlt,
  FaChartLine,
  FaMicrophone,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

function Dashboard() {
  const [analysis, setAnalysis] = useState(null);

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">

      {/* Sidebar */}

      <aside className="w-72 bg-slate-900 border-r border-white/10 p-6">

        <h1 className="text-3xl font-bold mb-12">
          Interview
          <span className="text-violet-500">GPT</span>
        </h1>

        <nav className="space-y-4">

  <NavLink
    to="/dashboard"
    className={({ isActive }) =>
      `w-full flex items-center gap-3 px-5 py-4 rounded-xl transition ${
        isActive
          ? "bg-violet-600"
          : "hover:bg-white/10"
      }`
    }
  >
    <FaHome />
    Dashboard
  </NavLink>

  <NavLink
    to="/resume"
    className={({ isActive }) =>
      `w-full flex items-center gap-3 px-5 py-4 rounded-xl transition ${
        isActive
          ? "bg-violet-600"
          : "hover:bg-white/10"
      }`
    }
  >
    <FaFileAlt />
    Resume
  </NavLink>

  <NavLink
    to="/analysis"
    className={({ isActive }) =>
      `w-full flex items-center gap-3 px-5 py-4 rounded-xl transition ${
        isActive
          ? "bg-violet-600"
          : "hover:bg-white/10"
      }`
    }
  >
    <FaChartLine />
    Analysis
  </NavLink>

  <NavLink
    to="/interview"
    className={({ isActive }) =>
      `w-full flex items-center gap-3 px-5 py-4 rounded-xl transition ${
        isActive
          ? "bg-violet-600"
          : "hover:bg-white/10"
      }`
    }
  >
    <FaMicrophone />
    Interview
  </NavLink>

  <NavLink
    to="/settings"
    className={({ isActive }) =>
      `w-full flex items-center gap-3 px-5 py-4 rounded-xl transition ${
        isActive
          ? "bg-violet-600"
          : "hover:bg-white/10"
      }`
    }
  >
    <FaCog />
    Settings
  </NavLink>

</nav>

        <button className="mt-20 flex items-center gap-3 text-red-400">
          <FaSignOutAlt />
          Logout
        </button>

      </aside>

      {/* Main */}

      <main className="flex-1 overflow-y-auto p-10">

        <h2 className="text-4xl font-bold">
          Welcome Back 👋
        </h2>

        <p className="text-slate-400 mt-2">
          Let's improve your resume today.
        </p>

        {/* Stats */}

        <div className="grid lg:grid-cols-3 gap-8 mt-10">

          <div className="bg-white/5 rounded-2xl p-8 border border-white/10">

            <h3 className="text-slate-400">
              ATS Score
            </h3>

            <h1 className="text-6xl font-bold text-violet-400 mt-4">
              {analysis ? `${analysis.ats_score}%` : "--"}
            </h1>

          </div>

          <div className="bg-white/5 rounded-2xl p-8 border border-white/10">

            <h3 className="text-slate-400">
              Resume Score
            </h3>

            <h1 className="text-6xl font-bold text-blue-400 mt-4">
              {analysis ? `${analysis.ats_score}%` : "--"}
            </h1>

          </div>

          <div className="bg-white/5 rounded-2xl p-8 border border-white/10">

            <h3 className="text-slate-400">
              Interview Ready
            </h3>

            <h1 className="text-4xl font-bold text-green-400 mt-6">
              {analysis
                ? analysis.ats_score >= 75
                  ? "YES ✅"
                  : "NO ❌"
                : "--"}
            </h1>

          </div>

        </div>

        <UploadResume
          onAnalysisComplete={setAnalysis}
        />

      </main>

    </div>
  );
}

export default Dashboard;