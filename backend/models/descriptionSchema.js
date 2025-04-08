import mongoose from "mongoose";

const DescriptionSchema = new mongoose.Schema(
  {
    fdcId: { type: Number, required: true, unique: true }, // Ensure unique and indexed
    description: String,
    brandOwner: String,
    publicationDate: String,
  },
  { collection: "food_descriptions" }
);

const FoodDescriptionModel = mongoose.model(
  "FoodDescription",
  DescriptionSchema
);
export default FoodDescriptionModel;
