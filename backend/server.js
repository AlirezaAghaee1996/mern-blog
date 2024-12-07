import app from "./app.js";
import dotenv from 'dotenv'
import { __dirname } from "./app.js";
import mongoose from "mongoose";
dotenv.configDotenv({path:__dirname+'/config.env'})

mongoose.connect(process.env.DATA_BASE).then(()=>{
    console.log('database is connect')
}).catch(err=>console.log(err))


app.listen(5000,()=>{
    console.log('server is running')
})