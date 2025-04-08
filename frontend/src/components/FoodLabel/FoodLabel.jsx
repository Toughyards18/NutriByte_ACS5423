// src/components/FoodLabel.jsx
// This component fetches and displays detailed nutritional information about a food item using its FDC ID.
// src/components/FoodLabel.jsx
// Displays detailed nutritional information about a food item using its FDC ID.

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './FoodLabel.module.css';

export default function FoodLabel({ food }) {
  if (!food) return null;

  const {
    fdcId,
    description,
    brandOwner,
    ingredients,
    servingSize,
    servingSizeUnit,
  } = food;

  const [nutrients, setNutrients] = useState(food.nutrients || []);
  const [loading, setLoading] = useState(!food.nutrients?.length);

  useEffect(() => {
    if (!nutrients.length && fdcId) {
      axios
        .get(`http://localhost:5000/api/nutrients/${fdcId}`)
        .then((res) => setNutrients(res.data))
        .catch((err) => {
          console.error('Failed to fetch nutrients:', err.message);
          setNutrients([]);
        })
        .finally(() => setLoading(false));
    }
  }, [fdcId, nutrients.length]);

  const getNutrient = (name) => {
    const match = nutrients.find((n) =>
      n.nutrientName.toLowerCase().includes(name.toLowerCase())
    );
    return match ? `${match.amount} ${match.nutrientUnit}` : 'N/A';
  };

  if (loading) return <p>Loading nutrition label...</p>;

  return (
    <div
      className={`w-full max-w-md border border-black p-4 shadow-lg bg-white mb-4 font-sans ${styles.nutritionLabel}`}
    >
      <h2 className="text-2xl font-extrabold border-b-2 border-black pb-1">
        {description || 'Unknown Item'}
      </h2>
      {brandOwner && (
        <p className="text-sm italic mb-2">Brand: {brandOwner}</p>
      )}
      <p className="text-sm mb-2">
        Serving Size: {servingSize || 'N/A'} {servingSizeUnit || ''}
      </p>

      <div className="border-t border-b py-2 mt-2 mb-2">
        <p className="font-bold">Amount per serving</p>
        <div className="flex justify-between">
          <span>Calories</span>
          <span>{getNutrient('Energy')}</span>
        </div>
      </div>

      <div className="text-sm">
        {[
          ['Total Fat', 'Total lipid'],
          ['Saturated Fat', 'saturated'],
          ['Trans Fat', 'trans'],
          ['Cholesterol', 'Cholesterol'],
          ['Sodium', 'Sodium'],
          ['Total Carbohydrate', 'Carbohydrate'],
          ['Dietary Fiber', 'Fiber'],
          ['Total Sugars', 'Sugars'],
          ['Protein', 'Protein'],
          ['Calcium', 'Calcium'],
          ['Iron', 'Iron'],
          ['Vitamin A', 'Vitamin A'],
          ['Vitamin C', 'Vitamin C'],
        ].map(([label, key]) => (
          <div className="flex justify-between" key={key}>
            <span>{label}</span>
            <span>{getNutrient(key)}</span>
          </div>
        ))}
      </div>

      {ingredients && (
        <div className="mt-3 border-t pt-2 text-xs">
          <strong>Ingredients:</strong> {ingredients}
        </div>
      )}
    </div>
  );
}
