import React, { useContext } from "react";

import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { FaSpinner } from "react-icons/fa";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FaSpinner className="text-5xl text-primary animate-spin" />
      </div>
    );
  }
  if (user && user?.email) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location.pathname }} replace />;
};

export default PrivateRoute;
