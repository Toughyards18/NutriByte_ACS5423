// backend/controllers/foodController.js (example)
// This file contains the controller for handling food-related requests.

import Food from '../models/brandedFoodSchema.js';
import Nutrient from '../models/foodNutrientSchema.js';
import dotenv from "dotenv";
dotenv.config();

export const getFoodWithNutrients = async (req, res) =>
{
    const { fdcId } = req.params;

    try
    {
        const foodInfo = await Food.findOne({ fdcId });  // your foods collection
        const nutrients = await Nutrient.find({ fdcId });

        if (process.env.DB_LOGGING === "true")
        {
            console.log("Food Info:", foodInfo);
            console.log("Nutrients:", nutrients);
        }

        if (!foodInfo)
        {
            return res.status(404).json({ message: "Food not found" });
        }

        const response = {
            fdcId: foodInfo.fdcId,
            description: foodInfo.description,
            brandOwner: foodInfo.brandOwner,
            servingSize: foodInfo.servingSize,
            servingSizeUnit: foodInfo.servingSizeUnit,
            nutrients,
        };

        res.json(response);
    } catch (error)
    {
        console.error("Error getting food with nutrients:", error);
        res.status(500).json({ message: "Server error" });
    }
};
