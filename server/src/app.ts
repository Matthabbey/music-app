import express from "express";
import cors from "cors";
import authRouter from './routes/auth';
import songsRouter from './routes/songs';
import artistRouter from './routes/artist';
import albumsRouter from './routes/albums';
import dotenv from "dotenv";
import connectMongoDB from './config/index';
dotenv.config()
connectMongoDB()

const app = express();

app.use(cors({origin: true}))
app.use(express.json())

app.get("/", (req, res) => {
  return res.json("hey there now");
});
//user authentication routes
app.use('/api/user', authRouter)

//artist routes
app.use('/api/', artistRouter)

//song routes
app.use('/api/', songsRouter)

//album routes
app.use('/api/', albumsRouter)


app.listen(4000, () => console.log("listening to port 4000"));
