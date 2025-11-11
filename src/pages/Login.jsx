import React, { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { FcGoogle } from "react-icons/fc";
const googleProvider = new GoogleAuthProvider();
const Login = () => {
  const { signIn } = useContext(AuthContext) || {};
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    const password = form.get("password");

    try {
      await signIn(email, password);
      Swal.fire({
        icon: "success",
        title: "Logged In!",
        text: "You have successfully logged in.",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate(location.state ? location.state : "/");
    } catch (error) {
      console.error("Login error:", error);
      let errorMessage = "An unknown error occurred.";
      if (error.code === "auth/invalid-email") {
        errorMessage = "Invalid email address.";
      } else if (
        error.code === "auth/user-not-found" ||
        error.code === "auth/wrong-password" ||
        error.code === "auth/invalid-credential"
      ) {
        errorMessage = "Invalid email or password.";
      } else if (error.code === "auth/too-many-requests") {
        errorMessage =
          "Too many failed login attempts. Please try again later.";
      }
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: errorMessage,
        confirmButtonColor: "#d33",
      });
      form.reset();
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      Swal.fire({
        icon: "success",
        title: "Logged In!",
        text: "You have successfully logged in with Google.",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate(location.state ? location.state : "/");
    } catch (error) {
      console.error("Google login error:", error);
      Swal.fire({
        icon: "error",
        title: "Google Login Failed",
        text: "Could not log in with Google. Please try again.",
        confirmButtonColor: "#d33",
      });
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200 p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl border border-gray-200 dark:border-gray-700">
        <div className="card-body p-8">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-primary-focus/10 rounded-full flex items-center justify-center">
              <svg
                className="w-12 h-12 text-primary"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2.29-10.71l-3.29 3.29c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0l2.58-2.58 2.58 2.58c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41l-3.29-3.29c-.39-.39-1.02-.39-1.41 0zM12 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
              </svg>
            </div>
          </div>

          <h2 className="card-title text-3xl font-bold text-center text-gray-800 dark:text-white mb-2">
            Welcome back
          </h2>
          <p className="text-center text-gray-500 dark:text-gray-400 mb-8">
            Please enter your details to login.
          </p>

          <form onSubmit={handleLogin}>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text text-gray-700 dark:text-gray-300">
                  Email
                </span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="name@example.com"
                className="input input-bordered w-full"
                required
              />
            </div>

            <div className="form-control mb-2">
              <label className="label">
                <span className="label-text text-gray-700 dark:text-gray-300">
                  Password
                </span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  className="input input-bordered w-full pr-10"
                  required
                />
                <span
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>

            <div className="text-right mb-6">
              <Link
                to="/forgot-password"
                className="label-text-alt link link-hover text-primary hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <div className="form-control mb-6">
              <button
                type="submit"
                className="btn btn-primary w-full text-lg font-semibold hover:scale-[1.01] transition-transform"
              >
                Login
              </button>
            </div>
          </form>

          <div className="divider text-gray-400 mb-6">OR</div>

          <div className="space-y-4">
            <button
              onClick={handleGoogleLogin}
              className="btn btn-outline w-full flex items-center justify-center space-x-2 border-gray-300 dark:border-gray-600 hover:border-primary hover:bg-primary-focus/10 dark:hover:bg-primary-focus/20"
            >
              <FcGoogle className="text-xl text-red-500" />
              <span>With Google</span>
            </button>
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-600 dark:text-gray-400">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="link link-hover text-primary font-semibold hover:underline"
              >
                Register now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
