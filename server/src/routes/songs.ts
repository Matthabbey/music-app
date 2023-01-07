import express from "express";
import { GetAllSongs } from "../controller/songsController";
import { GetUser } from '../controller/user'

const router = express.Router()
router.get("/songs", GetAllSongs);





export default router