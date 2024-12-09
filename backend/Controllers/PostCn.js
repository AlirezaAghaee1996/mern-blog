import Post from "../Models/PostMd.js"
import ApiFeatures from "../Utils/apiFeatures.js"
import catchAsync from "../Utils/catchAsync.js"
export const createPost=catchAsync(async(req,res,next)=>{
    const post=await Post.create(req.body)
    return res.status(201).json({
        message:'post created successfully',
        data:post,
        success:true
    })
})
export const getAllPosts=catchAsync(async(req,res,next)=>{
    const features=new ApiFeatures(Post,req.query).filter().sort().paginate().limitFields().populate()
    const posts=await features.query
    return res.status(200).json({
        data:posts,
        success:true
    })
})
export const getOnePost=catchAsync(async(req,res,next)=>{
    const {id}=req.params
    const post=await Post.findById(id).populate('categoryId')
    return res.status(200).json({
        data:post,
        success:true
    })
})
export const updatePost=catchAsync(async(req,res,next)=>{
    const {id}=req.params
    const post=await Post.findByIdAndUpdate(id,req.body,{new:true,runValidators:true})
    return res.status(200).json({
        data:post,
        success:true
    })
})

export const deletePost=catchAsync(async(req,res,next)=>{
    const {id}=req.params
    const post=await Post.findByIdAndDelete(id)
    return res.status(200).json({
        success:true,
        message:'post removed successfully'
    })
})



//find 
//findOne
//findById
//findByIdAndUpdate
//findByIdAndDelete
//create
//save