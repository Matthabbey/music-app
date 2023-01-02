import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'



const app = express()

// app.use(cors({origin: true}))

app.get("/", (req, res) =>{
    return res.json("hey there now")
})

mongoose.connect(process.env.MONGO_DB!, {useNewUrlParser: true});
mongoose.connection
.once("open", ()=> console.log("Connected"))
.on("error", (error)=>{
    console.log(`ERROR: ${error}`);
    
})

app.listen(4000, ()=> console.log("listening to port 4000"))

