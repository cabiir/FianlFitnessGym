import { NavLink } from "react-router-dom";

function SideNavSeller() {
  return (
    <div className="flex flex-col w-60 h-screen bg-blue-950 text-white p-6 space-y-4">
      <NavLink 
        to="/seller" 
        className={({ isActive }) => 
          `p-2 rounded-lg hover:bg-gray-700 ${isActive ? "bg-gray-700 font-bold" : ""}`
        }
      >
        Dashboard
      </NavLink>

      <NavLink 
        to="/sellerUserDisplay" 
        className={({ isActive }) => 
          `p-2 rounded-lg hover:bg-gray-700 ${isActive ? "bg-gray-700 font-bold" : ""}`
        }
      >
        Users
      </NavLink>

      <NavLink 
        to="/trainers" 
        className={({ isActive }) => 
          `p-2 rounded-lg hover:bg-gray-700 ${isActive ? "bg-gray-700 font-bold" : ""}`
        }
      >
        Works
      </NavLink>
            <NavLink 
        to="/addyoga" 
        className={({ isActive }) => 
          `p-2 rounded-lg hover:bg-gray-700 ${isActive ? "bg-gray-700 font-bold" : ""}`
        }
      >
        AddYoga
      </NavLink>
    </div>
  );
}

export default SideNavSeller;