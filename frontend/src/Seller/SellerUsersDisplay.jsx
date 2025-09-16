import { useState } from "react";
import { useUser } from "../contexts/UserContext";
import SideNavSeller from "../Seller/SideNavSeller";

function SellerUsersDisplay() {
  const { users, setUsers } = useUser();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterMembership, setFilterMembership] = useState("all");

  // Filter users based on search term and membership filter
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMembership = filterMembership === "all" || 
                             (filterMembership === "free" && (!user.membership || user.membership === "Free Plan")) ||
                             (filterMembership === "premium" && user.membership === "Premium Plan");
    
    return matchesSearch && matchesMembership;
  });

  // Function to format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Function to handle user deletion
  const handleDeleteUser = (userId) => {
    setUsers(prev => prev.filter(user => user.id !== userId));
    setShowDeleteConfirm(null);
  };

  // Function to get membership badge color
  const getMembershipBadge = (membership) => {
    switch(membership) {
      case "Premium Plan":
        return <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium">Premium</span>;
      default:
        return <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">Free</span>;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Side Navigation */}
      <SideNavSeller />
      
      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          {/* Delete Confirmation Modal */}
          {showDeleteConfirm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-2xl p-6 max-w-md mx-4">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Delete User</h3>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to delete this user? This action cannot be undone.
                </p>
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => setShowDeleteConfirm(null)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleDeleteUser(showDeleteConfirm)}
                    className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
                  >
                    Delete User
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Registered Users</h2>
            <span className="bg-primaryDarkGreen text-white px-3 py-1 rounded-full text-sm">
              {users.length} users
            </span>
          </div>

          {/* Search and Filter */}
          <div className="mb-6 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primaryDarkGreen focus:border-transparent"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-400">🔍</span>
              </div>
            </div>
            
            <select
              value={filterMembership}
              onChange={(e) => setFilterMembership(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primaryDarkGreen focus:border-transparent"
            >
              <option value="all">All Memberships</option>
              <option value="free">Free Plan</option>
              <option value="premium">Premium Plan</option>
            </select>
          </div>
          
          {filteredUsers.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-5xl mb-4">👥</div>
              <p className="text-gray-500 text-lg">
                {searchTerm || filterMembership !== "all" 
                  ? "No users match your search criteria" 
                  : "No users registered yet"}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-600">User</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Email</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Membership</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Join Date</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-br from-primaryDarkGreen to-primaryDarkGreen2 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                            {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800">{user.name || "Unknown"}</p>
                            <p className="text-sm text-gray-500">ID: {user.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <p className="text-gray-700">{user.email}</p>
                      </td>
                      <td className="py-4 px-4">
                        {getMembershipBadge(user.membership)}
                      </td>
                      <td className="py-4 px-4">
                        <p className="text-sm text-gray-600">{formatDate(user.joinDate)}</p>
                      </td>
                      <td className="py-4 px-4">
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                          Active
                        </span>
                      </td>
                      <td className="py-4 px-4">
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Statistics */}
          {users.length > 0 && (
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-xl">
                <p className="text-sm text-blue-600 font-medium">Total Users</p>
                <p className="text-2xl font-bold text-blue-800">{users.length}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-xl">
                <p className="text-sm text-green-600 font-medium">Active Today</p>
                <p className="text-2xl font-bold text-green-800">{
                  users.filter(user => {
                    const joinDate = new Date(user.joinDate);
                    const today = new Date();
                    return joinDate.toDateString() === today.toDateString();
                  }).length
                }</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-xl">
                <p className="text-sm text-purple-600 font-medium">Premium Users</p>
                <p className="text-2xl font-bold text-purple-800">{
                  users.filter(user => user.membership === "Premium Plan").length
                }</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SellerUsersDisplay;