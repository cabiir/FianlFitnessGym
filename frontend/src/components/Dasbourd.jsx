import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { useUser } from "../contexts/UserContext";

function Dash() {
  const { user, selectedPrograms, updateProgramProgress, removeProgram } = useUser();
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [showRemoveConfirm, setShowRemoveConfirm] = useState(null);

  // Initialize user data
  const [userData, setUserData] = useState({
    name: user?.name || "Guest User",
    membership: user?.membership || "Free Plan",
    joinDate: user?.joinDate || new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Update user data when context changes
  useEffect(() => {
    if (user) {
      setUserData({
        name: user.name || "Guest User",
        membership: user.membership || "Free Plan",
        joinDate: user.joinDate || new Date().toISOString().split("T")[0],
      });
    }
  }, [user]);

  // Handle program removal
  const handleRemoveProgram = (programId) => {
    removeProgram(programId);
    setShowRemoveConfirm(null);
  };

  // User stats data - now based on actual selected programs
  const userStats = [
    {
      label: "Active Programs",
      value: selectedPrograms.length,
      change: selectedPrograms.length > 0 ? "+" + selectedPrograms.length : "0",
      icon: "📋",
    },
    {
      label: "Total Progress",
      value: selectedPrograms.length > 0 
        ? Math.round(selectedPrograms.reduce((sum, p) => sum + p.progress, 0) / selectedPrograms.length) + "%"
        : "0%",
      change: selectedPrograms.length > 0 ? "+" + Math.round(selectedPrograms.reduce((sum, p) => sum + p.progress, 0) / selectedPrograms.length) + "%" : "0%",
      icon: "📊",
    },
    {
      label: "Workouts Completed",
      value: selectedPrograms.reduce((total, plan) => total + Math.floor((plan.progress / 100) * 20), 0),
      change: "+" + selectedPrograms.reduce((total, plan) => total + Math.floor((plan.progress / 100) * 20), 0),
      icon: "💪",
    },
    {
      label: "Calories Burned",
      value: Math.floor(selectedPrograms.reduce((total, plan) => total + (plan.progress / 100) * 5000, 0)).toLocaleString(),
      change: "+" + Math.floor(selectedPrograms.reduce((total, plan) => total + (plan.progress / 100) * 5000, 0)).toLocaleString(),
      icon: "🔥",
    },
  ];

  // Recent workouts - using selected programs
  const recentPrograms = selectedPrograms.slice(0, 4);

  // Goals based on actual programs
  const goals = [
    {
      name: "Complete First Program",
      progress: selectedPrograms.length > 0 
        ? Math.min(100, selectedPrograms.reduce((max, plan) => Math.max(max, plan.progress), 0))
        : 0,
      target: "By Dec 1, 2025",
    },
    {
      name: "Consistent Training",
      progress: selectedPrograms.length > 0
        ? Math.floor(selectedPrograms.reduce((total, plan) => total + plan.progress, 0) / selectedPrograms.length)
        : 0,
      target: "Ongoing",
    },
    {
      name: "Try Different Programs",
      progress: Math.min(100, selectedPrograms.length * 25),
      target: "By Jan 1, 2026",
    },
  ];

  // Update progress
  const handleProgressUpdate = (programId, newProgress) => {
    updateProgramProgress(programId, newProgress);
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50">
      <Header />

      {/* Remove Confirmation Modal */}
      {showRemoveConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md mx-4">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Remove Program</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to remove this program? Your progress will be lost.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowRemoveConfirm(null)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleRemoveProgram(showRemoveConfirm)}
                className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Dashboard */}
      <div className={`pt-32 pb-16 px-4 transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}>
        <div className="max-w-6xl mx-auto">
          {/* Welcome */}
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              Welcome back, {userData.name}!
            </h1>
            <p className="text-gray-600">
              {selectedPrograms.length > 0 
                ? `You have ${selectedPrograms.length} active program${selectedPrograms.length !== 1 ? 's' : ''}`
                : "Get started by selecting a fitness program!"}
            </p>
          </div>

          {/* Tabs */}
          <div className="flex overflow-x-auto mb-8 border-b border-gray-200 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            {["overview"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 font-medium transition-all duration-300 whitespace-nowrap ${
                  activeTab === tab
                    ? "text-primaryDarkGreen border-b-2 border-primaryDarkGreen"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {userStats.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg transform transition-transform hover:-translate-y-1 duration-300 animate-fade-in"
                style={{ animationDelay: `${0.2 + index * 0.1}s` }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="text-2xl">{stat.icon}</div>
                  <span className="text-sm font-semibold text-green-500 bg-green-100 px-2 py-1 rounded-full">
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-1">
                  {stat.value}
                </h3>
                <p className="text-gray-600 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Current Plans */}
            <div className="lg:col-span-2 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100">
                  <h2 className="text-xl font-bold text-gray-800">
                    Your Current Programs
                  </h2>
                </div>
                <div className="p-6">
                  {selectedPrograms.length > 0 ? (
                    selectedPrograms.map((program, index) => (
                      <div
                        key={program.id}
                        className={`mb-6 pb-6 ${index < selectedPrograms.length - 1 ? "border-b border-gray-100" : ""}`}
                      >
                        <div className="flex items-start mb-4">
                          <img 
                            src={program.image} 
                            alt={program.title}
                            className="w-16 h-16 rounded-lg object-cover mr-4"
                          />
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <h3 className="text-lg font-semibold text-gray-800">
                                {program.title}
                              </h3>
                              <div className="flex items-center">
                                <span className="text-sm text-gray-500 capitalize bg-gray-100 px-2 py-1 rounded mr-2">
                                  {program.category}
                                </span>
                                <button
                                  onClick={() => setShowRemoveConfirm(program.id)}
                                  className="text-gray-400 hover:text-red-500 transition-colors p-1"
                                  aria-label="Remove program"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                  </svg>
                                </button>
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{program.description}</p>
                            <p className="text-sm text-gray-500 mt-1">Duration: {program.duration}</p>
                          </div>
                        </div>

                        <div className="mb-4">
                          <div className="flex justify-between text-sm text-gray-600 mb-1">
                            <span>Progress</span>
                            <span>{program.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                              className="bg-primaryDarkGreen h-2.5 rounded-full transition-all duration-1000"
                              style={{ width: `${program.progress}%` }}
                            ></div>
                          </div>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={program.progress}
                            onChange={(e) => handleProgressUpdate(program.id, parseInt(e.target.value))}
                            className="w-full mt-2"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-500">Start Date</p>
                            <p className="text-gray-800 font-medium">
                              {formatDate(program.startDate)}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500">Workouts</p>
                            <p className="text-gray-800 font-medium">
                              {program.workouts}
                            </p>
                          </div>
                        </div>

<Link to="/trainers">                        <button className="mt-4 w-full py-2 bg-primaryDarkGreen text-white rounded-xl font-medium transition-all duration-300 transform hover:scale-105">
                          Continue Program
                        </button></Link>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <div className="text-5xl mb-4">📋</div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        No active programs
                      </h3>
                      <p className="text-gray-600 mb-4">
                        You haven't selected any workout programs yet.
                      </p>
                      <Link
                        to="/trainers"
                        className="inline-block py-2 px-6 bg-primaryDarkGreen text-white rounded-xl font-medium transition-all duration-300 transform hover:scale-105"
                      >
                        Browse Programs
                      </Link>
                    </div>
                  )}

                  {selectedPrograms.length > 0 && (
                    <Link
                      to="/trainers"
                      className="block w-full py-3 border-2 border-dashed border-gray-300 text-gray-500 rounded-xl text-center hover:border-primaryDarkGreen hover:text-primaryDarkGreen transition-all duration-300"
                    >
                      + Browse More Programs
                    </Link>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Profile */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden animate-fade-in" style={{ animationDelay: "0.4s" }}>
                <div className="p-6 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-primaryDarkGreen to-primaryDarkGreen2 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                    {userData?.name ? userData.name.charAt(0) : "?"}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-1">
                    {userData.name}
                  </h3>
                  <p className="text-primaryDarkGreen font-medium mb-4">
                    {userData.membership}
                  </p>

                  <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                    <div>
                      <p className="text-gray-500">Member since</p>
                      <p className="text-gray-800 font-medium">
                        {formatDate(userData.joinDate)}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Programs</p>
                      <p className="text-gray-800 font-medium">
                        {selectedPrograms.length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Programs */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden animate-fade-in" style={{ animationDelay: "0.5s" }}>
                <div className="px-6 py-4 border-b border-gray-100">
                  <h2 className="text-xl font-bold text-gray-800">
                    Your Programs
                  </h2>
                </div>
                <div className="p-6">
                  {recentPrograms.length > 0 ? (
                    recentPrograms.map((program) => (
                      <div key={program.id} className="flex items-center py-3 border-b border-gray-100 last:border-b-0">
                        <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                          <img 
                            src={program.image} 
                            alt={program.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-800 text-sm">
                            {program.title}
                          </h4>
                          <div className="flex justify-between">
                            <p className="text-xs text-gray-500 capitalize">{program.category}</p>
                            <p className="text-xs text-gray-500">{program.progress}%</p>
                          </div>
                        </div>
                        <button
                          onClick={() => setShowRemoveConfirm(program.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors p-1 ml-2"
                          aria-label="Remove program"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-gray-500">No programs yet</p>
                      <Link 
                        to="/trainers"
                        className="text-primaryDarkGreen text-sm hover:underline"
                      >
                        Browse programs
                      </Link>
                    </div>
                  )}
                  <Link
                    to="/trainers"
                    className="block w-full mt-4 py-2 text-primaryDarkGreen font-medium rounded-full text-center hover:bg-blue-50 transition-all duration-300"
                  >
                    Browse More Programs →
                  </Link>
                </div>
              </div>

              {/* Goals */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden animate-fade-in" style={{ animationDelay: "0.6s" }}>
                <div className="px-6 py-4 border-b border-gray-100">
                  <h2 className="text-xl font-bold text-gray-800">Your Goals</h2>
                </div>
                <div className="p-6">
                  {goals.map((goal, index) => (
                    <div key={index} className="mb-4 last:mb-0">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium text-gray-800">{goal.name}</h4>
                        <span className="text-sm text-gray-500">
                          {goal.progress}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div
                          className="bg-primaryDarkGreen h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${goal.progress}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500">
                        Target: {goal.target}
                      </p>
                    </div>
                  ))}
                  <button className="w-full mt-4 py-2 bg-primaryDarkGreen text-white rounded-xl font-medium transition-all duration-300 transform hover:scale-105">
                    Set New Goal
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dash;

