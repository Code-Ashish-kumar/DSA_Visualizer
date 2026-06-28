import { Link } from "react-router-dom"
import algo from "../data/algocategory"
import AlgorithmCard from "../components/core/HomePage/AlgoCard"
import Footer from "../components/common/Footer"

export default function Home() {
  return (
    <div>
        {/* Hero Section */}
        <section className="relative min-h-fit py-12 bg-slate-50 flex flex-col items-center justify-center overflow-hidden">

        {/* Background Blur */}
        <div className="absolute left-20 top-20 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl" />
        <div className="absolute right-20 bottom-20 h-72 w-72 rounded-full bg-sky-300/20 blur-3xl" />

        {/* Badge */}
        <div className="mb-6 rounded-full border border-cyan-200 bg-cyan-50 px-2 py-2 text-sm text-cyan-600">
            ⚡ Interactive Algorithm Learning
        </div>

        {/* Heading */}
        <h1 className="text-center text-5xl md:text-7xl font-extrabold leading-none">
            Master
            <br />

            <span className="bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Data Structures
            </span>

            <br />
            & Algorithms
        </h1>

        {/* Description */}
        <p className="mt-8 max-w-2xl text-center text-sm md:text-xl text-gray-500">
            Visualize, understand, and master complex algorithms through
            interactive step-by-step animations and comprehensive explanations.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex gap-4 text-sm md:text-lg">
            <Link to="/algorithms" className="rounded-xl bg-cyan-500 px-4 py-2 md:px-8 md:py-4 text-white shadow-md hover:bg-cyan-600">
            ▶ Start Visualizing
            </Link>

            <Link to="/about" className="rounded-xl bg-white px-4 py-2 md:px-8 md:py-4 shadow-sm hover:bg-gray-100">
            Learn More →
            </Link>
        </div>

        {/* Chips */}
        <div className="mt-12 flex flex-wrap justify-center gap-3">
            {[
            "Step-by-step animations",
            "Interactive controls",
            "Code explanations",
            "Multiple algorithms",
            "Responsive design",
            ].map((item) => (
            <span
                key={item}
                className="rounded-full bg-white px-4 py-2 text-xs md:text-sm text-gray-500 shadow"
            >
                {item}
            </span>
            ))}
        </div>

        {/* Floating Code Card
        <div className="absolute left-8 bottom-20">
            <div className="rounded-xl bg-slate-900 p-5 shadow-2xl">
            <pre className="text-sm">
                <code>
    {`function quickSort() {
    // Visualize step by step
    return sorted;
    }`}
                </code>
            </pre>
            </div>
        </div> */}

        </section>

        {/* Features Section */}
        <section className="my-20 flex flex-col items-center gap-6">
            <h2 className="text-2xl md:text-4xl font-extrabold text-shadow-xs uppercase">
                Explore Algorithm Categories
            </h2>

            <p className="max-w-4xl text-sm md:text-lg text-center text-gray-500 mb-10">
                Choose a category to dive into interactive visualizations and master the concepts with ease.
                Each section offers a variety of algorithms, from basic to advanced, all designed to enhance your learning experience.
            </p>

            <div className="max-w-11/12 grid gap-8 md:grid-cols-2 lg:max-w-10/12">
                {algo.map((item, index) => (
                    <AlgorithmCard key={index} algo={item} />
                ))}
            </div>
        </section>

        {/* Footer */}
        <Footer />
    </div>  
  );
}