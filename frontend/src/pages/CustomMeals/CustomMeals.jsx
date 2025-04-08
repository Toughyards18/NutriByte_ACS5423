import React, { useState } from 'react';
import './CustomMeals.module.css';

const CustomMeals = () => {
  const [ingredients, setIngredients] = useState([]);
  const [input, setInput] = useState('');

  const handleAddIngredient = () => {
    if (input.trim()) {
      setIngredients((prev) => [...prev, input.trim()]);
      setInput('');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-green-600">Custom Meals</h1>
      <p className="mt-2 text-gray-700">Input ingredients to create your custom meal.</p>
      <div className="mt-6 w-4/5 max-w-lg">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter ingredient"
          className="w-full p-2 border rounded"
        />
        <button
          onClick={handleAddIngredient}
          className="mt-2 w-full bg-green-600 text-white py-2 rounded"
        >
          Add Ingredient
        </button>
      </div>
      <div className="mt-8 w-full max-w-2xl bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold text-gray-800">Your Ingredients</h2>
        <ul className="mt-4 space-y-2 text-gray-600">
          {ingredients.map((ingredient, index) => (
            <li key={index} className="border-b pb-2">{ingredient}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CustomMeals;


