import mongoose from "mongoose";
const userSchema= new mongoose.Schema({
    username:{
        type:String,
        unique:[true,'username is already exist'],
        required:[true,'username is required']
    },
    password:{
        type:String,
        required:[true,'password is required']
    },
    email:{
        type:String,
        match:[/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/i,'invalid email']
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    }
},{timestamps:true})

const User=mongoose.model('User',userSchema)
export default User