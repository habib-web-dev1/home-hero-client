import React, { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
const googleProvider = new GoogleAuthProvider();
const Register = () => {
  const { createUser, updateUser, setUser } = useContext(AuthContext) || {};
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validatePassword = (password) => {
    if (password.length < 6) {
      return "Password must be at least 6 characters long.";
    }
    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter.";
    }
    if (!/[a-z]/.test(password)) {
      return "Password must contain at least one lowercase letter.";
    }
    return null;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = form.get("name");
    const email = form.get("email");
    const photoURL = form.get("photoURL");
    const password = form.get("password");

    const passwordError = validatePassword(password);
    if (passwordError) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Password",
        text: passwordError,
        confirmButtonColor: "#d33",
      });
      return;
    }

    try {
      const result = await createUser(email, password);
      const user = result.user;
      await updateUser({ displayName: name, photoURL: photoURL });
      const userInfo = { name, email, photoURL };
      await fetch("https://home-hero-server-kappa.vercel.app/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userInfo),
      });
      setUser({ ...user, displayName: name, photoURL: photoURL });
      Swal.fire({
        icon: "success",
        title: "Registration Successful!",
        text: "Welcome to HomeHero. You are now logged in.",
        showConfirmButton: false,
        timer: 500,
      });

      navigate("/");
    } catch (error) {
      console.error("Registration error:", error);
      let errorMessage = "An unknown error occurred during registration.";

      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: errorMessage,
        confirmButtonColor: "#d33",
      });
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const userInfo = {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      };

      await fetch("https://home-hero-server-kappa.vercel.app/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userInfo),
      });
      Swal.fire({
        icon: "success",
        title: "Logged In!",
        text: "You have successfully registered with Google.",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");
    } catch (error) {
      console.error("Google login error:", error);
      Swal.fire({
        icon: "error",
        title: "Google Login Failed",
        text: "Could not complete registration with Google. Please try again.",
        confirmButtonColor: "#d33",
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200 p-4">
      <div className="card w-full max-w-lg bg-base-100 shadow-xl border border-gray-200 dark:border-gray-700">
        <div className="card-body p-8">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-secondary-focus/10 rounded-full flex items-center justify-center">
              <svg
                className="w-12 h-12 text-secondary"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </div>
          </div>

          <h2 className="card-title text-3xl font-bold text-center text-gray-800 dark:text-white mb-2">
            Create Your Account
          </h2>
          <p className="text-center text-gray-500 dark:text-gray-400 mb-8">
            Join HomeHero to book trusted local services.
          </p>

          <form onSubmit={handleRegister}>
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text text-gray-700 dark:text-gray-300">
                  Full Name
                </span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                className="input input-bordered w-full"
                required
              />
            </div>

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

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text text-gray-700 dark:text-gray-300">
                  Photo URL (Optional)
                </span>
              </label>
              <input
                type="text"
                name="photoURL"
                placeholder="https://i.ibb.co/your-photo.jpg"
                className="input input-bordered w-full"
              />
            </div>

            <div className="form-control mb-6">
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
              <label className="label">
                <span className="label-text-alt text-error">
                  Min 6 chars, 1 Uppercase, 1 Lowercase
                </span>
              </label>
            </div>

            <div className="form-control mb-6">
              <button
                type="submit"
                className="btn btn-secondary w-full text-lg font-semibold hover:scale-[1.01] transition-transform"
              >
                Register
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
              Already have an account?
              <Link
                to="/login"
                className="link link-hover text-primary font-semibold hover:underline"
              >
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
