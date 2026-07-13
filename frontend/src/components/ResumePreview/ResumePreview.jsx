import { Document, Page, pdfjs } from "react-pdf";
import { useState } from "react";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

function ResumePreview({ file }) {
  const [numPages, setNumPages] = useState(null);

  if (!file) return null;

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900 p-6">

      <h2 className="mb-6 text-2xl font-bold text-white">
        Resume Preview
      </h2>

      <div className="overflow-auto rounded-xl bg-white p-3">

        <Document
          file={file}
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        >
          {Array.from(new Array(numPages), (_, index) => (
            <Page
              key={index}
              pageNumber={index + 1}
              width={500}
            />
          ))}
        </Document>

      </div>

    </div>
  );
}

export default ResumePreview;   