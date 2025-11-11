import React, { useContext } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { CiLight } from "react-icons/ci";
import Swal from "sweetalert2";
const Navbar = () => {
  const { user, logOut } = useContext(AuthContext) || {};
  const LogOut = async () => {
    try {
      await logOut();
      Swal.fire({
        icon: "success",
        title: "Logged Out!",
        text: "You have successfully logged Out.",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch {
      let errorMessage = "An unknown error occurred.";
      Swal.fire({
        icon: "error",
        title: "LogOut Failed",
        text: errorMessage,
        confirmButtonColor: "#d33",
      });
    }
  };
  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-primary font-bold" : "font-medium"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/services"
          className={({ isActive }) =>
            isActive ? "text-primary font-bold" : "font-medium"
          }
        >
          Services
        </NavLink>
      </li>

      {user && (
        <>
          <li>
            <NavLink
              to="/my-services"
              className={({ isActive }) =>
                isActive ? "text-primary font-bold" : "font-medium"
              }
            >
              My Services
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/add-service"
              className={({ isActive }) =>
                isActive ? "text-primary font-bold" : "font-medium"
              }
            >
              Add Service
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/my-bookings"
              className={({ isActive }) =>
                isActive ? "text-primary font-bold" : "font-medium"
              }
            >
              My Bookings
            </NavLink>
          </li>
        </>
      )}
    </>
  );
  return (
    <div>
      <div className="navbar bg-emerald-200 shadow-md sticky top-0 z-50">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navLinks}

              {!user ? (
                <>
                  <li>
                    <NavLink to="/login">Login</NavLink>
                  </li>
                  <li>
                    <NavLink to="/register">Register</NavLink>
                  </li>
                </>
              ) : (
                <li>
                  <button onClick={LogOut}>Logout</button>
                </li>
              )}
            </ul>
          </div>

          <Link to="/" className="flex items-center space-x-2 cursor-pointer">
            <figure className="w-20">
              <img src="./logo.png" alt="" />
            </figure>
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navLinks}</ul>
        </div>

        <div className="navbar-end space-x-2">
          <button className="btn btn-ghost btn-circle" title="Toggle Theme">
            <CiLight />
          </button>

          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className=" rounded-full">
                  <img
                    alt="User Profile"
                    src={`${
                      user
                        ? user.photoURL
                        : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    }`}
                    title={user.displayName || user.email}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li className="p-2 text-sm font-semibold border-b mb-1">
                  {user.displayName || user.email}
                </li>
                <li>
                  <NavLink to="/profile">Profile</NavLink>
                </li>
                <li>
                  <button onClick={LogOut}>Logout</button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="space-x-4">
              <NavLink
                to="/login"
                className="btn btn-ghost hidden md:inline-flex"
              >
                Login
              </NavLink>
              <NavLink to="/register" className="btn btn-primary btn-sm">
                Register
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
