import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import Login from "../Pages/Login";

const AuthGuard = () => {
  const isLoggedIn = false;
  if (!isLoggedIn) {
    return <Navigate to="login" state={{ message: "You must log in first" }} />;
  }
  return <Outlet />;
};

export default AuthGuard;
