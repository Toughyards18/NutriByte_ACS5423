// File: backend/models/brandedFoodSchema.js
// This file defines the schema for the branded_foods collection in MongoDB using Mongoose.

import mongoose from "mongoose";

const branded_food_schema = new mongoose.Schema(
  {
    fdcId: { type: Number, required: true, unique: true },
    description: String,
    brandOwner: String,
    marketCountry: String,
    gtinUpc: String,
    ingredients: String,
    servingSize: Number,
    servingSizeUnit: String,
    householdServingFullText: String,
    brandedFoodCategory: String,
    publicationDate: String,
  },
  { collection: "branded_foods" }
);

const BrandFoodModel = mongoose.model("Food", branded_food_schema);
export default BrandFoodModel;
