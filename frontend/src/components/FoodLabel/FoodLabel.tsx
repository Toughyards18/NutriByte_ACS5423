// src/components/FoodLabel.jsx
// Displays detailed nutritional information about a food item using its FDC ID.
// src/components/FoodLabel.tsx
import React from "react";
import styles from "../FoodLabel/FoodLabel.module.css"; 
import { Food, NUTRIENT_LABELS, DAILY_VALUES, NUTRIENT_SORT_ORDER } from "../../assets/constants";

interface FoodLabelProps {
    food: Food;
}

export default function FoodLabel({ food }: Readonly<FoodLabelProps>) {
    if (!food) return null;

    const {
        fdcId,
        description,
        brandOwner,
        ingredients,
        servingSize,
        servingSizeUnit,
        nutrients,
    } = food;

    const getFriendlyLabel = (nutrientName: string) => {
        return NUTRIENT_LABELS[nutrientName] || nutrientName;
    };

    const getDailyPercent = (nutrientName: string, amount: number) => {
        const dailyValue = DAILY_VALUES[nutrientName as keyof typeof DAILY_VALUES];
        if (!dailyValue) return null;
        return Math.round((amount / dailyValue) * 100);
    };

    if (!nutrients || nutrients.length) return <p className="text-center">No nutritional information available.</p>;

    return (
        <div className={styles.foodLabel}>
            <h2 className={styles.heading}>
                {description || fdcId || "Unknown Item"}
            </h2>

            {brandOwner && (
                <p className="text-sm italic mb-2 text-center">{brandOwner}</p>
            )}
            <p className="text-sm mb-2 text-center">
                Serving Size: {servingSize || "N/A"} {servingSizeUnit || ""}
            </p>

            <div className={styles.divider}>
                <p className="font-bold text-center">Amount per serving</p>
                <div className={`${styles.nutrientName} font-bold`}>
                    <span>Calories:</span>
                    <span>
                        {nutrients.find(n => n.nutrientName === "Energy")?.amount ?? "N/A"} kcal
                    </span>
                </div>
            </div>

            <div className="text-sm">
                {nutrients
                    .filter((n) => NUTRIENT_LABELS[n.nutrientName])
                    .sort((a, b) => {
                        const orderA = NUTRIENT_SORT_ORDER[a.nutrientName as keyof typeof NUTRIENT_SORT_ORDER] || 999;
                        const orderB = NUTRIENT_SORT_ORDER[b.nutrientName as keyof typeof NUTRIENT_SORT_ORDER] || 999;
                        
                        return orderA - orderB;
                    })
                    .map((n) => {
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
        </div>
    );
}

