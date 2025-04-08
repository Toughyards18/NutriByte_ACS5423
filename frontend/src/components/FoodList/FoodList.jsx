// src/components/FoodList/FoodList.jsx
// This component fetches and displays a list of foods based on the search string provided.
import { useEffect, useState } from 'react';
import styles from './FoodList.module.css';
import { Link } from 'react-router-dom';

const FoodList = ({foods, searchString }) => {

  const [loading, setLoading] = useState(false);
  const [localFoods, setLocalFoods] = useState([]);

  useEffect(() => {
    if (Array.isArray(foods)) {
      setLocalFoods(foods);
    }
  }, [foods]);

  useEffect(() => {
    if (searchString) {
      setLoading(true);
      const delay = setTimeout(() => {
        setLoading(false);
      }, 300); // simulate slight delay
      return () => clearTimeout(delay);
    }
  }, [foods]);

  if (loading) return <p className="text-center">Loading nutrition label...</p>;

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Results for “{searchString || '...' }”</h2>
      <ul className={styles.list}>
        {Array.isArray(foods) && foods.length > 0 ? 
          (
           foods.map((food) => (
            <li key={food.fdcId} className={styles.item}>
              <Link to={`/label/${food.fdcId}`} className="text-blue-600 underline">
                  <strong>{food.fdcId}</strong>
              </Link>: {food.description} ({food.brandOwner})
            </li>))
          ) 
          :
          (
            <p>No matching results found.</p>
          )
        }
      </ul>
    </div>
  );
};

export default FoodList;
