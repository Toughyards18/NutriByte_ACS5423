// src/home/App.jsx
// This is the main entry point of the application.
// It sets up the routing for the application using React Router.
// It imports the necessary components and pages, including the Navbar and Footer.
// It defines the routes for the application, including the landing page, search page, compare page, custom meals page, and macro meals page.

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

import LandingPage from "../pages/LandingPage/LandingPage";
import SearchFood from "../pages/SearchFood/SearchFood";
import CompareFood from "../pages/CompareFood/CompareFood";
import CustomMeals from "../pages/CustomMeals/CustomMeals";
import MacroMeals from "../pages/MacroMeals/MacroMeals";
import FoodLabelPage from "../pages/FoodLabelPage/FoodLabelPage";

function App() {
	return (
		<Router>
			<Navbar />
			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="/search" element={<SearchFood />} />
				<Route path="/compare" element={<CompareFood />} />
				<Route path="/custom" element={<CustomMeals />} />
				<Route path="/macros" element={<MacroMeals />} />
				<Route path="/label/:fdcId" element={<FoodLabelPage />} />
			</Routes>
			<Footer />
		</Router>
	);
}

export default App;
