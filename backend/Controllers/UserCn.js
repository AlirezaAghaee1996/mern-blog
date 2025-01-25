import User from "../Models/UserMd.js";
import ApiFeatures from "../Utils/apiFeatures.js";
import catchAsync from "../Utils/catchAsync.js";
import HandleERROR from "../Utils/handleError.js";
export const getAllUser = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(User, req.query)
    .filter()
    .sort()
    .paginate()
    .limitFields()
    .populate();
  const users = await features.query;
  return res.status(200).json({
    data: users,
    success: true,
  });
});
export const getOneUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  if(req.role!=='admin' && req.userId !=id){
    return next(new HandleERROR("you don't have permission",401))
  }
  const user = await User.findById(id);
  return res.status(200).json({
    data: user,
    success: true,
  });
});
export const updateUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  if(req.role!=='admin' && req.userId !=id){
    return next(new HandleERROR("you don't have permission",401))
  }
  let user;
  if(req.role=='admin'){
    const {password=null,...others}=req.body
    user = await User.findByIdAndUpdate(id,others, {
        new: true,
        runValidators: true,
      });
  }else{
    const {password=null,role=null,...others}=req.body
    user = await User.findByIdAndUpdate(id,others, {
        new: true,
        runValidators: true,
      });
  }
  return res.status(200).json({
    data: user,
    success: true,
  });
});

export const deleteUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  if(req.role!=='admin' && req.userId !=id){
    return next(new HandleERROR("you don't have permission",401))
  }
  let user=await User.findByIdAndDelete(id)
  return res.status(200).json({
    success: true,
    message:'remove account successfully'
  });
});
