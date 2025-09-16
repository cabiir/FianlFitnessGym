import { useState, useEffect } from "react";
import Header from "../components/Header";
import { useUser } from "../contexts/UserContext";
import { usePrograms } from "../contexts/ProgramsContext";
import { useNavigate, Link } from "react-router-dom";
import Footer from "../components/Footer";

function Trail() {
  const { addProgram } = useUser() || {};
  const { programs } = usePrograms();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedPrograms, setSelectedPrograms] = useState([]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const categories = ["all", "beginner", "intermediate", "advanced"];

  const filteredPrograms =
    activeCategory === "all"
      ? programs
      : programs.filter((p) => p.category === activeCategory);

  const handleStartTrail = (program) => {
    addProgram?.(program);
    setSelectedPrograms((prev) => [...prev, program.id]);
    alert(`${program.title} has been added to your dashboard!`);
  };

  const handleGoToDashboard = () => navigate("/dashboard");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />

      {/* Hero */}
      <section
        className={`pt-32 px-4 transition-opacity duration-1000 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 animate-fade-in">
            Find Your Fitness Trail
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10 animate-fade-in">
            Discover personalized workout programs for your fitness level and goals.
          </p>

          {selectedPrograms.length > 0 && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-xl mb-6 animate-fade-in">
              <p>
                You've selected {selectedPrograms.length} program(s).{" "}
                <button
                  onClick={handleGoToDashboard}
                  className="font-semibold underline"
                >
                  Go to Dashboard
                </button>
              </p>
            </div>
          )}

          {/* Category filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                  activeCategory === cat
                    ? "bg-primaryDarkGreen text-white"
                    : "bg-white text-gray-800 shadow-md hover:bg-gray-100"
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-10 px-4 pb-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPrograms.map((program, idx) => (
            <div
              key={program.id}
              className="bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-transform hover:-translate-y-2 duration-500 animate-fade-in"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="relative">
                <img
                  src={program.image}
                  alt={program.title}
                  className="w-full h-56 object-cover transform transition-transform duration-700 hover:scale-110"
                />
                
                <div className="absolute top-4 right-4 bg-primaryDarkGreen text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {program.category.charAt(0).toUpperCase() + program.category.slice(1)}
                </div>
                {selectedPrograms.includes(program.id) && (
                  <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Selected ✓
                  </div>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{program.title}</h3>
                <p className="text-gray-600 mb-4">{program.description}</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-gray-500">{program.duration}</span>
                  <span className="text-sm text-gray-500">{program.intensity} Intensity</span>
                </div>
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => handleStartTrail(program)}
                    disabled={selectedPrograms.includes(program.id)}
                    className={`px-5 py-2 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                      selectedPrograms.includes(program.id)
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-primaryDarkGreen text-white"
                    }`}
                  >
                    {selectedPrograms.includes(program.id)
                      ? "Added to Dashboard"
                      : "Start Trail"}
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filteredPrograms.length === 0 && (
            <div className="text-center py-16 animate-fade-in">
              <div className="text-5xl mb-4">😢</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">No programs found</h3>
              <p className="text-gray-600 mb-4">Try another filter or check back later!</p>
            </div>
          )}
        </div>
      </section>

      <Footer />

    </div>
  );
}

export default Trail;