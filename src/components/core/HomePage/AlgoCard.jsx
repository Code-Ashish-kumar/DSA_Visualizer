import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const AlgoCard = ({ algo }) => {
  const Icon = algo.icon;
  return (
    <Link
      key={algo.id}
      to={algo.link}
      className="group rounded-3xl border bg-white p-6 md:p-8 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
      style={{
        borderColor: `${algo.color}30`,
      }}
    >
      {/* Top */}
      <div className="flex items-start justify-between">
        <div
          className="flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-2xl text-white"
          style={{
            backgroundColor: algo.color,
          }}
        >
          <Icon className="text-xl md:text-2xl" />
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs md:text-sm font-semibold
            ${algo.level === "Beginner"
              ? "bg-green-100 text-green-700"
              : algo.level === "Intermediate"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-700"
            }
          `}
        >
          {algo.level}
        </span>
      </div>

      {/* Content */}
      <div className="mt-4 md:mt-6">
        <h3 className="text-lg md:text-2xl font-bold text-slate-800 transition-colors duration-300 group-hover:text-cyan-500">
          {algo.title}
        </h3>

        <p className="mt-2 md:mt-4 text-xs md:text-sm text-gray-500">
          {algo.description}
        </p>
      </div>

      {/* Footer */}
      <div className="mt-6 md:mt-8 flex items-center justify-between">
        <div>
          <p className="text-xs md:text-sm text-gray-400">  
            Available Algorithms
          </p>

          <p className="text-lg md:text-xl font-bold text-slate-700">
            {algo.algo_cnt}
          </p>
        </div>

        <div className="flex items-center gap-2 text-sm md:text-base font-medium text-cyan-500">
          Explore
          <FaArrowRight className="transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
};

export default AlgoCard;