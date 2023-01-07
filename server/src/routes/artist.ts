import express from "express";
import { CreateArtists, GetSingleArtist } from "../controller/artistsController";


const router = express.Router()
router.get("/artist/:id", GetSingleArtist);
router.post("/create", CreateArtists);





export default router