import React, { useState } from 'react';
import './CompareFood.module.css';

const CompareFood = () => {
  const [food1, setFood1] = useState('');
  const [food2, setFood2] = useState('');
  const [comparisonResult, setComparisonResult] = useState(null);

  const handleCompare = () => {
    // Placeholder for comparison logic
    setComparisonResult({
      food1: { name: food1, calories: 200, protein: 10, carbs: 30, fat: 5 },
      food2: { name: food2, calories: 250, protein: 15, carbs: 20, fat: 10 },
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-green-600">Compare Food</h1>
      <p className="mt-2 text-gray-700">Enter two food items to compare their nutritional values.</p>
      <div className="mt-6 w-4/5 max-w-lg space-y-4">
        <input
          type="text"
          value={food1}
          onChange={(e) => setFood1(e.target.value)}
          placeholder="Enter first food item"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          value={food2}
          onChange={(e) => setFood2(e.target.value)}
          placeholder="Enter second food item"
          className="w-full p-2 border rounded"
        />
        <button
          onClick={handleCompare}
          className="w-full bg-green-600 text-white py-2 rounded"
        >
          Compare
        </button>
      </div>
      {comparisonResult && (
        <div className="mt-8 w-full max-w-2xl bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold text-gray-800">Comparison Results</h2>
          <div className="mt-4 grid grid-cols-2 gap-4 text-gray-600">
            <div>
              <h3 className="font-bold">{comparisonResult.food1.name}</h3>
              <p>Calories: {comparisonResult.food1.calories}</p>
              <p>Protein: {comparisonResult.food1.protein}g</p>
              <p>Carbs: {comparisonResult.food1.carbs}g</p>
              <p>Fat: {comparisonResult.food1.fat}g</p>
            </div>
            <div>
              <h3 className="font-bold">{comparisonResult.food2.name}</h3>
              <p>Calories: {comparisonResult.food2.calories}</p>
              <p>Protein: {comparisonResult.food2.protein}g</p>
              <p>Carbs: {comparisonResult.food2.carbs}g</p>
              <p>Fat: {comparisonResult.food2.fat}g</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompareFood;
