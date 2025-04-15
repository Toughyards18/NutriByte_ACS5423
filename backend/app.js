import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/nutridbconn.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

import foodNutrientsRoutes from "./routes/foodNutrientsRoutes.js";
import brandedFoodRoutes from "./routes/brandedFoodRoutes.js";
import macroSearchRoutes from "./routes/macroSearchRoutes.js";
import path from "path/posix";

const __filename = fileURLToPath(import.meta.url); // get the file name
const __dirname = dirname(__filename); // get the directory name

dotenv.config();
const app = express();

app.use(cors({}));

app.use(express.json());

connectDB();

app.use("/api/foods", brandedFoodRoutes); // food search (by description, brand, etc.)
app.use("/api/nutrients", foodNutrientsRoutes); // nutrient data by fdcId
app.use("/api/macrosearch", macroSearchRoutes); // macro search routes

const staticPath = path.join(__dirname, "build"); // set the static path
app.use(express.static(staticPath)); // serve static files

app.get("*", (req, res) => {
    const filePath = path.join(staticPath, req.path); // get the file path
    res.send(filePath); // send the file path
}); // serve the static files

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
