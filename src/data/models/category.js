import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a category name"],
      maxLenght: [100, "Category name cannot exceed 100 characters"],
    },
    description: String,
    tags: String,
  },
  { timestamps: true }
);

export default mongoose.model('Category', categorySchema);