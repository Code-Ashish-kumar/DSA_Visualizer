import { Link } from "react-router-dom";
import algo from "../data/algocategory";
import { FaArrowRight } from "react-icons/fa";
import AlgoCard from "../components/core/HomePage/AlgoCard";

export default function Algorithms() {
  return (
    <div className="bg-slate-50 min-h-screen">

      {/* ================= HEADER SECTION ================= */}
      <section className="relative overflow-hidden py-12 md:py-20">
        {/* Background Blurs */}
        <div className="absolute left-10 top-10 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl" />
        <div className="absolute right-10 bottom-10 h-72 w-72 rounded-full bg-blue-300/20 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-6 text-center">
          <h1 className="mt-8 text-4xl md:text-6xl font-extrabold">
            Explore
            <span className="bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              {" "}Algorithms
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-sm md:text-lg text-gray-500">
            Choose an algorithm category and begin your learning journey
            through visualizations, explanations, and interactive examples.
          </p>

          {/* Stats */}
          <div className="mt-10 flex flex-wrap justify-center gap-4 md:gap-8">
            <div className="rounded-xl bg-white px-4 py-3 md:px-6 md:py-4 shadow">
              <h3 className="text-xl md:text-2xl font-bold text-cyan-500">
                {algo.length}
              </h3>
              <p className="text-xs md:text-sm text-gray-500">Categories</p>
            </div>

            <div className="rounded-xl bg-white px-4 py-3 md:px-6 md:py-4 shadow">
              <h3 className="text-xl md:text-2xl font-bold text-cyan-500">
                {algo.reduce((acc, item) => acc + item.algo_cnt, 0)}
              </h3>
              <p className="text-xs md:text-sm text-gray-500">Algorithms</p>
            </div>

            <div className="rounded-xl bg-white px-4 py-3 md:px-6 md:py-4 shadow">
              <h3 className="text-xl md:text-2xl font-bold text-cyan-500">
                100%
              </h3>
              <p className="text-xs md:text-sm text-gray-500">Interactive</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ALGORITHM LIST ================= */}
      <section className="mx-auto max-w-7xl px-6 py-10 md:py-16">

        <div className="mb-8 md:mb-14 text-center">
          <h2 className="text-2xl md:text-4xl font-bold">
            Algorithm Categories
          </h2>

          <p className="mt-4 text-sm md:text-base text-gray-500">
            Select a category to explore its algorithms in detail.
          </p>
        </div>

        <div className="grid gap-6 md:gap-8 md:grid-cols-2">
          {algo.map((item, index) => (
            <AlgoCard key={index} algo={item} />
          ))}
        </div>
      </section>

      {/* ================= ENDING SECTION ================= */}
      <section className="mx-auto max-w-5xl px-6 py-12 md:py-24 text-center">
        <div className="rounded-3xl bg-white p-6 md:p-12 shadow-lg">

          <h2 className="text-2xl md:text-4xl font-bold">
            Ready to Master DSA?
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm md:text-base text-gray-500">
            Start exploring algorithms through interactive visualizations,
            detailed explanations, and hands-on learning experiences.
          </p>

          <Link
            to="/"
            className="mt-8 inline-flex items-center rounded-xl bg-cyan-500 px-4 py-2 md:px-8 md:py-4 text-sm md:text-base font-medium text-white transition hover:bg-cyan-600"
          >
            Start Learning
          </Link>
        </div>
      </section>

    </div>
  );
}
