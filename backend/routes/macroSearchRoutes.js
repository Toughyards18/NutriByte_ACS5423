// File: backend/routes/macroSearchRoutes.js
// Route to search foods by macronutrients (protein, carbs, fat)

import express from "express";
import FoodNutrient from "../models/foodNutrientSchema.js";
import BrandedFood from "../models/brandedFoodSchema.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const { protein = 0, carbs = 0, fat = 0 } = req.query;
  const tolerance = 0; // +/- g buffer for matching

  try {
    const proteinDocs = await FoodNutrient.find({
      nutrientName: "Protein",
      amount: { $gte: +protein - tolerance, $lte: +protein + tolerance },
    }).select("fdcId");

    const carbsDocs = await FoodNutrient.find({
      nutrientName: "Carbohydrate, by difference",
      amount: { $gte: +carbs - tolerance, $lte: +carbs + tolerance },
    }).select("fdcId");

    const fatDocs = await FoodNutrient.find({
      nutrientName: "Total lipid (fat)",
      amount: { $gte: +fat - tolerance, $lte: +fat + tolerance },
    }).select("fdcId");

    // Convert to sets of IDs
    const proteinSet = new Set(proteinDocs.map((d) => d.fdcId));
    const carbsSet = new Set(carbsDocs.map((d) => d.fdcId));
    const fatSet = new Set(fatDocs.map((d) => d.fdcId));

    // Find intersection of all 3 sets
    const commonFdcIds = [...proteinSet].filter(
      (id) => carbsSet.has(id) && fatSet.has(id)
    );

    // Fetch matching food descriptions
    const foods = await BrandedFood.find({ fdcId: { $in: commonFdcIds } });

    res.json(foods);
  } catch (err) {
    console.error("Macro search failed:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
