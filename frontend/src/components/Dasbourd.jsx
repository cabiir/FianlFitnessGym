import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { useUser } from "../contexts/UserContext";
import SideNav from "./SideNav";

function Dash() {
  const { user, selectedPrograms, updateProgramProgress } = useUser();
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  // Initialize user data from context or use defaults
  const [userData, setUserData] = useState({
    name: user?.name || "Guest User",
    membership: user?.membership || "Free Plan",
    joinDate: user?.joinDate || new Date().toISOString().split("T")[0],
    nextPayment: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString(
      "en-US",
      { month: "short", day: "numeric", year: "numeric" }
    ),
  });

  // Initialize current plans from selected programs
  const [currentPlans, setCurrentPlans] = useState(
    selectedPrograms.map((program) => ({
      ...program,
      progress: program.progress || 0,
      duration: program.duration || "4 weeks",
      startDate: program.startDate || new Date().toISOString().split("T")[0],
      endDate:
        program.endDate ||
        new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      workouts: `${Math.floor((program.progress || 0) / 100 * 20)}/20 completed`,
    }))
  );

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
        nextPayment: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString(
          "en-US",
          { month: "short", day: "numeric", year: "numeric" }
        ),
      });
    }
  }, [user]);

  // Update current plans when selected programs change
  useEffect(() => {
    setCurrentPlans(
      selectedPrograms.map((program) => ({
        ...program,
        progress: program.progress || 0,
        duration: program.duration || "4 weeks",
        startDate: program.startDate || new Date().toISOString().split("T")[0],
        endDate:
          program.endDate ||
          new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        workouts: `${Math.floor((program.progress || 0) / 100 * 20)}/20 completed`,
      }))
    );
  }, [selectedPrograms]);

  // User stats data
  const userStats = [
    {
      label: "Workouts Completed",
      value: currentPlans.reduce(
        (total, plan) => total + Math.floor((plan.progress / 100) * 20),
        0
      ),
      change: "+5%",
      icon: "💪",
    },
    {
      label: "Current Streak",
      value: "7 days",
      change: "+2 days",
      icon: "🔥",
    },
    {
      label: "Hours Trained",
      value: currentPlans
        .reduce((total, plan) => total + (plan.progress / 100) * 10, 0)
        .toFixed(1),
      change: "+12%",
      icon: "⏱️",
    },
    {
      label: "Calories Burned",
      value: Math.floor(
        currentPlans.reduce(
          (total, plan) => total + (plan.progress / 100) * 5000,
          0
        )
      ).toLocaleString(),
      change: "+8%",
      icon: "⚡",
    },
  ];

  // Recent workouts
  const recentWorkouts = currentPlans
    .flatMap((plan) => [
      {
        name: `${plan.title} - Session 1`,
        date: "Today",
        duration: "45 min",
        calories: Math.floor(320 * (plan.progress / 100)),
      },
      {
        name: `${plan.title} - Session 2`,
        date: "Yesterday",
        duration: "35 min",
        calories: Math.floor(280 * (plan.progress / 100)),
      },
    ])
    .slice(0, 4);

  // Goals
  const goals = [
    {
      name: "Complete First Program",
      progress: Math.min(
        100,
        currentPlans.reduce((max, plan) => Math.max(max, plan.progress), 0)
      ),
      target: "By Dec 1, 2025",
    },
    {
      name: "Consistent Training",
      progress: Math.floor(
        currentPlans.reduce((total, plan) => total + plan.progress, 0) /
          Math.max(1, currentPlans.length)
      ),
      target: "Ongoing",
    },
    {
      name: "Try Different Programs",
      progress: Math.min(100, currentPlans.length * 25),
      target: "By Jan 1, 2026",
    },
  ];

  // Update progress
  const handleProgressUpdate = (planId, newProgress) => {
    updateProgramProgress(planId, newProgress);
    setCurrentPlans((prev) =>
      prev.map((plan) =>
        plan.id === planId
          ? {
              ...plan,
              progress: newProgress,
              workouts: `${Math.floor(newProgress / 100 * 20)}/20 completed`,
            }
          : plan
      )
    );
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


      {/* Main Dashboard */}
      <div 
        className={`pt-32 pb-16 px-4 transition-opacity duration-1000 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="max-w-6xl mx-auto">
          {/* Welcome */}
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              Welcome back, {userData.name}!
            </h1>
            <p className="text-gray-600">
              Here's your fitness progress and upcoming plans.
            </p>
          </div>



          {/* Tabs */}
          <div
            className="flex overflow-x-auto mb-8 border-b border-gray-200 animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            {["overview", "plans", "progress", "achievements"].map((tab) => (
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
                    Your Current Plans
                  </h2>
                </div>
                <div className="p-6">
                  {currentPlans.length > 0 ? (
                    currentPlans.map((plan, index) => (
                      <div
                        key={index}
                        className={`mb-6 pb-6 ${
                          index < currentPlans.length - 1
                            ? "border-b border-gray-100"
                            : ""
                        }`}
                      >
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-lg font-semibold text-gray-800">
                            {plan.title}
                          </h3>
                          <span className="text-sm text-gray-500">
                            {plan.duration}
                          </span>
                        </div>

                        <div className="mb-4">
                          <div className="flex justify-between text-sm text-gray-600 mb-1">
                            <span>Progress</span>
                            <span>{plan.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                              className="bg-primaryDarkGreen h-2.5 rounded-full transition-all duration-1000"
                              style={{ width: `${plan.progress}%` }}
                            ></div>
                          </div>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={plan.progress}
                            onChange={(e) =>
                              handleProgressUpdate(plan.id, parseInt(e.target.value))
                            }
                            className="w-full mt-2"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-500">Start Date</p>
                            <p className="text-gray-800 font-medium">
                              {formatDate(plan.startDate)}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-500">Workouts</p>
                            <p className="text-gray-800 font-medium">
                              {plan.workouts}
                            </p>
                          </div>
                        </div>

                        <button className="mt-4 w-full py-2 bg-primaryDarkGreen text-white rounded-xl font-medium transition-all duration-300 transform hover:scale-105">
                          Continue Plan
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <div className="text-5xl mb-4">📋</div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        No active plans
                      </h3>
                      <p className="text-gray-600 mb-4">
                        You haven't selected any workout plans yet.
                      </p>
                      <Link
                        to="/plans"
                        className="inline-block py-2 px-6 bg-primaryDarkGreen text-white rounded-xl font-medium transition-all duration-300 transform hover:scale-105"
                      >
                        Browse Plans
                      </Link>
                    </div>
                  )}

                  {currentPlans.length > 0 && (
                    <Link
                      to="/trail"
                      className="block w-full py-3 border-2 border-dashed border-gray-300 text-gray-500 rounded-xl text-center hover:border-primaryDarkGreen hover:text-primaryDarkGreen transition-all duration-300"
                    >
                      + Browse More Plans
                    </Link>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Profile */}
              <div
                className="bg-white rounded-2xl shadow-lg overflow-hidden animate-fade-in"
                style={{ animationDelay: "0.4s" }}
              >
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
                      <p className="text-gray-500">Next payment</p>
                      <p className="text-gray-800 font-medium">
                        {userData.nextPayment}
                      </p>
                    </div>
                  </div>

                  <button className="w-full py-2 bg-gray-100 text-gray-800 rounded-xl font-medium transition-all duration-300 hover:bg-gray-200">
                    Edit Profile
                  </button>
                </div>
              </div>

              {/* Recent Workouts */}
              <div
                className="bg-white rounded-2xl shadow-lg overflow-hidden animate-fade-in"
                style={{ animationDelay: "0.5s" }}
              >
                <div className="px-6 py-4 border-b border-gray-100">
                  <h2 className="text-xl font-bold text-gray-800">
                    Recent Workouts
                  </h2>
                </div>
                <div className="p-6">
                  {recentWorkouts.length > 0 ? (
                    recentWorkouts.map((workout, index) => (
                      <div
                        key={index}
                        className={`flex justify-between items-center py-3 ${
                          index < recentWorkouts.length - 1
                            ? "border-b border-gray-100"
                            : ""
                        }`}
                      >
                        <div>
                          <h4 className="font-medium text-gray-800">
                            {workout.name}
                          </h4>
                          <p className="text-sm text-gray-500">{workout.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-800">
                            {workout.duration}
                          </p>
                          <p className="text-sm text-gray-500">
                            {workout.calories} cal
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-gray-500">No workouts yet</p>
                    </div>
                  )}
                  <Link
                    to="/trail"
                    className="block w-full mt-4 py-2 text-primaryDarkGreen font-medium rounded-xl text-center hover:bg-blue-50 transition-all duration-300"
                  >
                    View All Activity →
                  </Link>
                </div>
              </div>

              {/* Goals */}
              <div
                className="bg-white rounded-2xl shadow-lg overflow-hidden animate-fade-in"
                style={{ animationDelay: "0.6s" }}
              >
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
