import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import FoodLabel from '../../components/FoodLabel/FoodLabel';
import Fetching from '../../components/Fetching/Fetching';

export default function FoodLabelPage()
{
  const { fdcId } = useParams();
  const [food, setFood] = useState(null);

  const APIString = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() =>
  {
    axios.get(APIString + `/api/nutrients/${fdcId}`) // assuming your backend can handle lookup by ?id
      .then((res) =>
      {
        if (Array.isArray(res.data)) setFood(res.data[0]);
        else setFood(res.data);
      })
      .catch((err) =>
      {
        console.error("Failed to load food details:", err.message);
        setFood(null);
      });
  }, [fdcId]);

  return (
    <div className="p-4">
      {/* {food ? <FoodLabel food={food} /> : <p><Fetching /></p>} */}
      {food ? <FoodLabel food={food} /> : <p className="text-center">Getting Nutrient data...</p>}
    </div>
  );
}
