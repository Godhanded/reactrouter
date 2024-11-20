import React, { CSSProperties } from "react";
import { NavLink, Outlet } from "react-router-dom";
import "../../Styles/HostNav.css";
const HostLayout = () => {
  const activeStyle: CSSProperties = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "brown",
  };
  return (
    <>
      <nav className="host-nav">
        <NavLink
          to="."
          end
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          Dashboard
        </NavLink>
        <NavLink
          to="income"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          Income
        </NavLink>
        <NavLink
          to="vans"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          Vans
        </NavLink>
        <NavLink
          to="reviews"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          Reviews
        </NavLink>
      </nav>
      <Outlet />
    </>
  );
};

export default HostLayout;
