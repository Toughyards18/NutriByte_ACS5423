// file: frontend/src/pages/FoodLabelPage/FoodLabelPage.jsx
// This page fetches and displays detailed nutritional information about a food item using its FDC ID.
//
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FoodLabel from '../../components/FoodLabel/FoodLabel';
import Fetching from '../../components/Fetching/Fetching';
import { fetchFoodById } from '../../logic/apiManager'; // Importing the API function to fetch food data

export default function FoodLabelPage()
{
  const { fdcId } = useParams();
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() =>
  {
    fetchFoodById(fdcId).then(({ data, error }) =>
    {
      if (error)
      {
        console.error("Failed to fetch food data:", error);
        setFood(null);
      }
      else
      {
        setFood(Array.isArray(data) ? data[0] : data);
      }
      setLoading(false);
    });
  }, [fdcId]);

  if (loading) return <p className="text-center">Getting Nutrient data...</p>;
  return (
    <div className="p-4">
      {food ? <FoodLabel food={food} /> : <p className="text-center">No food found.</p>}
    </div>
  );
}

