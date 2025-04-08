// src/pages/MacroMeals/MacroMeals.jsx
// This component allows users to filter food items by macronutrients using sliders for protein, carbs, and fat.
import React, { useState } from 'react';
import axios from 'axios';
import FoodList from '../../components/FoodList/FoodList';
import './MacroMeals.module.css';

const MacroMeals = () => {
  const [macros, setMacros] = useState({ protein: 50, carbs: 50, fat: 20 });
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);


  const handleSliderChange = (e) => {
    const { name, value } = e.target;
    setMacros((prev) => ({ ...prev, [name]: value }));
  };

  const handleMacroSearch = async () => {
    try {
      const { protein, carbs, fat } = macros;
      const res = await axios.get(`http://localhost:5000/api/macrosearch`, {
        params: { protein, carbs, fat }
      });
      setResults(res.data);
      setShowResults(true);
    } catch (err) {
      console.error("Macro search failed:", err.message);
      setResults([]);
      setShowResults(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-green-600">Food by Macro Meals</h1>
      <p className="mt-2 text-gray-700">Adjust the sliders to filter food by macronutrients.</p>
      <div className="mt-6 w-4/5 max-w-lg space-y-6">
        {['protein', 'carbs', 'fat'].map((macro) => (
          <div key={macro} className="flex flex-col">
            <label htmlFor={macro} className="text-gray-800 capitalize">
              {macro}: {macros[macro]}g
            </label>
            <input
              type="range"
              id={macro}
              name={macro}
              min="0"
              max="100"
              value={macros[macro]}
              onChange={handleSliderChange}
              className="mt-2"
            />
          </div>
        ))}
      </div>
      <div className="mt-8 w-full max-w-2xl bg-white p-4 rounded shadow flex flex-col items-center">
        <h2 className="text-xl font-semibold text-gray-800">Filtered Food Results</h2>
        <p className="mt-2 text-gray-600">Food items matching your macronutrient preferences will appear here.</p>
        <button
          type="button"
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
          onClick={handleMacroSearch} >
          Get Food with {macros.protein}g Protein, {macros.carbs}g Carbs, {macros.fat}g Fat
        </button>

        {
          showResults && (
          <div className="mt-6 w-full">
            <FoodList foods={results} searchString={`P${macros.protein} C${macros.carbs} F${macros.fat}`} />
          </div>
          )
        }
      </div>
    </div>
  );
};

export default MacroMeals;
