import { useState } from "react";
import { Link } from "react-router-dom";

function SideNav() {
  const [isOpen, setIsOpen] = useState(true); // toggle for mobile

  const navItems = [
    { name: "Add Trail", path: "/dashboard/add-trail" },
    { name: "Plans", path: "/dashboard/plans" },
    { name: "Add Yoga Classes", path: "/dashboard/add-yoga" },
    { name: "Fitness Training", path: "/dashboard/fitness-training" },
    { name: "Wellness Workshops", path: "/dashboard/workshops" },
  ];

  return (
    <>
      {/* Mobile toggle button */}
      <div className="lg:hidden p-4 bg-white shadow-md flex justify-between items-center">
        <span className="text-xl font-bold text-primaryDarkGreen">Dashboard</span>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-primaryDarkGreen focus:outline-none"
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-2xl transform transition-transform duration-500 ease-in-out z-50
          ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:relative`}
      >
        <div className="pt-10 px-6 flex flex-col gap-6">
          <h2 className="text-2xl font-bold text-primaryDarkGreen mb-6">Dashboard</h2>
          {navItems.map((item, idx) => (
            <Link
              key={idx}
              to={item.path}
              className="block px-4 py-3 rounded-2xl shadow-md text-gray-800 font-semibold hover:bg-primaryDarkGreen hover:text-white transform transition duration-300 hover:scale-105"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </aside>
    </>
  );
}

export default SideNav;
