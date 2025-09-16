import { useState, useEffect } from "react";
import Header from "../components/Header";
import { useUser } from "../contexts/UserContext";
import { usePrograms } from "../contexts/ProgramsContext";
import { useNavigate, Link } from "react-router-dom";
import Footer from "../components/Footer";

function Yoga() {
  const { addProgram } = useUser() || {};
  const { programs, addProgram: addYogaProgram, deleteProgram } = usePrograms();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedPrograms, setSelectedPrograms] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [newProgram, setNewProgram] = useState({
    title: "",
    category: "beginner",
    duration: "",
    intensity: "Gentle",
    image: "",
    description: ""
  });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Filter yoga programs only
  const yogaPrograms = programs.filter(program => 
    program.category && ["beginner", "intermediate", "advanced"].includes(program.category)
  );

  const categories = ["all", "beginner", "intermediate", "advanced"];

  const filteredPrograms =
    activeCategory === "all"
      ? yogaPrograms
      : yogaPrograms.filter((p) => p.category === activeCategory);

  const handleStartYoga = (program) => {
    addProgram?.(program);
    setSelectedPrograms((prev) => [...prev, program.id]);
    alert(`${program.title} has been added to your dashboard!`);
  };

  const handleGoToDashboard = () => navigate("/dashboard");

  const handleAddProgram = (e) => {
    e.preventDefault();
    const programWithId = {
      ...newProgram,
      id: Date.now(), // Generate unique ID
      type: "yoga" // Add type to identify as yoga program
    };
    addYogaProgram(programWithId);
    setNewProgram({
      title: "",
      category: "beginner",
      duration: "",
      intensity: "Gentle",
      image: "",
      description: ""
    });
    setShowAddForm(false);
    alert("Yoga program added successfully!");
  };

  const handleDeleteProgram = (programId) => {
    deleteProgram(programId);
    setShowDeleteConfirm(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProgram(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md mx-4">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Delete Program</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this yoga program? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteProgram(showDeleteConfirm)}
                className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
              >
                Delete Program
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Program Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Add New Yoga Program</h3>
            <form onSubmit={handleAddProgram} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  value={newProgram.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryDarkGreen focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  name="category"
                  value={newProgram.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryDarkGreen focus:border-transparent"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                <input
                  type="text"
                  name="duration"
                  value={newProgram.duration}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryDarkGreen focus:border-transparent"
                  placeholder="e.g., 30 mins"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Intensity</label>
                <select
                  name="intensity"
                  value={newProgram.intensity}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryDarkGreen focus:border-transparent"
                >
                  <option value="Gentle">Gentle</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Challenging">Challenging</option>
                  <option value="High Intensity">High Intensity</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input
                  type="url"
                  name="image"
                  value={newProgram.image}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryDarkGreen focus:border-transparent"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={newProgram.description}
                  onChange={handleInputChange}
                  required
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primaryDarkGreen focus:border-transparent"
                />
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primaryDarkGreen text-white rounded-lg hover:bg-primaryDarkGreen2 transition-colors"
                >
                  Add Program
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Hero */}
      <section
        className={`pt-32 px-4 transition-opacity duration-1000 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 animate-fade-in">
            Yoga Practices
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10 animate-fade-in">
            Discover yoga practices for all levels - from gentle stretching to challenging flows
          </p>

          {/* Add Program Button */}

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
              className="bg-white rounded-3xl shadow-2xl overflow-hidden transform transition-transform hover:-translate-y-2 duration-500 animate-fade-in relative"
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
                  <div className="absolute top-4 left-12 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Selected ✓
                  </div>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{program.title}</h3>
                <p className="text-gray-600 mb-4">{program.description}</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-gray-500">{program.duration}</span>
                  <span className="text-sm text-gray-500">{program.intensity}</span>
                </div>
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => handleStartYoga(program)}
                    disabled={selectedPrograms.includes(program.id)}
                    className={`px-5 py-2 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                      selectedPrograms.includes(program.id)
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-primaryDarkGreen text-white"
                    }`}
                  >
                    {selectedPrograms.includes(program.id)
                      ? "Added to Dashboard"
                      : "Start Practice"}
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filteredPrograms.length === 0 && (
            <div className="text-center py-16 animate-fade-in col-span-full">
              <div className="text-5xl mb-4">🧘</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">No yoga programs found</h3>
              <p className="text-gray-600 mb-4">Try another filter or add a new program!</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Yoga;