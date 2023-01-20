import express from "express";
import cors from "cors";
import authRouter from './routes/authRoute';
import songsRouter from './routes/songsRoute';
import artistRouter from './routes/artistRoute';
import albumsRouter from './routes/albumsRoute';
import dotenv from "dotenv";
import connectMongoDB from './config/index';
dotenv.config()
connectMongoDB()

const app = express();

app.use(cors({origin: true}))
app.use(express.json())
app.use(express.urlencoded( { extended: true}))

app.get("/", (req, res) => {
  return res.json("hey there now");
});
//user authentication routes
app.use('/api/user', authRouter)

//artist routes
app.use('/api/artist', artistRouter)

//song routes
app.use('/api/song', songsRouter)

//album routes
app.use('/api/album', albumsRouter)

//update routes


app.listen(4000, () => console.log("listening to port 4000"));
