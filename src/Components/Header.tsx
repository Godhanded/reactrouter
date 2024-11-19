import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () =>
{
  return (
    <header>
      <NavLink className="site-logo" to=".">#VanLife</NavLink>
      <nav>
        <NavLink
          to="host"
          className={({ isActive }) => isActive ? "my-link" : ""}

        >Host</NavLink>
        <NavLink to="about"
          className={({ isActive }) => isActive ? "my-link" : ""}

        >About</NavLink>
        <NavLink to="/vans"
          className={({ isActive }) => isActive ? "my-link" : ""}

        >Vans</NavLink>
      </nav>
    </header>
  );
};

export default Header;