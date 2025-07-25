import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isLoggedIn } from "./auth";

function ProtectedHostRoute() {
  if (!isLoggedIn()) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}

export default ProtectedHostRoute;
