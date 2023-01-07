"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllArtists = exports.CreateArtists = void 0;
const artist_1 = require("../models/artist");
const CreateArtists = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, imageURL, twitter, instagram } = req.body;
    const newArtist = new artist_1.artistModel({
        name,
        imageURL,
        twitter,
        instagram,
    });
    try {
        const savedArtist = yield newArtist.save();
        return res
            .status(201)
            .json({ message: "New Artist Successfully created", savedArtist });
    }
    catch (error) {
        return res.status(500).json({ message: "Failed to save artist", error });
    }
});
exports.CreateArtists = CreateArtists;
const GetAllArtists = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(200).json({ message: "All artist available in the database" });
});
exports.GetAllArtists = GetAllArtists;
