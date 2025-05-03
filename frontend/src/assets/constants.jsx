// File: src/assets/constants.jsx
// This file contains constants and structure templates for the application.

//
// Data Structure Templates
//

// Nutrients to display on the nutrition label
export const NUTRIENTS_TO_DISPLAY = [
    ["Total Fat", "Total lipid"],
    ["Saturated Fat", "saturated"],
    ["Trans Fat", "trans"],
    ["Cholesterol", "Cholesterol"],
    ["Sodium", "Sodium"],
    ["Total Carbohydrate", "Carbohydrate"],
    ["Dietary Fiber", "Fiber"],
    ["Total Sugars", "Sugars"],
    ["Protein", "Protein"],
    ["Calcium", "Calcium"],
    ["Iron", "Iron"],
    ["Vitamin A", "Vitamin A"],
    ["Vitamin C", "Vitamin C"],
];

// Friendly names for nutrients
export const NUTRIENT_LABELS = Object.fromEntries(NUTRIENTS_TO_DISPLAY);

// Daily recommended values (for %DV calculation based on 2000 calorie diet)
export const DAILY_VALUES = {
    "Total lipid": 78,          // grams
    "saturated": 20,            // grams
    "Cholesterol": 300,         // milligrams
    "Sodium": 2300,             // milligrams
    "Carbohydrate": 275,        // grams
    "Fiber": 28,                // grams
    "Protein": 50,              // grams
};

// Display order for nutrients
export const NUTRIENT_SORT_ORDER = {
    "Total lipid": 1,
    "saturated": 2,
    "trans": 3,
    "Cholesterol": 4,
    "Sodium": 5,
    "Carbohydrate": 6,
    "Fiber": 7,
    "Sugars": 8,
    "Protein": 9,
    "Calcium": 10,
    "Iron": 11,
    "Vitamin A": 12,
    "Vitamin C": 13,
};

