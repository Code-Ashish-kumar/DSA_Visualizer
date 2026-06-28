export default function Visualizer({ frame, totalFrames, currentFrameIdx }) {
  if (!frame) return null;

  const { array, comparing, swapping, sorted, pivot } = frame;
  const maxVal = Math.max(...array, 1);

  function getBarColor(index) {
    if (sorted.includes(index))   return "#34d399"; // emerald
    if (swapping.includes(index)) return "#f87171"; // red
    if (comparing.includes(index))return "#fbbf24"; // yellow
    if (pivot === index)          return "#a855f7"; // purple
    return "#94a3b8";                               // slate
  }

  const CHART_HEIGHT = 340; // px — bars resolve against this
  const CHART_INNER = CHART_HEIGHT - 64; // subtract top padding (pt-4=16) + bottom label area (pb-8=32) + gap
  const BAR_AREA_HEIGHT = CHART_INNER * 0.85; // 85% of inner height for bars
  const scaleFactor = BAR_AREA_HEIGHT / maxVal; // px per unit value
  const progress = totalFrames > 1 ? (currentFrameIdx / (totalFrames - 1)) * 100 : 0;

  return (
    <div className="flex flex-col gap-4">

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

        {/* Bars wrapper — sits at bottom, fills full width */}
        <div
          className="absolute bottom-8 left-4 right-4 flex items-end gap-1"
          style={{ height: `${BAR_AREA_HEIGHT}px` }}
        >
          {array.map((value, index) => {
            const barHeightPx = value * scaleFactor;
            const color = getBarColor(index);

            // state label
            let stateLabel = "";
            if (sorted.includes(index))    stateLabel = "✓";
            else if (swapping.includes(index))  stateLabel = "↕";
            else if (comparing.includes(index)) stateLabel = "?";
            else if (pivot === index)           stateLabel = "P";

            return (
              <div
                key={index}
                className="relative flex flex-col items-center"
                style={{ flex: "1 1 0", minWidth: 0 }}
              >
                {/* State badge */}
                {stateLabel && (
                  <span
                    className="absolute text-[9px] font-bold text-slate-600 select-none"
                    style={{ bottom: `calc(${barHeightPx}px + 4px)` }}
                  >
                    {stateLabel}
                  </span>
                )}

                {/* The bar itself */}
                <div
                  className="w-full rounded-t-sm transition-all duration-150"
                  style={{
                    height: `${barHeightPx}px`,
                    backgroundColor: color,
                    minHeight: "4px",
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* Value labels along the bottom */}
        <div
          className="absolute bottom-1 left-4 right-4 flex gap-1"
        >
          {array.map((value, index) => (
            <div
              key={index}
              className="flex-1 min-w-0 text-center"
              style={{ fontSize: array.length > 14 ? "8px" : "10px" }}
            >
              <span className="text-slate-500 font-semibold truncate block">
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Color legend ── */}
      <div className="flex flex-wrap gap-4 px-1">
        {[
          { color: "#94a3b8", label: "Default" },
          { color: "#fbbf24", label: "Comparing" },
          { color: "#f87171", label: "Swapping" },
          { color: "#a855f7", label: "Pivot" },
          { color: "#34d399", label: "Sorted" },
        ].map(({ color, label }) => (
          <div key={label} className="flex items-center gap-1.5">
            <span
              className="inline-block h-3 w-3 rounded-sm"
              style={{ backgroundColor: color }}
            />
            <span className="text-xs text-slate-500">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
