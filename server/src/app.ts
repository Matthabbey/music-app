import express from 'express'
import cors from 'cors'

const app = express()

app.get("/", (req, res) =>{
    return res.json("hey there now")
})

app.listen(4000, ()=> console.log("listening to port 4000"))

