"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const artistsController_1 = require("../controller/artistsController");
const router = express_1.default.Router();
router.get("/artist/:id", artistsController_1.GetSingleArtist);
router.post("/create", artistsController_1.CreateArtists);
exports.default = router;
