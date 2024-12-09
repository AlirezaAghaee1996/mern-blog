import mongoose from "mongoose";
const categorySchema = new mongoose.Schema(
  {
    icon: {
      type: String,
    },
    title: {
      type: String,
      required: [true, "title is required"],
      unique:[true,'title is exist']

    },
  },
  { timestamps: true }
);
const Category = mongoose.model("Category", categorySchema);
export default Category;
