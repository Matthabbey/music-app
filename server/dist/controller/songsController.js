"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllSongs = void 0;
const GetAllSongs = (req, res) => {
    return res.status(200).json({ message: "all songs in database" });
};
exports.GetAllSongs = GetAllSongs;
