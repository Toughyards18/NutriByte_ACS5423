// src/pages/SearchFood/SearchFood.jsx
// This component allows users to search for food items or ingredients.
// It uses a search input field and a button to trigger the search.
// The search results are displayed in a list format using the FoodList component.
// It also handles the API call to fetch the food data based on the search query.
import React, { useState } from 'react';;
import axios from "axios";
import FoodList from "../../components/FoodList/FoodList";
import { useLoading } from "../../logic/LoadingProvider"; // Update the path as needed
import Fetching from "../../components/Fetching/Fetching"; // Optional if Fetching will show below

import classes from "./SearchFood.module.css";


export default function SearchFood()
{
	const [query, setQuery] = useState("");
	const [results, setResults] = useState([]);
	const { showLoading, hideLoading } = useLoading();

	const APIString = import.meta.env.VITE_API_URL || "http://localhost:5000";


	const handleSearch = async () =>
	{
		try
		{
			showLoading(); // Show loading
			console.log("Searching from:", APIString);
			console.log("Search for:", query);
			const res = await axios.get(APIString + `/api/foods?searchString=${encodeURIComponent(query)}`);
			console.log("Search results:", res.data);
			setResults(res.data);
		} catch (error)
		{
			console.error("Error fetching search results:", error);
		}
		finally
		{
			hideLoading();
		}
	};

	// if (loading) return <Fetching />; // Show loading animation if data is being fetched

	return (
		<div className="p-4 align-center flex flex-col">
			<h1 className={classes.searchHeader}>Search for Food or Ingredient</h1>
			<p className={classes.container}>
				<input className={classes.searchInput} placeholder="Enter food name or ingredient" value={query} onChange={(e) => setQuery(e.target.value)} />

				<button className={classes.searchButton} onClick={handleSearch}>
					Search
				</button>
			</p>
			{/* Display the search results */}


			{results.length === 0 ? <p className="text-center">Select the search button.</p> : <FoodList foods={results} searchString={query} />}
			{/* {results ? <FoodList food={results} searchString={query} /> : <p className="text-center">Searching database...</p>} */}
		</div>
	);
}

