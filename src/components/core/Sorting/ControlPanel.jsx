import { useState } from "react";
import { FaPlay, FaPause, FaRedo, FaPlus, FaRandom } from "react-icons/fa";
import { ALGORITHMS } from "../../../utils/sortingAlgorithms";

const ALGO_KEYS = Object.keys(ALGORITHMS);

export default function ControlPanel({
  selectedAlgo,
  onAlgoChange,
  onPlay,
  onPause,
  onReset,
  onAddNumber,
  onRandomize,
  isRunning,
  isDone,
  speed,
  onSpeedChange,
  arraySize,
  onArraySizeChange,
}) {
  const [inputVal, setInputVal] = useState("");

  function handleAdd() {
    const num = parseInt(inputVal, 10);
    if (!isNaN(num) && num >= 1 && num <= 999) {
      onAddNumber(num);
      setInputVal("");
    }
  }

  return (
    <div className="flex flex-col gap-6 h-full">

      {/* ── Algorithm Selector ── */}
      <div className="rounded-2xl bg-white p-5 shadow-md border border-slate-100">
        <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-slate-400">
          Algorithm
        </h3>
        <div className="flex flex-col gap-2">
          {ALGO_KEYS.map((key) => {
            const algo = ALGORITHMS[key];
            const isActive = selectedAlgo === key;
            return (
              <button
                key={key}
                onClick={() => onAlgoChange(key)}
                disabled={isRunning}
                className={`flex items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-semibold transition-all duration-200
                  ${isActive
                    ? "bg-cyan-500 text-white shadow-md shadow-cyan-200"
                    : "bg-slate-50 text-slate-600 hover:bg-cyan-50 hover:text-cyan-600"
                  }
                  ${isRunning ? "cursor-not-allowed opacity-60" : "cursor-pointer"}
                `}
              >
                <span>{algo.name}</span>
                {isActive && <span className="text-xs opacity-75">Selected ✓</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Array Controls ── */}
      <div className="rounded-2xl bg-white p-5 shadow-md border border-slate-100">
        <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-slate-400">
          Array
        </h3>

        {/* Add number */}
        <div className="mb-4">
          <label className="mb-1 block text-xs font-semibold text-slate-500">
            Add a Number (1–999)
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              min={1}
              max={999}
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAdd()}
              disabled={isRunning}
              placeholder="e.g. 42"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:border-cyan-400 focus:outline-none disabled:opacity-50"
            />
            <button
              onClick={handleAdd}
              disabled={isRunning}
              className="flex items-center gap-1 rounded-xl bg-cyan-500 px-3 py-2 text-sm text-white hover:bg-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <FaPlus size={12} />
            </button>
          </div>
        </div>

        {/* Array size slider */}
        <div className="mb-4">
          <div className="mb-1 flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-500">
              Array Size
            </label>
            <span className="text-xs font-bold text-cyan-500">{arraySize}</span>
          </div>
          <input
            type="range"
            min={4}
            max={20}
            value={arraySize}
            onChange={(e) => onArraySizeChange(Number(e.target.value))}
            disabled={isRunning}
            className="w-full accent-cyan-500 disabled:opacity-50"
          />
        </div>

        {/* Randomize */}
        <button
          onClick={onRandomize}
          disabled={isRunning}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 py-2.5 text-sm font-semibold text-slate-600 hover:bg-cyan-50 hover:text-cyan-600 hover:border-cyan-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FaRandom size={12} />
          Randomize Array
        </button>
      </div>

      {/* ── Speed Control ── */}
      <div className="rounded-2xl bg-white p-5 shadow-md border border-slate-100">
        <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-slate-400">
          Speed
        </h3>
        <div className="mb-1 flex items-center justify-between">
          <span className="text-xs text-slate-500">Slow</span>
          <span className="text-xs font-bold text-cyan-500">{speed}ms</span>
          <span className="text-xs text-slate-500">Fast</span>
        </div>
        <input
          type="range"
          min={50}
          max={1000}
          step={50}
          value={1050 - speed}
          onChange={(e) => onSpeedChange(1050 - Number(e.target.value))}
          className="w-full accent-cyan-500"
        />
      </div>

      {/* ── Playback Controls ── */}
      <div className="rounded-2xl bg-white p-5 shadow-md border border-slate-100">
        <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-slate-400">
          Controls
        </h3>
        <div className="flex gap-3">
          {/* Play / Pause */}
          {isRunning ? (
            <button
              onClick={onPause}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-yellow-400 py-3 font-semibold text-white hover:bg-yellow-500 transition-colors"
            >
              <FaPause size={14} />
              Pause
            </button>
          ) : (
            <button
              onClick={onPlay}
              disabled={isDone}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-cyan-500 py-3 font-semibold text-white hover:bg-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <FaPlay size={14} />
              {isDone ? "Done" : "Play"}
            </button>
          )}

          {/* Reset */}
          <button
            onClick={onReset}
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <FaRedo size={14} />
          </button>
        </div>
      </div>

      {/* ── Color Legend ── */}
      <div className="rounded-2xl bg-white p-5 shadow-md border border-slate-100">
        <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-slate-400">
          Legend
        </h3>
        <div className="flex flex-col gap-2 text-sm">
          {[
            { color: "bg-slate-400", label: "Default" },
            { color: "bg-yellow-400", label: "Comparing" },
            { color: "bg-red-400", label: "Swapping" },
            { color: "bg-purple-500", label: "Pivot" },
            { color: "bg-emerald-400", label: "Sorted" },
          ].map(({ color, label }) => (
            <div key={label} className="flex items-center gap-3">
              <span className={`h-4 w-4 rounded-sm ${color}`} />
              <span className="text-slate-600">{label}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
