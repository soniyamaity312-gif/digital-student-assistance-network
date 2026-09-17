import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    description: {
      type: String,
      default: "",
      trim: true
    },

    created_at: {
      type: Date,
      default: Date.now
    }
  }
);

const Category = mongoose.model(
  "Category",
  categorySchema
);

export default Category;