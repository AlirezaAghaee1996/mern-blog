import express from 'express'
import  { fileURLToPath } from 'url'
import path from 'path'
import postRouter from './Routes/Post.js'
import catchError from './Utils/catchError.js'
import HandleERROR from './Utils/handleError.js'
const app=express()
const __filename=fileURLToPath(import.meta.url)
export const __dirname=path.dirname(__filename)

app.use(express.json())
app.use('/api/posts',postRouter)



app.use('*',(req,res,next)=>{
   next(new HandleERROR('Route not Found',404))
})
app.use(catchError)

export default app