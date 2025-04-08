// backend/models/AttributeSchema.js
import mongoose from "mongoose";

const AttributeSchema = new mongoose.Schema(
  {
    fdcId: { type: Number, required: true }, // Reference to the parent document
    attributeId: Number,
    name: String,
    value: Number,
  },
  { _id: false },
  { collection: "food_attributes" }
);

const FoodAttributesModel = mongoose.model("FoodAttributes", AttributeSchema);
export default FoodAttributesModel;
