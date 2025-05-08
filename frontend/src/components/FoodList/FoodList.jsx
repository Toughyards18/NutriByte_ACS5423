// src/components/FoodList/FoodList.jsx
// This component fetches and displays a list of foods based on the search string provided.
import React, { useEffect, useState } from 'react';
import styles from './FoodList.module.css';
import { Link } from 'react-router-dom';

const FoodList = ({ foods, searchString }) =>
{
  if (!Array.isArray(foods)) return <p>No matching results found.</p>;


  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Results for “{searchString || '...'}”</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Description</th>
              <th className="px-4 py-2 text-left">Brand</th>
            </tr>
          </thead>
          <tbody>
            {foods.map((food) => (
              <tr className={styles.ListEntry} key={food.fdcId}>
                <td className="px-4 py-2">
                  <Link to={`/label/${food.fdcId}`} className="text-blue-600 underline">
                    {food.fdcId}
                  </Link>
                </td>
                <td className="px-4 py-2">{food.description}</td>
                <td className="px-4 py-2">{food.brandOwner || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};


export default FoodList;
