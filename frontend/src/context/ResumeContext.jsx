import { createContext, useContext, useEffect, useState } from "react";

const ResumeContext = createContext();

export const ResumeProvider = ({ children }) => {
  const [analysis, setAnalysis] = useState(() => {
    const saved = localStorage.getItem("resumeAnalysis");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (analysis) {
      localStorage.setItem("resumeAnalysis", JSON.stringify(analysis));
    } else {
      localStorage.removeItem("resumeAnalysis");
    }
  }, [analysis]);

  const clearAnalysis = () => {
    setAnalysis(null);
    localStorage.removeItem("resumeAnalysis");
  };

  return (
    <ResumeContext.Provider
      value={{
        analysis,
        setAnalysis,
        clearAnalysis,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => useContext(ResumeContext);