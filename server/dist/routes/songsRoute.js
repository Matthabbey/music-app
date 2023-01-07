"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const songsController_1 = require("../controller/songsController");
const router = express_1.default.Router();
router.get("/getAll", songsController_1.GetAllSongs);
router.get("/:id", songsController_1.GetSingleSong);
router.post("/create", songsController_1.CreateSongs);
router.put("/update/:id", songsController_1.UpdateSong);
router.delete("/delete/:id", songsController_1.DeleteSong);
exports.default = router;
