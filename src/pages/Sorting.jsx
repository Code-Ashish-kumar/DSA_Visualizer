import { useState, useEffect, useRef, useCallback } from "react";
import ControlPanel from "../components/core/Sorting/ControlPanel";
import Visualizer from "../components/core/Sorting/Visualizer";
import CodePanel from "../components/core/Sorting/CodePanel";
import { ALGORITHMS } from "../utils/sortingAlgorithms";
import { FaCode, FaChartBar } from "react-icons/fa";

// ── helpers ──────────────────────────────────────────────────────────────────

function randomArray(size) {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 90) + 10);
}

// ── component ─────────────────────────────────────────────────────────────────

export default function Sorting() {
  const [selectedAlgo, setSelectedAlgo] = useState("bubble");
  const [arraySize, setArraySize] = useState(10);
  const [speed, setSpeed] = useState(300); // ms per frame
  const [activeTab, setActiveTab] = useState("visualizer"); // "visualizer" | "code"

  // Frames state
  const [frames, setFrames] = useState([]);
  const [currentFrameIdx, setCurrentFrameIdx] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isDone, setIsDone] = useState(false);

  // Source array (before sorting — for reset)
  const [sourceArray, setSourceArray] = useState(() => randomArray(10));

  const timerRef = useRef(null);

  // ── Pre-compute frames whenever algo or source array changes ──────────────
  const buildFrames = useCallback((algo, arr) => {
    const fn = ALGORITHMS[algo]?.fn;
    if (!fn || arr.length === 0) return [];
    return fn(arr);
  }, []);

  function resetVisualization(algo = selectedAlgo, src = sourceArray) {
    clearInterval(timerRef.current);
    setIsRunning(false);
    setIsDone(false);
    const f = buildFrames(algo, src);
    setFrames(f);
    setCurrentFrameIdx(0);
  }

  // Rebuild on mount and when algo changes
  useEffect(() => {
    resetVisualization(selectedAlgo, sourceArray);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAlgo, sourceArray]);

  // ── Playback logic ────────────────────────────────────────────────────────
  function handlePlay() {
    if (isDone || frames.length === 0) return;
    setIsRunning(true);
  }

  function handlePause() {
    setIsRunning(false);
    clearInterval(timerRef.current);
  }

  useEffect(() => {
    if (!isRunning) return;

    timerRef.current = setInterval(() => {
      setCurrentFrameIdx((prev) => {
        if (prev >= frames.length - 1) {
          setIsRunning(false);
          setIsDone(true);
          clearInterval(timerRef.current);
          return prev;
        }
        return prev + 1;
      });
    }, speed);

    return () => clearInterval(timerRef.current);
  }, [isRunning, frames.length, speed]);

  // ── Array manipulation ────────────────────────────────────────────────────
  function handleRandomize(size = arraySize) {
    const arr = randomArray(size);
    setSourceArray(arr);
    // resetVisualization triggered by useEffect on sourceArray change
  }

  function handleAddNumber(num) {
    if (isRunning) return;
    setSourceArray((prev) => [...prev, num]);
  }

  function handleArraySizeChange(size) {
    setArraySize(size);
    handleRandomize(size);
  }

  function handleReset() {
    resetVisualization(selectedAlgo, sourceArray);
  }

  function handleAlgoChange(key) {
    if (isRunning) return;
    setSelectedAlgo(key);
    // useEffect triggers rebuild
  }

  const currentFrame = frames[currentFrameIdx] ?? null;

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── Header ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-slate-100 bg-white py-8 px-6">
        <div className="absolute left-0 top-0 h-full w-1 bg-linear-to-b from-cyan-400 to-blue-500" />
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-cyan-500 mb-1">
                Algorithms / Sorting
              </p>
              <h1 className="text-3xl font-extrabold text-slate-800">
                {ALGORITHMS[selectedAlgo]?.name}
              </h1>
            </div>

            {/* Tab switcher (mobile-friendly) */}
            <div className="flex rounded-xl border border-slate-200 bg-slate-50 p-1 gap-1 lg:hidden">
              <TabBtn
                active={activeTab === "visualizer"}
                onClick={() => setActiveTab("visualizer")}
                icon={<FaChartBar size={13} />}
                label="Visualizer"
              />
              <TabBtn
                active={activeTab === "code"}
                onClick={() => setActiveTab("code")}
                icon={<FaCode size={13} />}
                label="Code"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Main Layout ────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-4 py-6 lg:px-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">

          {/* ── LEFT PANEL — Controls ─────────────────────────────────── */}
          <aside className="w-full lg:w-72 xl:w-80 shrink-0">
            <ControlPanel
              selectedAlgo={selectedAlgo}
              onAlgoChange={handleAlgoChange}
              onPlay={handlePlay}
              onPause={handlePause}
              onReset={handleReset}
              onAddNumber={handleAddNumber}
              onRandomize={() => handleRandomize(arraySize)}
              isRunning={isRunning}
              isDone={isDone}
              speed={speed}
              onSpeedChange={setSpeed}
              arraySize={arraySize}
              onArraySizeChange={handleArraySizeChange}
            />
          </aside>

          {/* ── RIGHT PANEL — Visualizer + Code ───────────────────────── */}
          <main className="flex-1 min-w-0">

            {/* Visualizer */}
            <div className={`rounded-2xl bg-white p-6 shadow-md border border-slate-100 ${activeTab !== "visualizer" ? "hidden lg:block" : ""}`}>
              <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-slate-400">
                Visualization
              </h2>
              <Visualizer
                frame={currentFrame}
                totalFrames={frames.length}
                currentFrameIdx={currentFrameIdx}
              />
            </div>

            {/* Spacer on desktop */}
            <div className="hidden lg:block h-6" />

            {/* Code + Info */}
            <div className={`rounded-2xl bg-white p-6 shadow-md border border-slate-100 ${activeTab !== "code" ? "hidden lg:block" : ""}`}>
              <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-slate-400">
                Algorithm Details & Code
              </h2>
              <CodePanel selectedAlgo={selectedAlgo} frame={currentFrame} />
            </div>

          </main>
        </div>
      </div>
    </div>
  );
}

function TabBtn({ active, onClick, icon, label }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold transition-all
        ${active ? "bg-cyan-500 text-white shadow-sm" : "text-slate-500 hover:text-slate-700"}
      `}
    >
      {icon}
      {label}
    </button>
  );
}
