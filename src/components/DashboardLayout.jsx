import { NavLink, Outlet, Link } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);
  const role = user?.role || "user";

  const activeClass = ({ isActive }) =>
    `p-2 rounded transition-colors flex items-center gap-2 ${
      isActive ? "bg-primary text-white" : "hover:bg-slate-700 text-gray-300"
    }`;

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white p-5 flex flex-col shadow-xl">
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Home<span className="text-primary">Hero</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-semibold">
            {role} Dashboard
          </p>
        </div>

        <nav className="flex flex-col gap-2 flex-1">
          {/* COMMON FOR ALL LOGGED IN USERS */}
          <p className="text-[10px] uppercase text-slate-500 font-bold ml-2 mt-4">
            Menu
          </p>
          <NavLink to="/dashboard" end className={activeClass}>
            📊 Statistics
          </NavLink>
          <NavLink to="/dashboard/profile" className={activeClass}>
            👤 Profile
          </NavLink>

          {/* CUSTOMER / USER SECTION */}
          {(role === "user" || role === "admin") && (
            <>
              <p className="text-[10px] uppercase text-slate-500 font-bold ml-2 mt-6">
                Customer
              </p>
              <NavLink to="/dashboard/my-bookings" className={activeClass}>
                📅 My Bookings
              </NavLink>
            </>
          )}

          {/* PROVIDER SECTION (Admins can also manage services) */}
          {(role === "provider" || role === "admin") && (
            <>
              <p className="text-[10px] uppercase text-slate-500 font-bold ml-2 mt-6">
                Provider
              </p>
              <NavLink to="/dashboard/add-service" className={activeClass}>
                ➕ Add Service
              </NavLink>
              <NavLink to="/dashboard/my-services" className={activeClass}>
                🛠️ My Services
              </NavLink>
            </>
          )}

          {/* ADMIN ONLY SECTION */}
          {role === "admin" && (
            <>
              <p className="text-[10px] uppercase text-red-500 font-bold ml-2 mt-6">
                Administration
              </p>
              <NavLink to="/dashboard/manage-users" className={activeClass}>
                👥 Manage Users
              </NavLink>
            </>
          )}
        </nav>

        {/* Footer Link to Website */}
        <div className="mt-auto pt-4 border-t border-slate-800">
          <Link
            to="/"
            className="text-sm text-slate-400 hover:text-white flex items-center gap-2 p-2"
          >
            🏠 Back to Home
          </Link>
        </div>
      </aside>

      {/* Content Area */}
      <main className="flex-1 overflow-y-auto">
        {/* Top Navbar Placeholder */}
        <header className="bg-white h-16 shadow-sm flex items-center justify-end px-8">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-700">
              {user?.displayName}
            </span>
            <img
              src={user?.photoURL}
              alt="profile"
              className="w-8 h-8 rounded-full border"
            />
          </div>
        </header>

        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
