import React, { useContext } from "react";
import {
  FaEnvelope,
  FaFacebook,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPhone,
  FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router";
import { AuthContext } from "../context/AuthContext"; // Import AuthContext

const Footer = () => {
  const { user } = useContext(AuthContext); // Get user for role-based links

  return (
    <footer className="bg-emerald-300 border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <figure className="w-20">
                <img src="/logo.png" alt="HomeHero Logo" />
              </figure>
              <span className="text-2xl font-bold text-gray-800">HomeHero</span>
            </div>
            <p className="text-sm text-gray-800 dark:text-gray-400 mb-4">
              Connecting you with trusted local service providers—from expert
              plumbers to professional cleaners—right when you need them.
            </p>
            <div className="flex space-x-4 text-2xl">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="text-gray-600 hover:text-black transition-colors"
              >
                <FaXTwitter />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                <FaFacebook />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="text-gray-600 hover:text-blue-700 transition-colors"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="text-gray-600 hover:text-red-600 transition-colors"
              >
                <FaYoutube />
              </a>
            </div>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="footer-title text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Quick Links
            </h3>
            <div className="flex flex-col space-y-2 text-gray-700 dark:text-gray-400">
              <Link to="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <Link
                to="/services"
                className="hover:text-primary transition-colors"
              >
                All Services
              </Link>

              {/* Logged In User Links */}
              {user && (
                <>
                  <Link
                    to="/dashboard/my-bookings"
                    className="hover:text-primary transition-colors"
                  >
                    My Bookings
                  </Link>

                  {/* Provider/Admin Links */}
                  {(user.role === "provider" || user.role === "admin") && (
                    <>
                      <Link
                        to="/dashboard/my-services"
                        className="hover:text-primary transition-colors"
                      >
                        My Services
                      </Link>
                      <Link
                        to="/dashboard/add-service"
                        className="hover:text-primary transition-colors"
                      >
                        Add Service
                      </Link>
                    </>
                  )}
                </>
              )}
              {!user && (
                <Link
                  to="/login"
                  className="hover:text-primary transition-colors"
                >
                  Login / Register
                </Link>
              )}
            </div>
          </div>

          {/* Customer Care Section */}
          <div>
            <h3 className="footer-title text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Customer Care
            </h3>
            <div className="flex flex-col space-y-2 text-gray-700 dark:text-gray-400">
              <Link to="/faq" className="hover:text-primary transition-colors">
                FAQ
              </Link>
              <Link
                to="/terms"
                className="hover:text-primary transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                to="/privacy"
                className="hover:text-primary transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/contact"
                className="hover:text-primary transition-colors"
              >
                Help Center
              </Link>
            </div>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="footer-title text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Get In Touch
            </h3>
            <div className="flex flex-col space-y-3 text-gray-700 dark:text-gray-400">
              <div className="flex items-start space-x-2">
                <FaMapMarkerAlt className="text-primary mt-1" />
                <p>23 M M Road, Jashore City, 7400</p>
              </div>
              <div className="flex items-center space-x-2">
                <FaPhone className="text-primary" />
                <p>+8801785644125</p>
              </div>
              <div className="flex items-center space-x-2">
                <FaEnvelope className="text-primary" />
                <p>support@homehero.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-gray-300 dark:border-gray-700 bg-emerald-400 py-4">
        <div className="container mx-auto px-4 text-center text-sm text-gray-900 font-medium">
          &copy; {new Date().getFullYear()} HomeHero. All rights reserved.
          Designed for professional home services.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
