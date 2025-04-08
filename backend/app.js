import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/nutridbconn.js";

import foodNutrientsRoutes from "./routes/foodNutrientsRoutes.js";
import brandedFoodRoutes from "./routes/brandedFoodRoutes.js";
import macroSearchRoutes from "./routes/macroSearchRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/foods", brandedFoodRoutes); // food search (by description, brand, etc.)
app.use("/api/nutrients", foodNutrientsRoutes); // nutrient data by fdcId
app.use("/api/macrosearch", macroSearchRoutes); // macro search routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
