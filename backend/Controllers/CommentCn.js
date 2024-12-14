import Comment from "../Models/CommentMd.js";
import ApiFeatures from "../Utils/apiFeatures.js";
import catchAsync from "../Utils/catchAsync.js";
export const createComment = catchAsync(async (req, res, next) => {
  const userId = req.userId;
  const comment = await Comment.create({ ...req.body, userId });
  return res.status(201).json({
    message: "comment created successfully",
    data: comment,
    success: true,
  });
});
export const getAllComments = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Comment, req.query)
    .filter()
    .sort()
    .paginate()
    .limitFields()
    .populate();
  const comments = await features.query;
  return res.status(200).json({
    data: comments,
    success: true,
  });
});
export const getOneComment = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const comment = await Comment.findById(id).populate("userId postId");
  return res.status(200).json({
    data: comment,
    success: true,
  });
});
export const getCommentsPost = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const comment = await Comment.find({
    $and: [
        { postId: id }, 
        { isActive: true }
    ],
  });
  return res.status(200).json({
    data: comment,
    success: true,
  });
});
export const changeActiveComment = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const comment = await Comment.findByIdAndUpdate(id, {isActive:req.body.isActive}, {
    new: true,
    runValidators: true,
  });
  return res.status(200).json({
    data: comment,
    success: true,
  });
});

export const deleteComment = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const comment = await Comment.findByIdAndDelete(id);
  return res.status(200).json({
    success: true,
    message: "comment removed successfully",
  });
});
