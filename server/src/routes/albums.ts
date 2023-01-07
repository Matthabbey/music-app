import express from "express";
import { GetAllAlbum } from "../controller/albumsController";

const router = express.Router()
router.get("/albums", GetAllAlbum);





export default router