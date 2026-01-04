import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, useLocation } from "react-router";

const ProviderRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  // 1. Handle the Loading state
  // This is crucial because if the page is refreshed, Firebase and
  // MongoDB take a second to tell us who the user is.
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-bars loading-lg text-primary"></span>
      </div>
    );
  }

  // 2. Check if the user exists and has the correct role
  // We allow 'provider' OR 'admin' to access these routes.
  if (user && (user.role === "provider" || user.role === "admin")) {
    return children;
  }

  // 3. If they are logged in but NOT a provider, send them back to Dashboard
  if (user) {
    return <Navigate to="/dashboard/home" replace />;
  }

  // 4. If they are not logged in at all, send them to Login
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default ProviderRoute;
