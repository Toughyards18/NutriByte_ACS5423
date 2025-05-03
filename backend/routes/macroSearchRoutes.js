// File: backend/routes/macroSearchRoutes.js
// Route to search foods by macronutrients (protein, carbs, fat)

import express from "express";
import FoodNutrient from "../models/foodNutrientSchema.js";
import BrandedFood from "../models/brandedFoodSchema.js";

const router = express.Router();

router.get("/", async (req, res) =>
{
  const {
    proteinCenter = 0, proteinTolLow = 0, proteinTolHigh = 0,
    carbsCenter = 0, carbsTolLow = 0, carbsTolHigh = 0,
    fatCenter = 0, fatTolLow = 0, fatTolHigh = 0, } = req.query; // +/- g buffer for matching


  // Helper to convert and calculate min/max
  const toNum = (val) => (val !== undefined ? +val : 0);

  const proteinMin = toNum(proteinCenter) - toNum(proteinTolLow);
  const proteinMax = toNum(proteinCenter) + toNum(proteinTolHigh);
  const carbsMin = toNum(carbsCenter) - toNum(carbsTolLow);
  const carbsMax = toNum(carbsCenter) + toNum(carbsTolHigh);
  const fatMin = toNum(fatCenter) - toNum(fatTolLow);
  const fatMax = toNum(fatCenter) + toNum(fatTolHigh);


  try
  {
    const proteinDocs = await FoodNutrient.find({
      nutrientName: "Protein",
      amount: { $gte: proteinMin, $lte: proteinMax },
    }).select("fdcId");

    const carbsDocs = await FoodNutrient.find({
      nutrientName: "Carbohydrate, by difference",
      amount: { $gte: carbsMin, $lte: carbsMax },
    }).select("fdcId");

    const fatDocs = await FoodNutrient.find({
      nutrientName: "Total lipid (fat)",
      amount: { $gte: fatMin, $lte: fatMax },
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
  }
  catch (err)
  {
    console.error("Macro search failed:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
