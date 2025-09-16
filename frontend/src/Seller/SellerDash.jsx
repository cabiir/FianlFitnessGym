import { useState } from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import SideNavSeller from "./SideNavSeller";
import { usePrograms } from "../contexts/ProgramsContext";
import AddYoga from "../components/AddYoga";

function SellerDash() {
  const { programs, addProgram, updateProgram, deleteProgram } = usePrograms();

  const [isEditing, setIsEditing] = useState(false);
  const [currentProgram, setCurrentProgram] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "beginner",
    duration: "",
    intensity: "Low",
    description: "",
    image: null,
    imagePreview: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files[0]) {
      setFormData((prev) => ({
        ...prev,
        image: files[0],
        imagePreview: URL.createObjectURL(files[0]),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setCurrentProgram(null);
    setFormData({
      title: "",
      category: "beginner",
      duration: "",
      intensity: "Low",
      description: "",
      image: null,
      imagePreview: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create a program data object
    const programData = {
      title: formData.title,
      category: formData.category,
      duration: formData.duration,
      intensity: formData.intensity,
      description: formData.description,
      // For new images, we'll use the preview URL temporarily
      // In a real app, you'd upload the image to a server and store the URL
      image: formData.imagePreview || formData.image
    };
    
    if (isEditing && currentProgram) {
      updateProgram(currentProgram.id, programData);
      alert("Program updated successfully!");
    } else {
      addProgram(programData);
      alert("Program added successfully!");
    }
    cancelEdit();
  };

  const handleEdit = (program) => {
    setIsEditing(true);
    setCurrentProgram(program);
    setFormData({
      title: program.title,
      category: program.category,
      duration: program.duration,
      intensity: program.intensity,
      description: program.description,
      image: null,
      imagePreview: program.image,
    });
  };

  // Function to display image properly
  const displayImage = (program) => {
    // If it's a string (URL), display directly
    if (typeof program.image === 'string') {
      return program.image;
    }
    // If it's a File object, create a URL for it
    else if (program.image instanceof File) {
      return URL.createObjectURL(program.image);
    }
    // Fallback to a placeholder if no image is available
    return "https://via.placeholder.com/300x200?text=No+Image";
  };

  return (
    <>
      <div className="flex">
        {/* Sidebar */}
        <div className="w-60 h-screen sticky top-0">
          <SideNavSeller />
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8 overflow-auto">
          <motion.div
            className="max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl font-bold mb-6">Seller Dashboard</h1>

            {/* Program Form */}
            <form
              onSubmit={handleSubmit}
              className="bg-white p-6 rounded-2xl shadow-md space-y-4"
            >
              <h2 className="text-xl font-semibold">
                {isEditing ? "Edit Program" : "Add New Program"}
              </h2>

              <input
                type="text"
                name="title"
                placeholder="Program Title"
                value={formData.title}
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
                required
              />

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>

              <input
                type="text"
                name="duration"
                placeholder="Duration (e.g., 4 weeks)"
                value={formData.duration}
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
              />

              <select
                name="intensity"
                value={formData.intensity}
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>

              <textarea
                name="description"
                placeholder="Program Description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
                rows="3"
              />

              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                className="w-full"
              />

              {formData.imagePreview && (
                <img
                  src={formData.imagePreview}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-lg mt-2"
                />
              )}

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  {isEditing ? "Update Program" : "Add Program"}
                </button>
                {isEditing && (
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>

            {/* Program List */}
            <div className="mt-10">
              <h2 className="text-2xl font-semibold mb-4">Your Programs</h2>
              {programs.length === 0 ? (
                <p className="text-gray-500">No programs added yet.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {programs.map((program) => (
                    <motion.div
                      key={program.id}
                      className="bg-white rounded-2xl shadow-md p-4 flex flex-col"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <img
                        src={displayImage(program)}
                        alt={program.title}
                        className="w-full h-40 object-cover rounded-lg"
                        onError={(e) => {
                          e.target.src = "https://via.placeholder.com/300x200?text=Image+Error";
                        }}
                      />
                      <h3 className="text-lg font-bold mt-3">{program.title}</h3>
                      <p className="text-sm text-gray-600">{program.description}</p>
                      <p className="text-sm text-gray-500">
                        {program.duration} | {program.intensity} | {program.category}
                      </p>

                      <div className="flex gap-2 mt-3">
                        <button
                          onClick={() => handleEdit(program)}
                          className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteProgram(program.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default SellerDash;