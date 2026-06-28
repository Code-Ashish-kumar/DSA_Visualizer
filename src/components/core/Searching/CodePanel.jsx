import { SEARCH_ALGORITHMS } from "../../../utils/searchingAlgorithms";
import InfoCard from "../../common/InfoCard";   

export default function CodePanel({ selectedAlgo, frame }) {
  const algo = SEARCH_ALGORITHMS[selectedAlgo];
  if (!algo) return null;

  const lines = algo.code.split("\n");

  return (
    <div className="flex flex-col gap-4 h-full">

      {/* ── Complexity Info ── */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <InfoCard label="Best"    value={algo.timeComplexity.best}    color="text-emerald-500" />
        <InfoCard label="Average" value={algo.timeComplexity.average} color="text-yellow-500" />
        <InfoCard label="Worst"   value={algo.timeComplexity.worst}   color="text-red-500" />
        <InfoCard label="Space"   value={algo.spaceComplexity}        color="text-blue-500" />
      </div>

      {/* ── Sorted-array badge ── */}
      <div className="flex items-center gap-2">
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            algo.requiresSorted
              ? "bg-amber-100 text-amber-700"
              : "bg-sky-100 text-sky-700"
          }`}
        >
          {algo.requiresSorted ? "⚠ Requires Sorted Array" : "✓ Works on Any Array"}
        </span>
      </div>

      {/* ── Description ── */}
      <p className="text-sm text-slate-500 leading-relaxed">{algo.description}</p>

      {/* ── Code Block ── */}
      <div className="flex-1 rounded-2xl overflow-hidden border border-slate-200 bg-slate-900">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-800 border-b border-slate-700">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-400" />
            <span className="h-3 w-3 rounded-full bg-yellow-400" />
            <span className="h-3 w-3 rounded-full bg-emerald-400" />
          </div>
          <span className="text-xs text-slate-400 font-mono">
            {algo.name.toLowerCase().replace(" ", "_")}.js
          </span>
          <span className="text-xs text-slate-500">JavaScript</span>
        </div>

        {/* Code lines */}
        <div className="overflow-auto p-4 font-mono text-sm leading-7">
          {lines.map((line, idx) => {
            // Highlight lines relevant to the active frame state
            const isCheckLine = frame && frame.current >= 0 &&
              (line.includes("if") || line.includes("===") || line.includes("else"));
            const isEliminateLine = frame && frame.eliminated?.length > 0 &&
              (line.includes("low") || line.includes("high") || line.includes("mid") || line.includes("return -1"));
            const isFoundLine = frame && frame.found >= 0 &&
              (line.includes("return") && line.includes("mid") || line.includes("return") && line.includes("i"));

            let lineClass = "text-slate-300";
            let bgClass   = "";

            if (isFoundLine) {
              lineClass = "text-emerald-300 font-bold";
              bgClass   = "bg-emerald-500/10 rounded";
            } else if (isCheckLine) {
              lineClass = "text-yellow-300 font-bold";
              bgClass   = "bg-yellow-500/10 rounded";
            } else if (isEliminateLine) {
              lineClass = "text-sky-300 font-bold";
              bgClass   = "bg-sky-500/10 rounded";
            }

            return (
              <div key={idx} className={`flex gap-4 px-2 transition-all duration-150 ${bgClass}`}>
                <span className="select-none text-slate-600 text-right w-5 shrink-0">
                  {idx + 1}
                </span>
                <pre className={`whitespace-pre-wrap break-all ${lineClass}`}>
                  {line || " "}
                </pre>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}


