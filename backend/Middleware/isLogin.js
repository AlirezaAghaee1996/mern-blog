import jwt from "jsonwebtoken"
import catchAsync from "../Utils/catchAsync.js"

const isLogin=catchAsync(async(req,res,next)=>{
        const token=req.headers.authorization.split(' ')[1]
        const {id,role}=jwt.verify(token,process.env.JWT_SECRET)
        req.userId=id
        req.role=role
        next()
  
})
export default isLogin