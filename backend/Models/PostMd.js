import mongoose from "mongoose";
const postSchema=new mongoose.Schema({
    images:{
        type:[String],
        default:[]
    },
    title:{
        type:String,
        required:[true,'title is required']
    },
    description:{
        type:String,
        required:[true,'description is required']
    },
    categoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category'
    }
},{timestamps:true})
const Post=mongoose.model('Post',postSchema)
export default Post