export default function Visualizer({ frame, totalFrames, currentFrameIdx }) {
  if (!frame) return null;

  const { array, target, current, found, eliminated, low, high, mid } = frame;

  const notFound = found === -2;
  const isFound  = found >= 0;

  function getBarColor(index) {
    if (isFound  && index === found)      return "#34d399"; // emerald — found
    if (notFound && eliminated.includes(index)) return "#475569"; // dark slate — eliminated
    if (index === mid)                    return "#a855f7"; // purple  — mid pointer
    if (index === current)                return "#fbbf24"; // yellow  — being checked
    if (eliminated.includes(index))       return "#cbd5e1"; // light slate — eliminated
    // binary search active window
    if (low !== -1 && high !== -1 && index >= low && index <= high)
      return "#38bdf8"; // sky — active window
    return "#94a3b8"; // slate — default
  }

  const maxVal = Math.max(...array, 1);
  const CHART_HEIGHT   = 340;
  const CHART_INNER    = CHART_HEIGHT - 64;
  const BAR_AREA_HEIGHT = CHART_INNER * 0.85;
  const scaleFactor    = BAR_AREA_HEIGHT / maxVal;
  const progress = totalFrames > 1 ? (currentFrameIdx / (totalFrames - 1)) * 100 : 0;

  return (
    <div className="flex flex-col gap-4">

      {/* ── Search info banner ── */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Target</span>
          <span className="text-lg font-extrabold text-cyan-500">{target}</span>
        </div>

        {isFound && (
          <div className="flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-2">
            <span className="text-emerald-600 font-bold text-sm">✓ Found at index {found}</span>
          </div>
        )}
        {notFound && (
          <div className="flex items-center gap-2 rounded-xl bg-rose-50 border border-rose-200 px-4 py-2">
            <span className="text-rose-500 font-bold text-sm">✗ Not found in array</span>
          </div>
        )}
      </div>

      {/* ── Progress bar ── */}
      <div className="flex items-center gap-3">
        <span className="text-xs text-slate-400 font-semibold shrink-0">
          Step {currentFrameIdx + 1} / {totalFrames}
        </span>
        <div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-200"
            style={{
              width: `${progress}%`,
              background: "linear-gradient(to right, #22d3ee, #3b82f6)",
            }}
          />
        </div>
        <span className="text-xs text-slate-400 font-semibold shrink-0">
          {Math.round(progress)}%
        </span>
      </div>

      {/* ── Chart ── */}
      <div
        className="relative w-full rounded-2xl bg-slate-50 border border-slate-200 px-4 pt-4 pb-8"
        style={{ height: `${CHART_HEIGHT}px` }}
      >
        {/* Guide lines */}
        {[25, 50, 75].map((pct) => (
          <div
            key={pct}
            className="pointer-events-none absolute left-4 right-4 border-t border-dashed border-slate-200"
            style={{ bottom: `${pct * 0.8 + 8}%` }}
          >
            <span className="absolute right-0 -top-4 text-[10px] text-slate-300 select-none">
              {Math.round((maxVal * pct) / 100)}
            </span>
          </div>
        ))}

        {/* Binary search range bracket */}
        {low !== -1 && high !== -1 && !isFound && !notFound && (
          <div
            className="pointer-events-none absolute border-t-2 border-sky-400"
            style={{
              bottom: "28px",
              left: `calc(${(low / array.length) * 100}% + 16px)`,
              width: `calc(${((high - low + 1) / array.length) * 100}%)`,
              transition: "all 0.2s",
            }}
          >
            <span className="absolute left-0 -top-5 text-[9px] font-bold text-sky-500">L:{low}</span>
            <span className="absolute right-0 -top-5 text-[9px] font-bold text-sky-500">H:{high}</span>
          </div>
        )}

        {/* Bars wrapper */}
        <div
          className="absolute bottom-8 left-4 right-4 flex items-end gap-1"
          style={{ height: `${BAR_AREA_HEIGHT}px` }}
        >
          {array.map((value, index) => {
            const barHeightPx = value * scaleFactor;
            const color = getBarColor(index);

            // Label above bar
            let topLabel = "";
            if (index === mid)     topLabel = "M";
            else if (index === current && !isFound) topLabel = "?";
            else if (isFound && index === found)    topLabel = "✓";

            return (
              <div
                key={index}
                className="relative flex flex-col items-center"
                style={{ flex: "1 1 0", minWidth: 0 }}
              >
                {topLabel && (
                  <span
                    className="absolute text-[9px] font-bold text-slate-600 select-none"
                    style={{ bottom: `${barHeightPx + 4}px` }}
                  >
                    {topLabel}
                  </span>
                )}
                <div
                  className="w-full rounded-t-sm transition-all duration-150"
                  style={{
                    height: `${barHeightPx}px`,
                    backgroundColor: color,
                    minHeight: "4px",
                    opacity: eliminated.includes(index) && !isFound ? 0.45 : 1,
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Value labels along the bottom */}
        <div className="absolute bottom-1 left-4 right-4 flex gap-1">
          {array.map((value, index) => (
            <div
              key={index}
              className="flex-1 min-w-0 text-center"
              style={{ fontSize: array.length > 14 ? "8px" : "10px" }}
            >
              <span className="text-slate-500 font-semibold truncate block">{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Color legend ── */}
      <div className="flex flex-wrap gap-4 px-1">
        {[
          { color: "#94a3b8", label: "Default" },
          { color: "#38bdf8", label: "Active Range" },
          { color: "#fbbf24", label: "Checking" },
          { color: "#a855f7", label: "Mid Pointer" },
          { color: "#34d399", label: "Found" },
          { color: "#cbd5e1", label: "Eliminated" },
        ].map(({ color, label }) => (
          <div key={label} className="flex items-center gap-1.5">
            <span className="inline-block h-3 w-3 rounded-sm" style={{ backgroundColor: color }} />
            <span className="text-xs text-slate-500">{label}</span>
          </div>
        ))}
      </div>

    </div>
  );
}
