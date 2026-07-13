import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaCheckCircle,
  FaRobot,
} from "react-icons/fa";

function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">

      {/* Background Blur */}
      <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-violet-600/20 blur-[140px]" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-blue-600/20 blur-[140px]" />

      <div className="relative mx-auto flex min-h-[90vh] max-w-7xl items-center justify-between gap-16 px-8">

        {/* LEFT */}

        <motion.div
          initial={{ opacity: 0, x: -70 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: .8 }}
          className="max-w-xl"
        >

          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-sm text-violet-300">
            <FaRobot />
            AI Powered Interview Platform
          </div>

          <h1 className="text-6xl font-black leading-tight">

            Ace Every

            <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">

              {" "}Interview

            </span>

            <br />

            With AI

          </h1>

          <p className="mt-8 text-lg leading-8 text-slate-400">

            Upload your resume, improve ATS score,
            practice mock interviews,
            receive AI feedback and become job ready.

          </p>

          <div className="mt-10 flex gap-5">

            <button className="flex items-center gap-2 rounded-xl bg-violet-600 px-8 py-4 font-semibold transition hover:bg-violet-700">

              Upload Resume

              <FaArrowRight />

            </button>

            <button className="rounded-xl border border-white/20 px-8 py-4 font-semibold transition hover:bg-white hover:text-black">

              Watch Demo

            </button>

          </div>

          <div className="mt-12 flex gap-8">

            <div>
              <h2 className="text-4xl font-bold text-violet-400">
                10K+
              </h2>
              <p className="text-slate-500">
                Resumes Analysed
              </p>
            </div>

            <div>
              <h2 className="text-4xl font-bold text-violet-400">
                95%
              </h2>
              <p className="text-slate-500">
                ATS Accuracy
              </p>
            </div>

            <div>
              <h2 className="text-4xl font-bold text-violet-400">
                24/7
              </h2>
              <p className="text-slate-500">
                AI Support
              </p>
            </div>

          </div>

        </motion.div>

        {/* RIGHT */}

        <motion.div
          initial={{ opacity: 0, x: 70 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: .8 }}
          className="w-[470px]"
        >

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-2xl">

            <div className="mb-8 flex items-center justify-between">

              <h2 className="text-2xl font-bold">

                AI Dashboard

              </h2>

              <span className="rounded-full bg-green-500/20 px-3 py-1 text-sm text-green-400">

                ● AI Active

              </span>

            </div>

            {/* ATS */}

            <div className="mb-6">

              <div className="mb-2 flex justify-between">

                <span>ATS Score</span>

                <span className="font-bold text-violet-400">

                  92%

                </span>

              </div>

              <div className="h-3 rounded-full bg-slate-700">

                <div className="h-3 w-[92%] rounded-full bg-violet-500"></div>

              </div>

            </div>

            {/* Resume */}

            <div className="mb-6">

              <div className="mb-2 flex justify-between">

                <span>Resume Quality</span>

                <span className="font-bold text-blue-400">

                  88%

                </span>

              </div>

              <div className="h-3 rounded-full bg-slate-700">

                <div className="h-3 w-[88%] rounded-full bg-blue-500"></div>

              </div>

            </div>

            {/* Skills */}

            <h3 className="mb-4 font-semibold">

              Top Skills

            </h3>

            <div className="mb-8 flex flex-wrap gap-3">

              <span className="rounded-full bg-violet-500/20 px-4 py-2 text-violet-300">

                React

              </span>

              <span className="rounded-full bg-blue-500/20 px-4 py-2 text-blue-300">

                Python

              </span>

              <span className="rounded-full bg-pink-500/20 px-4 py-2 text-pink-300">

                AI

              </span>

              <span className="rounded-full bg-green-500/20 px-4 py-2 text-green-300">

                FastAPI

              </span>

            </div>

            {/* Checklist */}

            <div className="space-y-4">

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-3">

                  <FaCheckCircle className="text-green-400" />

                  Resume Uploaded

                </div>

                <span>Done</span>

              </div>

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-3">

                  <FaCheckCircle className="text-green-400" />

                  AI Analysis

                </div>

                <span>Completed</span>

              </div>

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-3">

                  <FaCheckCircle className="text-green-400" />

                  Interview Ready

                </div>

                <span className="font-bold text-green-400">

                  YES

                </span>

              </div>

            </div>

          </div>

        </motion.div>

      </div>

    </section>
  );
}

export default Hero;