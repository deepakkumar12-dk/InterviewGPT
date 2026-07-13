import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCloudUploadAlt, FaFilePdf } from "react-icons/fa";

import api from "../../services/api";
import AnalysisResult from "../AnalysisResult/AnalysisResult";
import { useResume } from "../../context/ResumeContext";

function UploadResume({ onAnalysisComplete }) {
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const { analysis, setAnalysis } = useResume();

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    if (selectedFile.type !== "application/pdf") {
      alert("Please upload PDF only.");
      return;
    }

    setFile(selectedFile);
  };

  const handleAnalyze = async () => {
    if (!file) {
      alert("Please select a resume.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);

      const response = await api.post("/upload-resume", formData);

      const result = response.data.analysis;

      setAnalysis(result);

      if (onAnalysisComplete) {
        onAnalysisComplete(result);
      }
    } catch (err) {
      console.error(err);
      alert("Resume analysis failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mt-10 rounded-3xl border border-white/10 bg-slate-900 p-10">
        <div className="text-center">
          <FaCloudUploadAlt className="mx-auto mb-6 text-7xl text-violet-500" />

          <h2 className="text-3xl font-bold">
            Upload Resume
          </h2>

          <p className="mt-3 text-slate-400">
            Upload your PDF resume for AI analysis.
          </p>

          <button
            onClick={() => inputRef.current.click()}
            className="mt-8 rounded-xl bg-violet-600 px-8 py-4 font-semibold hover:bg-violet-700"
          >
            Choose Resume
          </button>

          <input
            ref={inputRef}
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        {file && (
          <div className="mt-10 rounded-2xl bg-slate-800 p-6">
            <div className="flex items-center gap-4">
              <FaFilePdf className="text-5xl text-red-500" />

              <div>
                <h3>{file.name}</h3>

                <p className="text-slate-400">
                  {(file.size / 1024).toFixed(2)} KB
                </p>
              </div>
            </div>

            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="mt-6 w-full rounded-xl bg-green-600 py-3 font-semibold hover:bg-green-700 disabled:opacity-60"
            >
              {loading ? "Analyzing..." : "Analyze Resume"}
            </button>
          </div>
        )}
      </div>

      {analysis && (
        <AnalysisResult
          analysis={analysis}
          onStartInterview={() => navigate("/interview")}
        />
      )}
    </>
  );
}

export default UploadResume;