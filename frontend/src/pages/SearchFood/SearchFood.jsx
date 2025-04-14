// src/pages/SearchFood/SearchFood.jsx
// This component allows users to search for food items or ingredients.
// It uses a search input field and a button to trigger the search.
// The search results are displayed in a list format using the FoodList component.
// It also handles the API call to fetch the food data based on the search query.

import { useState } from "react";
import dotenv from "dotenv";
import axios from "axios";
import FoodList from "../../components/FoodList/FoodList";

dotenv.config();

export default function SearchFood() {
	const [query, setQuery] = useState("");
	const [results, setResults] = useState([]);
	const APIString = process.env.proxy || "http://localhost:5000";

	const handleSearch = async () => {
		try {
			console.log("Search for:", query);
			const res = await axios.get(APIString + `/api/foods?searchString=${encodeURIComponent(query)}`);
			console.log("Search results:", res.data);
			setResults(res.data);
		} catch (error) {
			console.error("Error fetching search results:", error);
		}
	};

	return (
		<div className="p-4 align-center flex flex-col">
			<h1 className="text-2xl font-bold">Search for Food or Ingredient</h1>
			<input className="border p-2" placeholder="Enter food name or ingredient" value={query} onChange={(e) => setQuery(e.target.value)} />
			<button className="mt-2 bg-blue-500 text-white p-2 rounded" onClick={handleSearch}>
				Search
			</button>
			{/* Display the search results */}
			<FoodList foods={results} searchString={query} />
		</div>
	);
}
