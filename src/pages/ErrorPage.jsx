import React from "react";
import { Link, useRouteError } from "react-router";
import { FaExclamationTriangle, FaHome, FaArrowLeft } from "react-icons/fa";

const ErrorPage = () => {
  const error = useRouteError();

  const errorMessage =
    error?.statusText ||
    error?.message ||
    "The page you requested couldn't be found.";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-100 p-6 text-center">
      <div className="max-w-xl mx-auto p-10 bg-base-200 rounded-2xl shadow-2xl border-t-8 border-error">
        <div className="flex items-center justify-center space-x-4 mb-6">
          <FaExclamationTriangle className="text-error text-6xl" />

          <h1 className="text-8xl font-black text-error">
            {error?.status || 404}
          </h1>
        </div>
        <h2 className="text-4xl font-extrabold text-gray-800 dark:text-white mb-4">
          Oops! Page Not Found
        </h2>

        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          It looks like you took a wrong turn. Don't worry, even heroes get lost
          sometimes.
        </p>

        <p className="italic text-sm text-gray-400 mb-10 p-3 bg-base-300 rounded-lg">
          {errorMessage}
        </p>

        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link
            to="/"
            className="btn btn-primary btn-lg shadow-md hover:scale-[1.03] transition-transform"
          >
            <FaHome className="mr-2" /> Take Me Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="btn btn-outline btn-info btn-lg shadow-md"
          >
            <FaArrowLeft className="mr-2" /> Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
