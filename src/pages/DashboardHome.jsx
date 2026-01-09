import React, { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthContext";
import { API_ENDPOINTS } from "../config/api";
import {
  FiDollarSign,
  FiTool,
  FiCalendar,
  FiStar,
  FiUsers,
  FiClipboard,
  FiTrendingUp,
  FiActivity,
  FiAward,
  FiTarget,
} from "react-icons/fi";

const DashboardHome = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const role = user?.role || "user";

  useEffect(() => {
    if (user?.email) {
      setLoading(true);

      let apiUrl = API_ENDPOINTS.providerStats(user?.email);
      if (role === "admin") apiUrl = API_ENDPOINTS.adminStats;
      if (role === "user") apiUrl = API_ENDPOINTS.userStats(user?.email);

      fetch(apiUrl)
        .then((res) => res.json())
        .then((data) => {
          setStats(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Stats fetch error:", err);
          setStats({});
          setLoading(false);
        });
    }
  }, [user, role]);

  const getWelcomeMessage = () => {
    const hour = new Date().getHours();
    const greeting =
      hour < 12
        ? "Good morning"
        : hour < 18
        ? "Good afternoon"
        : "Good evening";
    return `${greeting}, ${user?.displayName?.split(" ")[0] || "there"}!`;
  };

  const getRoleColor = () => {
    switch (role) {
      case "admin":
        return "from-purple-500 to-indigo-600";
      case "provider":
        return "from-green-500 to-emerald-600";
      default:
        return "from-blue-500 to-cyan-600";
    }
  };

  const getRoleStats = () => {
    switch (role) {
      case "admin":
        return [
          {
            title: "Total Revenue",
            value: `$${stats?.totalRevenue?.toLocaleString() || 0}`,
            icon: FiDollarSign,
            color: "from-emerald-500 to-green-600",
            change: "+12.5%",
            changeType: "positive",
          },
          {
            title: "Total Users",
            value: stats?.userCount?.toLocaleString() || 0,
            icon: FiUsers,
            color: "from-blue-500 to-cyan-600",
            change: "+8.2%",
            changeType: "positive",
          },
          {
            title: "Total Services",
            value: stats?.serviceCount?.toLocaleString() || 0,
            icon: FiTool,
            color: "from-orange-500 to-red-500",
            change: "+15.3%",
            changeType: "positive",
          },
          {
            title: "Total Bookings",
            value: stats?.bookingCount?.toLocaleString() || 0,
            icon: FiCalendar,
            color: "from-purple-500 to-indigo-600",
            change: "+22.1%",
            changeType: "positive",
          },
        ];
      case "provider":
        return [
          {
            title: "My Earnings",
            value: `$${stats?.totalRevenue?.toLocaleString() || 0}`,
            icon: FiDollarSign,
            color: "from-emerald-500 to-green-600",
            change: "+18.5%",
            changeType: "positive",
          },
          {
            title: "My Services",
            value: stats?.serviceCount?.toLocaleString() || 0,
            icon: FiTool,
            color: "from-blue-500 to-cyan-600",
            change: "+2",
            changeType: "positive",
          },
          {
            title: "Service Bookings",
            value: stats?.bookingCount?.toLocaleString() || 0,
            icon: FiCalendar,
            color: "from-purple-500 to-indigo-600",
            change: "+25.7%",
            changeType: "positive",
          },
          {
            title: "Average Rating",
            value: stats?.avgRating?.toFixed(1) || "5.0",
            icon: FiStar,
            color: "from-yellow-500 to-orange-500",
            change: "+0.2",
            changeType: "positive",
          },
        ];
      default: // user
        return [
          {
            title: "My Bookings",
            value: stats?.bookingCount?.toLocaleString() || 0,
            icon: FiCalendar,
            color: "from-blue-500 to-cyan-600",
            change: "+3",
            changeType: "positive",
          },
          {
            title: "Total Spent",
            value: `$${stats?.totalSpent?.toLocaleString() || 0}`,
            icon: FiDollarSign,
            color: "from-emerald-500 to-green-600",
            change: "+$245",
            changeType: "positive",
          },
          {
            title: "Reviews Given",
            value: stats?.reviewCount?.toLocaleString() || 0,
            icon: FiStar,
            color: "from-yellow-500 to-orange-500",
            change: "+2",
            changeType: "positive",
          },
          {
            title: "Active Requests",
            value: stats?.pendingCount?.toLocaleString() || 0,
            icon: FiClipboard,
            color: "from-purple-500 to-indigo-600",
            change: "0",
            changeType: "neutral",
          },
        ];
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">
            Loading your dashboard...
          </p>
        </div>
      </div>
    );
  }

  const roleStats = getRoleStats();

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`bg-gradient-to-r ${getRoleColor()} rounded-3xl p-8 text-white relative overflow-hidden`}
      >
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            {getWelcomeMessage()}
          </h1>
          <p className="text-lg opacity-90 mb-4">
            Welcome to your {role} dashboard. Here's what's happening with your
            account.
          </p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-white/30 rounded-full animate-pulse"></div>
              <span className="text-sm opacity-75">
                {role === "admin" && "Managing platform operations"}
                {role === "provider" && "Growing your service business"}
                {role === "user" && "Discovering trusted services"}
              </span>
            </div>
          </div>
        </div>

        {/* Background Pattern */}
        <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
          <div className="w-full h-full bg-white rounded-full transform translate-x-32 -translate-y-32"></div>
        </div>
        <div className="absolute bottom-0 left-0 w-48 h-48 opacity-10">
          <div className="w-full h-full bg-white rounded-full transform -translate-x-24 translate-y-24"></div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {roleStats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ y: -4 }}
            className="group"
          >
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-slate-700">
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}
                >
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div
                  className={`flex items-center gap-1 text-sm font-medium ${
                    stat.changeType === "positive"
                      ? "text-green-600"
                      : stat.changeType === "negative"
                      ? "text-red-600"
                      : "text-gray-500"
                  }`}
                >
                  <FiTrendingUp className="w-4 h-4" />
                  {stat.change}
                </div>
              </div>

              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">
                {stat.value}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 font-medium">
                {stat.title}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Insights */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="grid lg:grid-cols-2 gap-8"
      >
        {/* Performance Overview */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-lg border border-gray-100 dark:border-slate-700">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
              <FiActivity className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Performance Overview
            </h3>
          </div>

          <div className="space-y-4">
            {role === "admin" && (
              <>
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700 rounded-xl">
                  <span className="text-gray-700 dark:text-gray-300">
                    Platform Growth
                  </span>
                  <span className="font-semibold text-green-600">+15.2%</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700 rounded-xl">
                  <span className="text-gray-700 dark:text-gray-300">
                    User Satisfaction
                  </span>
                  <span className="font-semibold text-green-600">98.5%</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700 rounded-xl">
                  <span className="text-gray-700 dark:text-gray-300">
                    Active Providers
                  </span>
                  <span className="font-semibold text-blue-600">1,247</span>
                </div>
              </>
            )}

            {role === "provider" && (
              <>
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700 rounded-xl">
                  <span className="text-gray-700 dark:text-gray-300">
                    Response Rate
                  </span>
                  <span className="font-semibold text-green-600">95%</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700 rounded-xl">
                  <span className="text-gray-700 dark:text-gray-300">
                    Customer Satisfaction
                  </span>
                  <span className="font-semibold text-green-600">4.8/5</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700 rounded-xl">
                  <span className="text-gray-700 dark:text-gray-300">
                    Repeat Customers
                  </span>
                  <span className="font-semibold text-blue-600">67%</span>
                </div>
              </>
            )}

            {role === "user" && (
              <>
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700 rounded-xl">
                  <span className="text-gray-700 dark:text-gray-300">
                    Favorite Category
                  </span>
                  <span className="font-semibold text-blue-600">
                    House Cleaning
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700 rounded-xl">
                  <span className="text-gray-700 dark:text-gray-300">
                    Savings This Month
                  </span>
                  <span className="font-semibold text-green-600">$127</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-700 rounded-xl">
                  <span className="text-gray-700 dark:text-gray-300">
                    Member Since
                  </span>
                  <span className="font-semibold text-gray-600 dark:text-gray-400">
                    Jan 2024
                  </span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-lg border border-gray-100 dark:border-slate-700">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
              <FiTarget className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Quick Actions
            </h3>
          </div>

          <div className="space-y-3">
            {role === "admin" && (
              <>
                <button className="w-full p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 text-left">
                  <div className="flex items-center gap-3">
                    <FiUsers className="w-5 h-5" />
                    <span className="font-medium">Manage Users</span>
                  </div>
                </button>
                <button className="w-full p-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 text-left">
                  <div className="flex items-center gap-3">
                    <FiActivity className="w-5 h-5" />
                    <span className="font-medium">View Analytics</span>
                  </div>
                </button>
                <button className="w-full p-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-200 text-left">
                  <div className="flex items-center gap-3">
                    <FiTool className="w-5 h-5" />
                    <span className="font-medium">Platform Settings</span>
                  </div>
                </button>
              </>
            )}

            {role === "provider" && (
              <>
                <button className="w-full p-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 text-left">
                  <div className="flex items-center gap-3">
                    <FiTool className="w-5 h-5" />
                    <span className="font-medium">Add New Service</span>
                  </div>
                </button>
                <button className="w-full p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 text-left">
                  <div className="flex items-center gap-3">
                    <FiCalendar className="w-5 h-5" />
                    <span className="font-medium">View Bookings</span>
                  </div>
                </button>
                <button className="w-full p-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-200 text-left">
                  <div className="flex items-center gap-3">
                    <FiAward className="w-5 h-5" />
                    <span className="font-medium">Update Profile</span>
                  </div>
                </button>
              </>
            )}

            {role === "user" && (
              <>
                <button className="w-full p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 text-left">
                  <div className="flex items-center gap-3">
                    <FiTool className="w-5 h-5" />
                    <span className="font-medium">Browse Services</span>
                  </div>
                </button>
                <button className="w-full p-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 text-left">
                  <div className="flex items-center gap-3">
                    <FiCalendar className="w-5 h-5" />
                    <span className="font-medium">My Bookings</span>
                  </div>
                </button>
                <button className="w-full p-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-200 text-left">
                  <div className="flex items-center gap-3">
                    <FiStar className="w-5 h-5" />
                    <span className="font-medium">Leave Reviews</span>
                  </div>
                </button>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardHome;
