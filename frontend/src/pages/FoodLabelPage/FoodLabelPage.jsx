import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import FoodLabel from '../../components/FoodLabel/FoodLabel';

export default function FoodLabelPage() {
  const { fdcId } = useParams();
  const [food, setFood] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/nutrients/${fdcId}`) // assuming your backend can handle lookup by ?id
      .then((res) => {
        if (Array.isArray(res.data)) setFood(res.data[0]);
        else setFood(res.data);
      })
      .catch((err) => {
        console.error("Failed to load food details:", err.message);
        setFood(null);
      });
  }, [fdcId]);

  return (
    <div className="p-4">
      {food ? <FoodLabel food={food} /> : <p>Loading food label...</p>}
    </div>
  );
}
