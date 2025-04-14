import { Link } from "react-router-dom";
import React from "react";
import classes from "./Navbar.module.css";

export default function Navbar() {
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
			</div>
		</nav>
	);
}
