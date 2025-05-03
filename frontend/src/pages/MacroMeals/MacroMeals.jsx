// src/pages/MacroMeals/MacroMeals.jsx
import React, { useState } from 'react';
import axios from 'axios';
import FoodList from '../../components/FoodList/FoodList';
import MacroRangeSlider from '../../components/MacroRangeSlider/MacroRangeSlider ';
import './MacroMeals.module.css';

const MacroMeals = () =>
{
  const [macroRanges, setMacroRanges] = useState({
    protein: { min: 45, max: 55 },
    carbs: { min: 45, max: 55 },
    fat: { min: 17, max: 23 },
  });

  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const APIString = import.meta.env.REACT_APP_PROXY || "http://localhost:5000";

  const handleRangeChange = (macro, field, value) =>
  {
    setMacroRanges((prev) => ({
      ...prev,
      [macro]: {
        ...prev[macro],
        [field]: Number(value),
      },
    }));
  };

  const handleMacroSearch = async () =>
  {
    const buildQueryParams = (macro) =>
    {
      const min = macroRanges[macro].min;
      const max = macroRanges[macro].max;
      const center = (min + max) / 2;
      return {
        [`${macro}Center`]: center,
        [`${macro}TolLow`]: center - min,
        [`${macro}TolHigh`]: max - center,
      };
    };

    const query = new URLSearchParams({
      ...buildQueryParams("protein"),
      ...buildQueryParams("carbs"),
      ...buildQueryParams("fat"),
    }).toString();

    try
    {
      const res = await axios.get(`${APIString}/api/macrosearch?${query}`);
      setResults(res.data);
      setShowResults(true);
    } catch (err)
    {
      console.error("Macro search failed:", err.message);
      setResults([]);
      setShowResults(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <h1 className="text-3xl font-bold text-green-600 mt-4">Food by Macro Meals</h1>
      <p className="mt-2 text-gray-700">Adjust your macronutrient ranges using the sliders.</p>

      <div className="mt-6 w-full max-w-xl space-y-8">
        {['protein', 'carbs', 'fat'].map((macro) => (
          <MacroRangeSlider
            key={macro}
            macro={macro}
            min={macroRanges[macro].min}
            max={macroRanges[macro].max}
            onChange={(macroName, newMin, newMax) =>
            {
              setMacroRanges((prev) => ({
                ...prev,
                [macroName]: { min: newMin, max: newMax },
              }));
            }}
          />
        ))}
      </div>

      <div className="mt-8 w-full max-w-2xl bg-white p-4 rounded shadow flex flex-col items-center">
        <h2 className="text-xl font-semibold text-gray-800">Filtered Food Results</h2>
        <p className="mt-2 text-gray-600">Matching food items will appear below.</p>
        <button
          type="button"
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
          onClick={handleMacroSearch}
        >
          Search with Ranges
        </button>

        {showResults && (
          <div className="mt-6 w-full">
            <FoodList
              foods={results}
              searchString={`P${macroRanges.protein.min}-${macroRanges.protein.max} C${macroRanges.carbs.min}-${macroRanges.carbs.max} F${macroRanges.fat.min}-${macroRanges.fat.max}`}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MacroMeals;
