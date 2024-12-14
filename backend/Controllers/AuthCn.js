import jwt from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'
import User from '../Models/UserMd.js'
import catchAsync from '../Utils/catchAsync.js'
import HandleERROR from '../Utils/handleError.js'
export const register =catchAsync(async(req,res,next)=>{
    const {password='',role='',...others}=req.body
    const regex=new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/)
    if(!regex.test(password)){
        return next(new HandleERROR('password invalid',400))
    }
    const hashPass=bcryptjs.hashSync(password,10)
    await User.create({...others,password:hashPass})
    return res.status(201).json({
        message:'register successfully',
        success:true
    })
})
export const login =catchAsync(async(req,res,next)=>{
    const {username=null,password=null}=req.body
    if(!username || !password){
       return next(new HandleERROR('username and password is required',400))
    }
    const user=await User.findOne({username})
    if (!user){
       return next(new HandleERROR('user not exist',404))
    }
    const checkPassword=bcryptjs.compareSync(password,user.password)
    if(!checkPassword){
        return next(new HandleERROR('username or password incorrect',400))
    }
    const token=jwt.sign({id:user._id,role:user.role},process.env.JWT_SECRET)
    return res.status(200).json({
        message:'login successfully',
        data:{
            token,
            user:{
                id:user._id,
                username:user.username,
                email:user.email,
                role:user.role
            }
        }
    })

})


