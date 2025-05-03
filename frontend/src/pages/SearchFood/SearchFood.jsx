// src/pages/SearchFood/SearchFood.jsx
// This component allows users to search for food items or ingredients.
// It uses a search input field and a button to trigger the search.
// The search results are displayed in a list format using the FoodList component.
// It also handles the API call to fetch the food data based on the search query.
import React, { useState, useEffect } from 'react';
import { searchFoods } from "../../logic/apiManager"; // Importing the API manager
import FoodList from "../../components/FoodList/FoodList"; // Importing the FoodList component to display search results
import { useLoading } from "../../logic/LoadingProvider"; // Update the path as needed
import Fetching from "../../components/Fetching/Fetching"; // Optional if Fetching will show below

import classes from "./SearchFood.module.css";


export default function SearchFood()
{
	const [query, setQuery] = useState("");
	const [results, setResults] = useState([]);
	const { showLoading, hideLoading } = useLoading();

	// Restore last search on page load
	useEffect(() =>
	{
		const lastQuery = sessionStorage.getItem("last-query");
		const lastResults = sessionStorage.getItem(`search-${lastQuery?.toLowerCase()}`);
		if (lastQuery && lastResults)
		{
			setQuery(lastQuery);
			setResults(JSON.parse(lastResults));
		}
	}, []);

	function safeSessionStorageSet(key, value)
	{
		const json = JSON.stringify(value);
		const sizeInKB = new TextEncoder().encode(json).length / 1024;

		if (sizeInKB > 4000)
		{
			console.warn(`SessionStorage save skipped — size ${Math.round(sizeInKB)}KB exceeds safe limit.`);
			return;
		}

		try
		{
			sessionStorage.setItem(key, json);
		} catch (e)
		{
			console.error("Failed to save to sessionStorage:", e);
		}
	}


	const handleSearch = async () =>
	{
		if (!query.trim()) return;

		const cacheKey = `search-${query.toLowerCase()}`;
		const cached = sessionStorage.getItem(cacheKey);

		showLoading();

		try
		{
			if (cached)
			{
				console.log("Loaded from cache:", cacheKey);
				setResults(JSON.parse(cached));
			} else
			{
				const { data, error } = await searchFoods(query);
				if (error)
				{
					console.error("Search error:", error);
				} else
				{
					setResults(data);
					safeSessionStorageSet(cacheKey, data);
				}
			}

			// Save last-used query for auto-restore
			sessionStorage.setItem("last-query", query);
		}
		catch (err)
		{
			console.error("Unexpected error:", err);
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
			<div className={classes.container}>
				<input className={classes.searchInput}
					placeholder="Enter food name or ingredient"
					value={query}
					onChange={(e) => setQuery(e.target.value)} />

				<button className={classes.searchButton} onClick={handleSearch}>
					Search
				</button>
			</div>
			{results?.length > 0 ? (<FoodList foods={results} searchString={query} />) : (<p className="text-center mt-4">Select the search button.</p>)}
		</div>
	);
}

