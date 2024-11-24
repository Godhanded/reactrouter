import React from "react";
import { Link, NavLink } from "react-router-dom";
import AvatarUrl from "../Assets/images/avatar-icon.png";

const Header = () => {
	return (
		<header>
			<NavLink className="site-logo" to=".">
				#VanLife
			</NavLink>
			<nav>
				<NavLink
					to="host"
					className={({ isActive }) => (isActive ? "my-link" : "")}
				>
					Host
				</NavLink>
				<NavLink
					to="about"
					className={({ isActive }) => (isActive ? "my-link" : "")}
				>
					About
				</NavLink>
				<NavLink
					to="/vans"
					className={({ isActive }) => (isActive ? "my-link" : "")}
				>
					Vans
				</NavLink>
				<Link to="login" className="login-link">
					<img src={AvatarUrl} alt="Avatar" className="login-icon" />
				</Link>
				<button
					onClick={() => {
						localStorage.removeItem("loggedIn");
					}}
				>
					X
				</button>
			</nav>
		</header>
	);
};

export default Header;
