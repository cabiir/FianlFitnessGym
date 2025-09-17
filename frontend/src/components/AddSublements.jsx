import React, { useState } from "react";
import SideNavSeller from "../Seller/SideNavSeller";
import { useSupplements } from "../contexts/SupplementsContext";
import { toast } from "react-hot-toast";

function AddSublements() {
  const { supplements, setSupplements } = useSupplements();

  const [formData, setFormData] = useState({
    id: null,
    name: "",
    price: "",
    category: "",
    rating: "",
    description: "",
    image: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Add or update supplement
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setSupplements(
        supplements.map((supp) =>
          supp.id === formData.id
            ? { ...formData, price: parseFloat(formData.price), rating: parseFloat(formData.rating) }
            : supp
        )
      );
      toast.success(`${formData.name} updated successfully!`);
      setIsEditing(false);
    } else {
      setSupplements([
        ...supplements,
        {
          ...formData,
          id: Date.now(),
          price: parseFloat(formData.price),
          rating: parseFloat(formData.rating) || 0,
        },
      ]);
      toast.success(`${formData.name} added successfully!`);
    }
    setFormData({
      id: null,
      name: "",
      price: "",
      category: "",
      rating: "",
      description: "",
      image: "",
    });
  };

  // Edit
  const handleEdit = (supplement) => {
    setIsEditing(true);
    setFormData(supplement);
    toast(`Editing ${supplement.name}`, { icon: "✏️" });
  };

  // Delete
  const handleDelete = (id) => {
    const supp = supplements.find((s) => s.id === id);
    setSupplements(supplements.filter((supp) => supp.id !== id));
    toast.error(`${supp?.name || "Supplement"} deleted`);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <SideNavSeller />

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-gray-800">
            Manage Supplements
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="bg-white p-6 rounded-xl shadow-md space-y-4 lg:col-span-1"
            >
              <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">
                {isEditing ? "Edit Supplement" : "Add Supplement"}
              </h2>

              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                required
              />

              <input
                type="number"
                name="price"
                placeholder="Price"
                value={formData.price}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                step="0.01"
                required
              />

              <input
                type="text"
                name="category"
                placeholder="Category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="number"
                name="rating"
                placeholder="Rating (0-5)"
                value={formData.rating}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                step="0.1"
              />

              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="text"
                name="image"
                placeholder="Image URL"
                value={formData.image}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
              />

              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                {isEditing ? "Update" : "Add"}
              </button>
            </form>

            {/* Table */}
            <div className="bg-white p-6 rounded-xl shadow-md overflow-x-auto lg:col-span-2">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-100 text-left text-gray-700">
                    <th className="p-3 border-b">Image</th>
                    <th className="p-3 border-b">Name</th>
                    <th className="p-3 border-b">Price</th>
                    <th className="p-3 border-b">Category</th>
                    <th className="p-3 border-b">Rating</th>
                    <th className="p-3 border-b text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {supplements.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center text-gray-500 p-4">
                        No supplements yet.
                      </td>
                    </tr>
                  ) : (
                    supplements.map((supp) => (
                      <tr key={supp.id} className="hover:bg-gray-50">
                        <td className="p-3 border-b">
                          <img
                            src={supp.image || "https://via.placeholder.com/50"}
                            alt={supp.name}
                            className="w-14 h-14 object-cover rounded"
                          />
                        </td>
                        <td className="p-3 border-b">{supp.name}</td>
                        <td className="p-3 border-b">${supp.price.toFixed(2)}</td>
                        <td className="p-3 border-b">{supp.category}</td>
                        <td className="p-3 border-b">{supp.rating || "-"}</td>
                        <td className="p-3 border-b flex gap-2 justify-center">
                          <button
                            onClick={() => handleEdit(supp)}
                            className="px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(supp.id)}
                            className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddSublements;
