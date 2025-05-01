// File: src/assets/constants.jsx
// This file contains constants and structure templates for the application.

//
// Data Structure Templates
//

// Nutrient object structure template
export interface Nutrient {
    nutrientId: number;
    nutrientName: string;
    nutrientNumber: string;
    nutrientUnit: string;
    amount: number;
}


// Food object structure template (not an enforced type, just for developer reference)
export interface FoodInterface {
    fdcId: number;
    description: string;
    brandOwner?: string;
    ingredients?: string;
    servingSize: number;
    servingSizeUnit: string;
    nutrients: Nutrient[];
}


//
// Nutrient Labeling and Sorting
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
export const NUTRIENT_LABELS: Record<string, string> = Object.fromEntries(
  NUTRIENTS_TO_DISPLAY
);

// Daily recommended values (for %DV calculation based on 2000 calorie diet)
export const DAILY_VALUES = {
    "Total lipid": 78,          // g
    "saturated": 20,            // g
    "Cholesterol": 300,         // mg
    "Sodium": 2300,             // mg
    "Carbohydrate": 275,        // g
    "Fiber": 28,                // g
    "Protein": 50,              // g
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

