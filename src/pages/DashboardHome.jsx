import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  FaDollarSign,
  FaTools,
  FaCalendarCheck,
  FaStar,
  FaUsers,
  FaClipboardList,
} from "react-icons/fa";

const DashboardHome = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const role = user?.role || "user";

  useEffect(() => {
    if (user?.email) {
      setLoading(true);

      let apiUrl = `https://home-hero-server-kappa.vercel.app/provider-stats/${user?.email}`;
      if (role === "admin")
        apiUrl = `https://home-hero-server-kappa.vercel.app/admin-stats`;
      if (role === "user")
        apiUrl = `https://home-hero-server-kappa.vercel.app/user-stats/${user?.email}`;

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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 capitalize">
          {role} Dashboard
        </h2>
        <p className="text-gray-500">Welcome back, {user?.displayName}!</p>
      </div>

      {/* RENDER STATS BASED ON ROLE */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* --- ADMIN STATS --- */}
        {role === "admin" && (
          <>
            <StatCard
              title="Total Revenue"
              val={`$${stats?.totalRevenue || 0}`}
              icon={<FaDollarSign />}
              color="bg-emerald-500"
            />
            <StatCard
              title="Total Users"
              val={stats?.userCount || 0}
              icon={<FaUsers />}
              color="bg-blue-500"
            />
            <StatCard
              title="Total Services"
              val={stats?.serviceCount || 0}
              icon={<FaTools />}
              color="bg-orange-500"
            />
            <StatCard
              title="Total Bookings"
              val={stats?.bookingCount || 0}
              icon={<FaCalendarCheck />}
              color="bg-violet-500"
            />
          </>
        )}

        {/* --- PROVIDER STATS --- */}
        {role === "provider" && (
          <>
            <StatCard
              title="My Earnings"
              val={`$${stats?.totalRevenue || 0}`}
              icon={<FaDollarSign />}
              color="bg-emerald-500"
            />
            <StatCard
              title="My Services"
              val={stats?.serviceCount || 0}
              icon={<FaTools />}
              color="bg-sky-500"
            />
            <StatCard
              title="Service Bookings"
              val={stats?.bookingCount || 0}
              icon={<FaCalendarCheck />}
              color="bg-violet-500"
            />
            <StatCard
              title="Avg Rating"
              val={stats?.avgRating?.toFixed(1) || "0.0"}
              icon={<FaStar />}
              color="bg-amber-500"
            />
          </>
        )}

        {/* --- USER / CUSTOMER STATS --- */}
        {role === "user" && (
          <>
            <StatCard
              title="My Bookings"
              val={stats?.bookingCount || 0}
              icon={<FaCalendarCheck />}
              color="bg-blue-500"
            />
            <StatCard
              title="Total Spent"
              val={`$${stats?.totalSpent || 0}`}
              icon={<FaDollarSign />}
              color="bg-rose-500"
            />
            <StatCard
              title="Reviews Given"
              val={stats?.reviewCount || 0}
              icon={<FaStar />}
              color="bg-amber-500"
            />
            <StatCard
              title="Active Requests"
              val={stats?.pendingCount || 0}
              icon={<FaClipboardList />}
              color="bg-indigo-500"
            />
          </>
        )}
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-xl font-bold mb-4">Quick Insights</h3>
        <p className="text-gray-600">
          {role === "admin" &&
            "Monitor platform growth and user activity across the system."}
          {role === "provider" &&
            "Keep track of your service performance and customer feedback."}
          {role === "user" &&
            "Review your service history and manage your upcoming appointments."}
        </p>
      </div>
    </div>
  );
};

const StatCard = ({ title, val, icon, color }) => (
  <div
    className={`${color} text-white p-6 rounded-2xl shadow-sm flex items-center justify-between transition-transform hover:scale-105 duration-300`}
  >
    <div>
      <p className="text-sm font-medium opacity-90 mb-1">{title}</p>
      <h2 className="text-3xl font-bold">{val}</h2>
    </div>
    <div className="text-4xl opacity-20">{icon}</div>
  </div>
);

export default DashboardHome;
