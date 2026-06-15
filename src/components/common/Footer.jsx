import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-4">

          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold">
              <span className="bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                AlgoViz
              </span>
            </h3>

            <p className="mt-4 text-sm text-gray-500">
              Learn Data Structures and Algorithms through interactive
              visualizations, animations, and hands-on exploration.
            </p>
          </div>

          {/* Algorithms */}
          <div>
            <h4 className="mb-4 font-semibold text-slate-800">
              Algorithms
            </h4>

            <ul className="space-y-2 text-gray-500">
              <li>Searching</li>
              <li>Sorting</li>
              <li>Graph Algorithms</li>
              <li>Dynamic Programming</li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="mb-4 font-semibold text-slate-800">
              Resources
            </h4>

            <ul className="space-y-2 text-gray-500">
              <li>Documentation</li>
              <li>Learning Path</li>
              <li>Practice Problems</li>
              <li>FAQs</li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="mb-4 font-semibold text-slate-800">
              Connect
            </h4>

            <div className="flex gap-4 text-xl text-gray-500">
              <a href="#">
                <FaGithub className="hover:text-cyan-500 transition-colors" />
              </a>

              <a href="#">
                <FaLinkedin className="hover:text-cyan-500 transition-colors" />
              </a>

              <a href="#">
                <FaTwitter className="hover:text-cyan-500 transition-colors" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-6 text-sm text-gray-500 md:flex-row">
          <p>
            © {new Date().getFullYear()} AlgoViz. All rights reserved.
          </p>

          <div className="flex gap-6">
            <a href="#" className="hover:text-cyan-500">
              Privacy Policy
            </a>

            <a href="#" className="hover:text-cyan-500">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}