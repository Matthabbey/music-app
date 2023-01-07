"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const albumsController_1 = require("../controller/albumsController");
const router = express_1.default.Router();
router.get("/getAll", albumsController_1.GetAllAlbums);
router.get("/:id", albumsController_1.GetSingleAlbum);
router.post("/create", albumsController_1.CreateAlbums);
router.put("/update/:id", albumsController_1.UpdateAlbum);
router.delete("/delete/:id", albumsController_1.DeleteAlbum);
exports.default = router;
