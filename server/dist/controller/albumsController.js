"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllAlbum = void 0;
const GetAllAlbum = (req, res) => {
    return res.status(200).json({ message: "all albums in database" });
};
exports.GetAllAlbum = GetAllAlbum;
