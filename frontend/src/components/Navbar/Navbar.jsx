// file: frontend/src/components/Navbar/Navbar.jsx
// This file defines the Navbar component for the application.
// It includes links to different pages of the application, including Home, Search, Compare, Custom Meals, and Macros.
// The Navbar is styled using CSS modules for better organization and maintainability.

import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import classes from "./Navbar.module.css";

export default function Navbar()
{
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const navigate = useNavigate();

	useEffect(() =>
	{
		const token = localStorage.getItem('token');
		setIsLoggedIn(!!token);
	}, []);

	const handleLogout = () =>
	{
		localStorage.removeItem('token');
		setIsLoggedIn(false);
		navigate('/login');
	};

	return (
		<nav className={classes.Navbar}>
			<div className={classes.NameContainer}>
				<img className={classes.image} />
				<h1 className={classes.Titleheader}>NutriByte!!</h1>
			</div>
			<div className={classes.NavLinks}>
				<Link to="/">Home</Link>
				<Link to="/search">Search</Link>
				<Link to="/compare">Compare</Link>
				<Link to="/custom">Custom Meals</Link>
				<Link to="/macros">Macros</Link>
				{isLoggedIn ?
					(
						<>
							<Link to="/dashboard">Dashboard</Link>
							<button onClick={handleLogout} className="text-red-600 hover:text-red-800 ml-4" > Logout </button>
						</>
					)
					:
					(
						<>
							<Link to="/login">Login</Link>
							<Link to="/register">Register</Link>
						</>
					)}
			</div>
		</nav>
	);
}