import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./components/Dashboard/Dashboard";

import ResumePage from "./pages/ResumePage";
import AnalysisPage from "./pages/AnalysisPage";
import InterviewPage from "./pages/InterviewPage";
import ResultPage from "./pages/ResultPage";
import SettingsPage from "./pages/SettingsPage";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Navigate to="/dashboard" />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/resume"
          element={<ResumePage />}
        />

        <Route
          path="/analysis"
          element={<AnalysisPage />}
        />

        <Route
          path="/interview"
          element={<InterviewPage />}
        />

        <Route
          path="/result"
          element={<ResultPage />}
        />

        <Route
          path="/settings"
          element={<SettingsPage />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;