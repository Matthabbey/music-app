"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const albumsController_1 = require("../controller/albumsController");
const router = express_1.default.Router();
router.get("/albums", albumsController_1.GetAllAlbum);
exports.default = router;
