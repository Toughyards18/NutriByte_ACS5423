// file: frontend/src/components/FoodLabel.jsx
// Displays detailed nutritional information about a food item using its FDC ID.

import React, { useState } from "react";
import styles from "./FoodLabel.module.css";
import { NUTRIENT_LABELS, DAILY_VALUES, NUTRIENT_SORT_ORDER } from "../../assets/constants";
import { createDailyLog } from "../../logic/apiManager";

export default function FoodLabel({ food })
{
    const [showLogPopup, setShowLogPopup] = useState(false);
    const [mealType, setMealType] = useState("Breakfast");
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));
    const [selectedTime, setSelectedTime] = useState("12:00");

    if (!food) return null;




    const { fdcId, description, brandOwner, ingredients, servingSize, servingSizeUnit, nutrients } = food;

    const getFriendlyLabel = (nutrientName) => NUTRIENT_LABELS[nutrientName] || nutrientName;

    const getDailyPercent = (nutrientName, amount) =>
    {
        const dailyValue = DAILY_VALUES[nutrientName];
        if (!dailyValue) return null;
        return Math.round((amount / dailyValue) * 100);
    };

    if (!nutrients || nutrients.length === 0) return <p className="text-center">No nutritional information available.</p>;

    return (
        <div className={styles.foodLabel}>
            <div className="flex justify-between items-center mb-4">
                <h2 className={styles.heading}>
                    {description || fdcId || "Unknown Item"}
                </h2>
                <button
                    onClick={() => setShowLogPopup(true)}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                    Log Item
                </button>
            </div>

            {brandOwner && <p className="text-sm italic mb-2 text-center">{brandOwner}</p>}
            <p className="text-sm mb-2 text-center">
                Serving Size: {servingSize || "N/A"} {servingSizeUnit || ""}
            </p>

            <div className={styles.divider}>
                <p className="font-bold text-center">Amount per serving</p>
                <div className={`${styles.nutrientName} font-bold`}>
                    <span>Calories:</span>
                    <span>
                        {nutrients.find((n) => n.nutrientName === "Energy")?.amount ?? "N/A"} kcal
                    </span>
                </div>
            </div>

            <div className="text-sm">
                {nutrients
                    .filter((n) => NUTRIENT_LABELS[n.nutrientName])
                    .sort((a, b) =>
                    {
                        const orderA = NUTRIENT_SORT_ORDER[a.nutrientName] || 999;
                        const orderB = NUTRIENT_SORT_ORDER[b.nutrientName] || 999;
                        return orderA - orderB;
                    })
                    .map((n) =>
                    {
                        const dailyPercent = getDailyPercent(n.nutrientName, n.amount);
                        return (
                            <div className={styles.nutrientName} key={n.nutrientId}>
                                <span>{getFriendlyLabel(n.nutrientName)}:</span>
                                <span className={styles.nutrientValue}>
                                    {n.amount} {n.nutrientUnit}
                                    {dailyPercent !== null && (
                                        <span className={styles.nutrientPercentage}> ({dailyPercent}% DV)</span>
                                    )}
                                </span>
                            </div>
                        );
                    })}
            </div>

            {ingredients && (
                <div className="mt-3 border-t pt-2 text-xs">
                    <strong>Ingredients:</strong> {ingredients}
                </div>
            )}

            {/* Popup Modal */}
            {showLogPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded shadow-lg w-96">
                        <h3 className="text-xl font-bold mb-4 text-center">Log Item</h3>

                        {/* Meal Buttons */}
                        <div className="grid grid-cols-3 gap-2 mb-4">
                            {["Breakfast", "Snack 1", "Dinner", "Snack 2", "Supper", "Random"].map((meal) => (
                                <button
                                    key={meal}
                                    onClick={() => setMealType(meal)}
                                    className={`py-1 rounded ${mealType === meal ? "bg-blue-600 text-white" : "bg-blue-500 text-white hover:bg-blue-600"}`}
                                >
                                    {meal}
                                </button>
                            ))}
                        </div>

                        {/* Date Picker */}
                        <label className="block mb-2 font-semibold">Date</label>
                        <input
                            type="date"
                            className="border p-2 w-full mb-4"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                        />

                        {/* Time Picker */}
                        <label className="block mb-2 font-semibold">Time</label>
                        <input
                            type="time"
                            className="border p-2 w-full mb-4"
                            value={selectedTime}
                            onChange={(e) => setSelectedTime(e.target.value)}
                        />

                        {/* Buttons */}
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={() => setShowLogPopup(false)}
                                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={async () =>
                                {
                                    const logEntry = {
                                        date: selectedDate,
                                        foods: [{
                                            fdcId: food.fdcId,
                                            description: food.description,
                                            brandOwner: food.brandOwner,
                                            mealType,
                                            time: selectedTime,
                                            servingSize: food.servingSize,
                                            servingSizeUnit: food.servingSizeUnit,
                                            nutrients: food.nutrients
                                        }],
                                        notes: `${mealType} logged manually`
                                    };

                                    const { error } = await createDailyLog(logEntry);
                                    if (!error)
                                    {
                                        alert("Item logged successfully!");
                                        setShowLogPopup(false);
                                    } else
                                    {
                                        alert("Failed to log item.");
                                    }
                                }}
                                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                            >
                                Save Log
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

