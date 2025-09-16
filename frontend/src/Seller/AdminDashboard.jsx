import React, { useState } from "react";
import { useUser } from "../contexts/UserContext";
import Header from "../components/Header";

function AdminDashboard() {
  const { users } = useUser();
  const [activeTab, setActiveTab] = useState("users");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterMembership, setFilterMembership] = useState("all");

  // Filter users based on search term and membership filter
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMembership = filterMembership === "all" || 
                             (filterMembership === "free" && (!user.membership || user.membership === "Free Plan")) ||
                             (filterMembership === "premium" && user.membership === "Premium Plan");
    
    return matchesSearch && matchesMembership;
  });

  // Statistics
  const totalUsers = users.length;
  const freeUsers = users.filter(user => !user.membership || user.membership === "Free Plan").length;
  const premiumUsers = users.filter(user => user.membership === "Premium Plan").length;
  const activeToday = users.filter(user => {
    const joinDate = new Date(user.joinDate);
    const today = new Date();
    return joinDate.toDateString() === today.toDateString();
  }).length;

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getMembershipBadge = (membership) => {
    switch(membership) {
      case "Premium Plan":
        return <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium">Premium</span>;
      default:
        return <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">Free</span>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50">
      <Header />
      
      <div className="pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              Admin Dashboard
            </h1>
            <p className="text-gray-600">
              Manage users, view statistics, and monitor system activity
            </p>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-xl mr-4">
                  <span className="text-2xl">👥</span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold text-gray-800">{totalUsers}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-xl mr-4">
                  <span className="text-2xl">⭐</span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Premium Users</p>
                  <p className="text-2xl font-bold text-gray-800">{premiumUsers}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center">
                <div className="p-3 bg-gray-100 rounded-xl mr-4">
                  <span className="text-2xl">🔓</span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Free Users</p>
                  <p className="text-2xl font-bold text-gray-800">{freeUsers}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center">
                <div className="p-3 bg-orange-100 rounded-xl mr-4">
                  <span className="text-2xl">📈</span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">New Today</p>
                  <p className="text-2xl font-bold text-gray-800">{activeToday}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex flex-col md:flex-row md:items-center md:justify-between">
              <h2 className="text-xl font-bold text-gray-800 mb-4 md:mb-0">
                Registered Users ({filteredUsers.length})
              </h2>
              
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primaryDarkGreen focus:border-transparent"
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
            </div>

            <div className="overflow-x-auto">
              {filteredUsers.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-5xl mb-4">😢</div>
                  <p className="text-gray-500 text-lg">
                    {searchTerm || filterMembership !== "all" 
                      ? "No users match your search criteria" 
                      : "No users registered yet"}
                  </p>
                </div>
              ) : (
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-6 font-semibold text-gray-600">User</th>
                      <th className="text-left py-3 px-6 font-semibold text-gray-600">Email</th>
                      <th className="text-left py-3 px-6 font-semibold text-gray-600">Membership</th>
                      <th className="text-left py-3 px-6 font-semibold text-gray-600">Join Date</th>
                      <th className="text-left py-3 px-6 font-semibold text-gray-600">Status</th>
                      <th className="text-left py-3 px-6 font-semibold text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-6">
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
                        <td className="py-4 px-6">
                          <p className="text-gray-700">{user.email}</p>
                        </td>
                        <td className="py-4 px-6">
                          {getMembershipBadge(user.membership)}
                        </td>
                        <td className="py-4 px-6">
                          <p className="text-sm text-gray-600">{formatDate(user.joinDate)}</p>
                        </td>
                        <td className="py-4 px-6">
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                            Active
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex space-x-2">
                            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                              <span className="text-lg">👁️</span>
                            </button>
                            <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                              <span className="text-lg">✏️</span>
                            </button>
                            <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                              <span className="text-lg">🗑️</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* Pagination (optional) */}
            {filteredUsers.length > 0 && (
              <div className="px-6 py-4 border-t border-gray-100 flex justify-between items-center">
                <p className="text-sm text-gray-600">
                  Showing {filteredUsers.length} of {users.length} users
                </p>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
                    Previous
                  </button>
                  <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Additional Admin Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full py-3 bg-primaryDarkGreen text-white rounded-xl font-medium hover:bg-primaryDarkGreen2 transition-colors">
                  Send Email to All Users
                </button>
                <button className="w-full py-3 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors">
                  Export User Data
                </button>
                <button className="w-full py-3 bg-gray-500 text-white rounded-xl font-medium hover:bg-gray-600 transition-colors">
                  Generate Report
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">System Status</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Storage</span>
                  <span className="font-semibold">2.5GB / 10GB</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-primaryDarkGreen h-2 rounded-full" style={{width: '25%'}}></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Server Uptime</span>
                  <span className="font-semibold">99.9%</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Active Sessions</span>
                  <span className="font-semibold">{users.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;