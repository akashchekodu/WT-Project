// ProtectedRouteWrapper.js
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRouteWrapper = ({ children }) => {
  const isAuthenticated = !!Cookies.get("jwt");
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRouteWrapper;
