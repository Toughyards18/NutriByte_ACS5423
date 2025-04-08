// File: backend/routes/foodNutrientsRoutes.js
// This file defines the routes for food nutrients data.
import express from "express"; // Import express for routing
import FoodNutrientModel from "../models/foodNutrientSchema.js"; // Import the FoodNutrient model

const router = express.Router();

// Route to get nutrient data by fdcId
router.get("/:fdcId", async (req, res) => {
  const { fdcId } = req.params;

  try {
    const nutrients = await FoodNutrientModel.find({ fdcId: parseInt(fdcId) });

    if (!nutrients || nutrients.length === 0) {
      return res
        .status(404)
        .json({ message: `No nutrients found for fdcId ${fdcId}` });
    }

    res.json(nutrients);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
