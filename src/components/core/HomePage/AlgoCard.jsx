import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const AlgoCard = ({ algo }) => {
  const IconComponent = algo.icon;
  return (
    <div className="group rounded-2xl border border-cyan-100 bg-white p-6 transition-all duration-300 hover:shadow-md shadow-blue-200">
      {/* Top */}
      <div className="flex items-start justify-between">
        <div className={`flex h-12 w-12 items-center justify-center rounded-xl text-white`} style={{ backgroundColor: algo.color }}>
          <IconComponent size={24} />
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-medium
            ${
              algo.level === "Beginner"
                ? "bg-green-100 text-green-700"
                : algo.level === "Intermediate" ?
                "bg-yellow-100 text-yellow-700" :
                "bg-red-100 text-red-700"
            }`}
        >
          {algo.level}
        </span>
      </div>

      {/* Content */}
      <div className="mt-5">
        <h2 className="text-2xl font-bold  group-hover:text-cyan-600">
          {algo.title}
        </h2>

        <p className="mt-4 line-clamp-3 text-gray-500">
          {algo.description}
        </p>

        <p className="mt-4 text-sm font-medium text-gray-400">
          {algo.algo_cnt} algorithms
        </p>
      </div>

      {/* Button */}
      <Link
        to={algo.link}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl font-medium bg-gray-300 transition-all py-3 hover:bg-blue-500 hover:text-white"
      >
        Explore {algo.title.split(" ")[0]}
        <FaArrowRight size={18} />
      </Link>
    </div>
  );
};

export default AlgoCard;