import express from "express";
import {
  CreateArtists,
  DeleteArtist,
  GetAllArtists,
  GetSingleArtist,
  UpdateArtist,
} from "../controller/artistsController";

const router = express.Router();

router.get("/getAll", GetAllArtists);
router.get("/:id", GetSingleArtist);
router.post("/create", CreateArtists);
router.put("/update/:id", UpdateArtist);
router.delete("/delete/:id", DeleteArtist);

export default router;
