import Category from "../Models/CategoryMd.js";
import Post from "../Models/PostMd.js";
import ApiFeatures from "../Utils/apiFeatures.js";
import catchAsync from "../Utils/catchAsync.js";
export const createCategory = catchAsync(async (req, res, next) => {
  const category = await Category.create(req.body);
  return res.status(201).json({
    message: "category created successfully",
    data: category,
    success: true,
  });
});
export const getAllCategories = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Category, req.query)
    .filter()
    .sort()
    .paginate()
    .limitFields()
    .populate();
  const categories = await features.query;
  return res.status(200).json({
    data: categories,
    success: true,
  });
});
export const getOneCategory = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findById(id);
  return res.status(200).json({
    data: category,
    success: true,
  });
});
export const updateCategory = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  return res.status(200).json({
    data: category,
    success: true,
  });
});

export const deleteCategory = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findByIdAndDelete(id);
    await Post.deleteMany({categoryId:id})
  return res.status(200).json({
    success: true,
    message: "category removed successfully",
  });
});