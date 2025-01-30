import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext.jsx"; 

const PrivateRoute = ({ children }) => {
  const { state } = useAuth();

  if (!state.isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

export { PrivateRoute };
