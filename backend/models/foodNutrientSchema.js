// backend/models/foodNutrientSchema.js
import mongoose from "mongoose"; // Import mongoose for MongoDB connection

// Define the schema for food_nutrients
const foodNutrientSchema = new mongoose.Schema(
  {
    fdcId: Number,
    nutrientId: Number,
    nutrientName: String,
    nutrientNumber: String,
    nutrientUnit: String,
    amount: Number,
  },
  { collection: "food_nutrients" }
);

// Create a model from the schema
const FoodNutrient = mongoose.model("FoodNutrient", foodNutrientSchema);
export default FoodNutrient;
