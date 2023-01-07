"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const songsController_1 = require("../controller/songsController");
const router = express_1.default.Router();
router.get("/songs", songsController_1.GetAllSongs);
exports.default = router;
