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

app.get("/", (req, res) => {
  return res.json("hey there now");
});
//user authentication routes
app.use('/api/user', authRouter)
app.use('api/artist', artistRouter)
app.use('api/songs', songsRouter)
app.use('api/albums', albumsRouter)


// mongoose.set("strictQuery", false);
// mongoose.connect(process.env.MONGO_DB as string);
// mongoose.connection
//   .once("open", () => console.log("Successfully Connected to MongoDB"))
//   .on("error", (error) => {
//     console.log(`ERROR: ${error}`);
//   });

app.listen(4000, () => console.log("listening to port 4000"));
