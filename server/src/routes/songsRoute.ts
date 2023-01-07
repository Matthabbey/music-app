import express from "express";
import { CreateSongs, DeleteSong, GetAllSongs, GetSingleSong, UpdateSong } from "../controller/songsController";

const router = express.Router();

router.get("/getAll", GetAllSongs);
router.get("/:id", GetSingleSong);
router.post("/create", CreateSongs);
router.put("/update/:id", UpdateSong);
router.delete("/delete/:id", DeleteSong);

export default router;
