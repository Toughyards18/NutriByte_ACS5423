// frontend/src/pages/LandingPage/LandingPage.jsx
// This is the landing page of the application.
// It serves as the entry point for users to explore the features of the application.
import React from "react";
import classes from "./LandingPage.module.css";
import Background from "../../components/Background/Background";

const LandingPage = () => {
	return (
		<div className="container mx-auto px-4 py-8 h-screen">
			<header className="text-center mt-8">
				<h1 className="text-4xl font-bold text-green-600">Welcome to NutriByte</h1>
				<p className="mt-4 text-lg text-gray-700"> Your ultimate nutrition tracking solution. Explore food data, compare meals, and create custom meal plans. </p>
			</header>
			<div className="h-full">
				<Background className={classes.background} />
				<section className="mt-10 text-center justify-center items-center">
					<h2 className="text-2xl font-semibold text-gray-800">Features</h2>
					<ul className="mt-4 space-y-2 text-gray-600">
						<li>Search and compare food items.</li>
						<li>Create custom meals with detailed nutrition data.</li>
						<li>Filter food by macronutrients.</li>
					</ul>
				</section>
			</div>
		</div>
	);
};

export default LandingPage;
