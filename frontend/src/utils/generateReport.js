import { jsPDF } from "jspdf";

export const generateReport = (result) => {
  const doc = new jsPDF();

  let y = 20;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("InterviewGPT", 20, y);

  y += 10;

  doc.setFontSize(16);
  doc.text("AI Interview Performance Report", 20, y);

  y += 15;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);

  doc.text(`Overall Score : ${result.overall_score}/100`, 20, y);
  y += 8;

  doc.text(`Technical Score : ${result.technical_score}/100`, 20, y);
  y += 8;

  doc.text(`Communication Score : ${result.communication_score}/100`, 20, y);
  y += 8;

  doc.text(`Confidence Score : ${result.confidence_score}/100`, 20, y);
  y += 8;

  doc.text(`Grammar Score : ${result.grammar_score}/100`, 20, y);

  y += 18;

  doc.setFont("helvetica", "bold");
  doc.text("Strengths", 20, y);

  y += 8;

  doc.setFont("helvetica", "normal");

  result.strengths?.forEach((item) => {
    doc.text(`• ${item}`, 25, y);
    y += 7;
  });

  y += 8;

  doc.setFont("helvetica", "bold");
  doc.text("Weaknesses", 20, y);

  y += 8;

  doc.setFont("helvetica", "normal");

  result.weaknesses?.forEach((item) => {
    doc.text(`• ${item}`, 25, y);
    y += 7;
  });

  y += 8;

  doc.setFont("helvetica", "bold");
  doc.text("AI Suggestions", 20, y);

  y += 8;

  doc.setFont("helvetica", "normal");

  result.suggestions?.forEach((item) => {
    doc.text(`• ${item}`, 25, y);
    y += 7;
  });

  if (result.recruiter_feedback) {
    y += 10;

    doc.setFont("helvetica", "bold");
    doc.text("Recruiter Feedback", 20, y);

    y += 8;

    doc.setFont("helvetica", "normal");

    const lines = doc.splitTextToSize(result.recruiter_feedback, 170);

    doc.text(lines, 20, y);
  }

  const date = new Date().toLocaleString();

  doc.setFontSize(10);

  doc.text(
    `Generated on: ${date}`,
    20,
    285
  );

  doc.save("InterviewGPT_Report.pdf");
};