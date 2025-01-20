import jwt from "jsonwebtoken";
import catchAsync from "../Utils/catchAsync.js";
import HandleERROR from "../Utils/handleError.js";

const isAdmin = catchAsync(async (req, res, next) => {
  const token = req.headers?.authorization?.split(" ")[1];
  const { id, role } = jwt.verify(token, process.env.JWT_SECRET);
  req.userId = id;
  req.role = role;
  if (role != "admin") {
    return next(new HandleERROR("you are not admin", 404));
  }
  return next();
});
export default isAdmin;
