import express from "express"; // Import express for routing
import Food from "../models/brandedFoodSchema.js"; // Import the Food model

const router = express.Router();

// GET /api/foods?searchString=cheese
router.get("/", async (req, res) => {
  try {
    const searchString = req.query.searchString || "";
    const foodItems = await Food.find({
      $or: [
        { description: { $regex: searchString, $options: "i" } },
        { ingredients: { $regex: searchString, $options: "i" } },
        { brandOwner: { $regex: searchString, $options: "i" } },
      ],
    });
    console.log(
      `Found ${foodItems.length} enntries of ${req.query.searchString}.`
    );
    res.json(foodItems); // Send JSON to the frontend
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
