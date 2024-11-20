import React, { CSSProperties } from "react";
import { NavLink } from "react-router-dom";
import "../Styles/HostNav.css";
const HostNav = () => {
  const activeStyle: CSSProperties = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "brown",
  };
  return (
    <nav className="host-van-detail-nav">
      <NavLink
        to="."
        end
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
      >
        Details
      </NavLink>

      <NavLink
        to="pricing"
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
      >
        Pricing
      </NavLink>

      <NavLink
        to="photos"
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
      >
        Photos
      </NavLink>
    </nav>
  );
};

export default HostNav;
