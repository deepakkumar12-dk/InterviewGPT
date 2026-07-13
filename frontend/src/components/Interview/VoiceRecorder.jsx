import { useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

function VoiceRecorder({ answer, setAnswer }) {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    setAnswer(transcript);
  }, [transcript, setAnswer]);

  if (!browserSupportsSpeechRecognition) {
    return (
      <div className="rounded-xl bg-red-500/20 p-4 text-red-400">
        Your browser does not support Speech Recognition.
      </div>
    );
  }

  const startRecording = () => {
    resetTranscript();

    SpeechRecognition.startListening({
      continuous: true,
      language: "en-US",
    });
  };

  const stopRecording = () => {
    SpeechRecognition.stopListening();
  };

  const retryRecording = () => {
    resetTranscript();
    setAnswer("");
  };

  return (
    <div className="mt-8 rounded-2xl border border-white/10 bg-slate-900 p-6">

      <h2 className="text-xl font-bold text-white">
        Voice Answer
      </h2>

      <div className="mt-6 flex flex-wrap gap-4">

        <button
          onClick={startRecording}
          className="rounded-xl bg-green-600 px-6 py-3 font-semibold hover:bg-green-700"
        >
          🎤 {listening ? "Recording..." : "Start"}
        </button>

        <button
          onClick={stopRecording}
          className="rounded-xl bg-red-600 px-6 py-3 font-semibold hover:bg-red-700"
        >
          ⏹ Stop
        </button>

        <button
          onClick={retryRecording}
          className="rounded-xl bg-yellow-500 px-6 py-3 font-semibold text-black hover:bg-yellow-400"
        >
          🔄 Retry
        </button>

      </div>

      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        rows={8}
        placeholder="Your answer will appear here..."
        className="mt-8 w-full rounded-xl bg-slate-800 p-4 outline-none"
      />

    </div>
  );
}

export default VoiceRecorder;