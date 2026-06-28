import { ALGORITHMS } from "../../../utils/sortingAlgorithms";
import InfoCard from "../../common/InfoCard";

export default function CodePanel({ selectedAlgo, frame }) {
  const algo = ALGORITHMS[selectedAlgo];
  if (!algo) return null;

  const lines = algo.code.split("\n");

  return (
    <div className="flex flex-col gap-4 h-full">

      {/* ── Complexity Info ── */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <InfoCard label="Best" value={algo.timeComplexity.best} color="text-emerald-500" />
        <InfoCard label="Average" value={algo.timeComplexity.average} color="text-yellow-500" />
        <InfoCard label="Worst" value={algo.timeComplexity.worst} color="text-red-500" />
        <InfoCard label="Space" value={algo.spaceComplexity} color="text-blue-500" />
      </div>

      {/* ── Stable badge ── */}
      <div className="flex items-center gap-2">
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${algo.stable ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}`}>
          {algo.stable ? "Stable Sort" : "Unstable Sort"}
        </span>
      </div>

      {/* ── Description ── */}
      <p className="text-sm text-slate-500 leading-relaxed">
        {algo.description}
      </p>

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
            // Highlight lines that contain active operations based on frame state
            const isSwapLine = frame && (frame.swapping.length > 0) &&
              (line.includes("swap") || line.includes("arr[j]") || line.includes("arr[i]") || line.includes("arr[k]"));
            const isCmpLine = frame && (frame.comparing.length > 0) &&
              (line.includes("if") || line.includes("while") || line.includes("compare"));

            let lineClass = "text-slate-300";
            let bgClass = "";

            if (isSwapLine) {
              lineClass = "text-red-300 font-bold";
              bgClass = "bg-red-500/10 rounded";
            } else if (isCmpLine) {
              lineClass = "text-yellow-300 font-bold";
              bgClass = "bg-yellow-500/10 rounded";
            }

            return (
              <div
                key={idx}
                className={`flex gap-4 px-2 transition-all duration-150 ${bgClass}`}
              >
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

