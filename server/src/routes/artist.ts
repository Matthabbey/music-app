import express from "express";
import { CreateArtists, GetAllArtists } from "../controller/artistsController";


const router = express.Router()
router.get("/artists", GetAllArtists);
router.post("/create", CreateArtists);





export default router