import { Link } from "react-router-dom";
import { FaGithub, FaCode, FaChartBar, FaSearch } from "react-icons/fa";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-20 border-t border-slate-200 bg-slate-100">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid md:grid-cols-2 justify-between gap-10 md:gap-30">

          {/* ── Brand ── */}
          <div className="md:col-span-1">
            <Link to="/" className="inline-block">
              <h3 className="text-2xl font-extrabold">
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  DSA Visualizer
                </span>
              </h3>
            </Link>

            <p className="mt-3 text-sm leading-relaxed text-slate-500">
              Master Data Structures &amp; Algorithms through beautiful,
              step-by-step interactive visualizations. Watch every comparison,
              swap, and pointer move in real time.
            </p>

            {/* GitHub */}
            <a
              href="https://github.com/Code-Ashish-kumar/DSA_Visualizer"
              target="_blank"
              className="mt-5 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-cyan-50 hover:text-cyan-600 hover:border-cyan-200 transition-all"
            >
              <FaGithub size={16} />
              View on GitHub
            </a>
          </div>

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
            {/* ── Visualizers ── */}
            <div>
              <h4 className="mb-4 text-sm font-bold tracking-widest uppercase text-slate-400">
                Visualizers
              </h4>
              <ul className="space-y-3">
                {[
                  { label: "Sorting Algorithms",   to: "/algorithms/sorting",  icon: <FaChartBar size={12} className="text-cyan-400" /> },
                  { label: "Searching Algorithms", to: "/algorithms/search",   icon: <FaSearch   size={12} className="text-cyan-400" /> },
                  { label: "All Algorithms",       to: "/algorithms",           icon: <FaCode     size={12} className="text-cyan-400" /> },
                ].map(({ label, to, icon }) => (
                  <li key={label}>
                    <Link
                      to={to}
                      className="flex items-center gap-2 text-sm text-slate-500 hover:text-cyan-500 transition-colors"
                    >
                      {icon}
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>

            </div>

            {/* ── Pages + Searching ── */}
            <div>
              <h4 className="mb-4 text-sm font-bold tracking-widest uppercase text-slate-400">
                Pages
              </h4>
              <ul className="space-y-3 text-sm text-slate-500">
                {[
                  { label: "Home",       to: "/" },
                  { label: "Algorithms", to: "/algorithms" },
                  { label: "About",      to: "/about" },
                ].map(({ label, to }) => (
                  <li key={label}>
                    <Link to={to} className="hover:text-cyan-500 transition-colors">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>

            </div>
          </div>
          

        </div>

        {/* ── Bottom bar ── */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-slate-100 pt-6 text-sm text-slate-400 md:flex-row">
          <p>
            © {year}{" "}
            <span className="font-semibold text-slate-500">DSA Visualizer</span>
            . Built with ❤️ for learners.
          </p>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            Open Source · Free to Use
          </div>
        </div>
      </div>
    </footer>
  );
}