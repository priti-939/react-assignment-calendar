import { Routes, Route, Link, Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ user, redirectPath = "/" }) => {
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
