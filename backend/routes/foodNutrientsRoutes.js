// File: backend/routes/foodNutrientsRoutes.js
// This file defines the routes for food nutrients data.
import express from "express"; // Import express for routing
import { getFoodWithNutrients } from "../controllers/foodController.js"; // Import the controller function


const router = express.Router();
// Call controller
router.get("/:fdcId", getFoodWithNutrients);

export default router;
