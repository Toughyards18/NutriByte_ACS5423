// file: frontend/src/pages/FoodLabelPage/FoodLabelPage.jsx
// This page fetches and displays detailed nutritional information about a food item using its FDC ID.
//
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FoodLabel from '../../components/FoodLabel/FoodLabel';
import Fetching from '../../components/Fetching/Fetching';
import { fetchFoodById } from '../../logic/apiManager'; // Importing the API function to fetch food data



const loadFoodWithCache = async (fdcId) =>
{
  const cacheKey = `food-${fdcId}`;
  const cached = sessionStorage.getItem(cacheKey);

  if (cached)
  {
    console.log("Loaded food from cache:", cacheKey);
    return JSON.parse(cached);
  }

  const { data, error } = await fetchFoodById(fdcId);
  if (error)
  {
    console.error("API error:", error);
    return null;
  }

  const food = Array.isArray(data) ? data[0] : data;
  if (food)
  {
    sessionStorage.setItem(cacheKey, JSON.stringify(food));
  }

  return food ?? null;
};





export default function FoodLabelPage()
{
  const { fdcId } = useParams();
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() =>
  {
    if (!fdcId) return;

    setLoading(true);

    loadFoodWithCache(fdcId).then((fetchedFood) =>
    {
      setFood(fetchedFood);
      setLoading(false);
    });
  }, [fdcId]);

  if (loading) return <div> <Fetching /> </div>;

  // if (loading) return <p className="text-center">Getting Nutrient data...</p>;
  return (
    <div className="p-4">
      {food ? <FoodLabel food={food} /> : <p className="text-center">No food found.</p>}
    </div>
  );
}

