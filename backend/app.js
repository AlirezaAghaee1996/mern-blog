import express from 'express'
import  { fileURLToPath } from 'url'
import path from 'path'
import postRouter from './Routes/Post.js'
import catchError from './Utils/catchError.js'
import HandleERROR from './Utils/handleError.js'
import authRouter from './Routes/Auth.js'
import userRouter from './Routes/User.js'
import commentRouter from './Routes/Comment.js'
import categoryRouter from './Routes/Category.js'
import uploadRouter from './Routes/upload.js'
const app=express()
const __filename=fileURLToPath(import.meta.url)
export const __dirname=path.dirname(__filename)

app.use(express.json())
app.use(express.static(__dirname+'Public'))
app.use('/api/posts',postRouter)
app.use('/api/auth',authRouter)
app.use('/api/users',userRouter)
app.use('/api/comments',commentRouter)
app.use('/api/categories',categoryRouter)
app.use('/api/upload',uploadRouter)


app.use('*',(req,res,next)=>{
   next(new HandleERROR('Route not Found',404))
})
app.use(catchError)

export default app