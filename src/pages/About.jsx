import { FaCode, FaBrain, FaLaptopCode } from "react-icons/fa";

export default function About() {
  return (
    <div className="bg-slate-50 min-h-screen">

      {/* Hero Section */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-5xl mx-auto">

          <span className="rounded-full border border-cyan-200 bg-cyan-50 px-4 py-2 text-sm text-cyan-600">
            About Our Platform
          </span>

          <h1 className="mt-8 text-6xl font-extrabold">
            Learn DSA Through
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Interactive Visualizations
            </span>
          </h1>

          <p className="mt-8 text-xl text-gray-500 max-w-3xl mx-auto">
            Our mission is to make Data Structures and Algorithms easy,
            engaging, and intuitive through real-time visualizations and
            interactive learning experiences.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          <div>
            <h2 className="text-4xl font-bold mb-6">
              Why We Built This Platform
            </h2>

            <p className="text-gray-600 leading-relaxed">
              Learning algorithms from textbooks can be difficult because many
              concepts happen behind the scenes. Our platform bridges that gap
              by showing every step of an algorithm visually.
            </p>

            <p className="text-gray-600 leading-relaxed mt-4">
              Whether you're preparing for coding interviews, studying computer
              science, or simply curious about how algorithms work, our goal is
              to make learning easier and more enjoyable.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-cyan-600 mb-4">
              Our Mission
            </h3>

            <p className="text-gray-600">
              To empower students and developers by providing intuitive,
              interactive, and accessible algorithm learning tools.
            </p>
          </div>

        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">

          <h2 className="text-center text-4xl font-bold mb-12">
            What We Offer
          </h2>

          <div className="grid gap-8 md:grid-cols-3">

            <div className="bg-white rounded-2xl p-8 shadow-md">
              <FaCode className="text-cyan-500 text-4xl mb-4" />

              <h3 className="text-xl font-bold mb-3">
                Interactive Algorithms
              </h3>

              <p className="text-gray-500">
                Visualize searching, sorting, and advanced algorithms step by
                step.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-md">
              <FaBrain className="text-cyan-500 text-4xl mb-4" />

              <h3 className="text-xl font-bold mb-3">
                Better Understanding
              </h3>

              <p className="text-gray-500">
                Learn concepts faster through animation and real-time
                interaction.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-md">
              <FaLaptopCode className="text-cyan-500 text-4xl mb-4" />

              <h3 className="text-xl font-bold mb-3">
                Code Integration
              </h3>

              <p className="text-gray-500">
                Understand algorithm logic alongside implementation details.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Developer Section */}
      <section className="max-w-5xl mx-auto px-6 py-20">

        <div className="bg-white rounded-3xl p-10 shadow-lg text-center">

          <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center text-white text-3xl font-bold">
            AK
          </div>

          <h2 className="mt-6 text-3xl font-bold">
            Built By Developers, For Learners
          </h2>

          <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
            This platform was created to simplify algorithm learning through
            visualization and interaction. We believe that seeing an algorithm
            in action is one of the most effective ways to understand it.
          </p>

        </div>

      </section>

      {/* CTA */}
      <section className="py-20 text-center">

        <h2 className="text-4xl font-bold">
          Start Your Learning Journey Today
        </h2>

        <p className="mt-4 text-gray-500">
          Explore algorithms, understand concepts, and become a better problem
          solver.
        </p>

        <button className="mt-8 rounded-xl bg-cyan-500 px-8 py-4 text-white hover:bg-cyan-600 transition">
          Explore Algorithms
        </button>

      </section>

    </div>
  );
}