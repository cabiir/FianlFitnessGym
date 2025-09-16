import { useState, useEffect } from "react";
import Header from "../components/Header";
import { usePrograms } from "../contexts/ProgramsContext";
import { useNavigate } from "react-router-dom";

function AddYoga() {
  const { programs, addProgram, updateProgram, deleteProgram } = usePrograms();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [filterCategory, setFilterCategory] = useState("all");
  const [imageError, setImageError] = useState("");

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    category: "beginner",
    duration: "",
    intensity: "Gentle",
    image: "",
    description: ""
  });

  // Filter yoga programs only
  const yogaPrograms = programs.filter(program => 
    program.category && ["beginner", "intermediate", "advanced"].includes(program.category)
  );

  // Filter by category
  const filteredPrograms = filterCategory === "all" 
    ? yogaPrograms 
    : yogaPrograms.filter(program => program.category === filterCategory);

  // Function to validate image URL
  const validateImageUrl = (url) => {
    if (!url) return "Image URL is required";
    
    // Basic URL validation
    try {
      new URL(url);
      return "";
    } catch (error) {
      return "Please enter a valid URL";
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Validate image URL when it changes
    if (name === "image") {
      setImageError(validateImageUrl(value));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    const imageValidationError = validateImageUrl(formData.image);
    if (imageValidationError) {
      setImageError(imageValidationError);
      return;
    }

    if (isEditing) {
      // Update existing program
      updateProgram(editingId, formData);
      alert("Yoga program updated successfully!");
    } else {
      // Add new program
      const programWithId = {
        ...formData,
        id: Date.now(),
        type: "yoga"
      };
      addProgram(programWithId);
      alert("Yoga program added successfully!");
    }
    
    // Reset form
    setFormData({
      title: "",
      category: "beginner",
      duration: "",
      intensity: "Gentle",
      image: "",
      description: ""
    });
    setIsEditing(false);
    setEditingId(null);
    setImageError("");
  };

  const handleEdit = (program) => {
    setFormData({
      title: program.title,
      category: program.category,
      duration: program.duration,
      intensity: program.intensity,
      image: program.image,
      description: program.description
    });
    setEditingId(program.id);
    setIsEditing(true);
    setImageError("");
  };

  const handleDelete = (programId) => {
    deleteProgram(programId);
    setShowDeleteConfirm(null);
  };

  const cancelEdit = () => {
    setFormData({
      title: "",
      category: "beginner",
      duration: "",
      intensity: "Gentle",
      image: "",
      description: ""
    });
    setIsEditing(false);
    setEditingId(null);
    setImageError("");
  };

  // Function to handle image error (if image fails to load)
  const handleImageError = (e, program) => {
    console.warn(`Image failed to load for program: ${program.title}`);
    // You could set a default image here if needed
    // e.target.src = getDefaultImage(program.category);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50">
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
                onClick={() => handleDelete(showDeleteConfirm)}
                className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
              >
                Delete Program
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="pt-32 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              Manage Yoga Programs
            </h1>
            <p className="text-gray-600">
              Add, edit, and manage your yoga programs
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form Section */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-800">
                  {isEditing ? "Edit Yoga Program" : "Add New Yoga Program"}
                </h2>
              </div>
              <div className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primaryDarkGreen focus:border-transparent"
                      placeholder="e.g., Morning Yoga Flow"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category *
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primaryDarkGreen focus:border-transparent"
                        required
                      >
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Intensity *
                      </label>
                      <select
                        name="intensity"
                        value={formData.intensity}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primaryDarkGreen focus:border-transparent"
                        required
                      >
                        <option value="Gentle">Gentle</option>
                        <option value="Moderate">Moderate</option>
                        <option value="Challenging">Challenging</option>
                        <option value="High Intensity">High Intensity</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Duration *
                    </label>
                    <input
                      type="text"
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primaryDarkGreen focus:border-transparent"
                      placeholder="e.g., 30 minutes"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Image URL *
                    </label>
                    <input
                      type="url"
                      name="image"
                      value={formData.image}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-primaryDarkGreen focus:border-transparent ${
                        imageError ? "border-red-300" : "border-gray-300"
                      }`}
                      placeholder="https://example.com/image.jpg"
                    />
                    {imageError && (
                      <p className="text-red-500 text-sm mt-1">{imageError}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description *
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      required
                      rows="3"
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primaryDarkGreen focus:border-transparent"
                      placeholder="Describe the yoga program..."
                    />
                  </div>

                  <div className="flex justify-end space-x-4 pt-4">
                    {isEditing && (
                      <button
                        type="button"
                        onClick={cancelEdit}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl font-medium transition-all duration-300 hover:bg-gray-100"
                      >
                        Cancel
                      </button>
                    )}
                    <button
                      type="submit"
                      disabled={!!imageError}
                      className={`px-4 py-2 bg-primaryDarkGreen text-white rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
                        imageError ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      {isEditing ? "Update Program" : "Add Program"}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Programs Table */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex flex-col md:flex-row md:items-center md:justify-between">
                <h2 className="text-xl font-bold text-gray-800 mb-4 md:mb-0">
                  Yoga Programs ({filteredPrograms.length})
                </h2>
                
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primaryDarkGreen focus:border-transparent"
                >
                  <option value="all">All Categories</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
              
              <div className="p-6">
                {filteredPrograms.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="text-5xl mb-4">🧘</div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      No yoga programs yet
                    </h3>
                    <p className="text-gray-600">
                      Add your first yoga program using the form
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 font-semibold text-gray-600">Program</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-600">Category</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-600">Duration</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-600">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredPrograms.map((program) => (
                          <tr key={program.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-4 px-4">
                              <div className="flex items-center">
                                <img 
                                  src={program.image} 
                                  alt={program.title}
                                  className="w-12 h-12 rounded-lg object-cover mr-3"
                                  onError={(e) => handleImageError(e, program)}
                                />
                                <div>
                                  <p className="font-semibold text-gray-800">{program.title}</p>
                                  <p className="text-sm text-gray-500 line-clamp-1">{program.description}</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                program.category === "beginner" ? "bg-blue-100 text-blue-800" :
                                program.category === "intermediate" ? "bg-green-100 text-green-800" :
                                "bg-purple-100 text-purple-800"
                              }`}>
                                {program.category.charAt(0).toUpperCase() + program.category.slice(1)}
                              </span>
                            </td>
                            <td className="py-4 px-4">
                              <p className="text-gray-700">{program.duration}</p>
                            </td>
                            <td className="py-4 px-4">
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => handleEdit(program)}
                                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                  title="Edit Program"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                  </svg>
                                </button>
                                <button
                                  onClick={() => setShowDeleteConfirm(program.id)}
                                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                  title="Delete Program"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                  </svg>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddYoga;