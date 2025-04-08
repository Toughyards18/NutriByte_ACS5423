import express from "express";
import dotenv from "dotenv";
import connectDB from "./utils/nutridbconn.js";
import foodNutrientsRoutes from "./routes/foodNutrientsRoutes.js";
import brandedFoodRoutes from "./routes/brandedFoodRoutes.js";
import macroSearchRoutes from "./routes/macroSearchRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(express.json());

// Use the Branded food routes
app.use("/api/foods", brandedFoodRoutes);

// Use the food nutrients routes
app.use("/api/nutrients", foodNutrientsRoutes);

//Use the macro search routes
app.use("/api/macrosearch", macroSearchRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
