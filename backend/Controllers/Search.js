import Category from "../Models/CategoryMd.js";
import Post from "../Models/PostMd.js";
import catchAsync from "../Utils/catchAsync.js";

export const search=catchAsync(async (req,res,next) => {
    const {query}=req.body
    const categories=await Category.find({title:{$regex:query,$options:'i'}})
    const posts=await Post.find({title:{$regex:query,$options:'i'}})
    return res.status(200).json({
        success:true,
        data:{
            categories,posts
        }
    })
})