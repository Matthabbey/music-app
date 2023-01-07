import express from "express";
import {
  CreateAlbums,
  DeleteAlbum,
  GetAllAlbums,
  GetSingleAlbum,
  UpdateAlbum,
} from "../controller/albumsController";

const router = express.Router();
router.get("/getAll", GetAllAlbums);
router.get("/:id", GetSingleAlbum);
router.post("/create", CreateAlbums);
router.put("/update/:id", UpdateAlbum);
router.delete("/delete/:id", DeleteAlbum);

export default router;
