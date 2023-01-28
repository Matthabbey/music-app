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
exports.DeleteSong = exports.UpdateSong = exports.GetAllSongs = exports.GetSingleSong = exports.CreateSongs = void 0;
const songModel_1 = require("../models/songModel");
const CreateSongs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, imageURL, artist, category, songURL, album, language } = req.body;
    const newArtist = new songModel_1.songsModel({
        name,
        imageURL,
        artist,
        category,
        songURL,
        album,
        language,
    });
    try {
        const savedSong = yield newArtist.save();
        return res
            .status(201)
            .json({ message: "New Song Successfully created", savedSong });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Failed to save Song", error });
    }
});
exports.CreateSongs = CreateSongs;
const GetSingleSong = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = { _id: req.params.id };
    const data = yield songModel_1.songsModel.findById(filter);
    if (data) {
        return res.status(200).json({ message: "Data is available", data });
    }
    return res.status(404).json({ message: "Data is Not Found" });
});
exports.GetSingleSong = GetSingleSong;
const GetAllSongs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const option = {
        sort: {
            createdAt: 0,
        },
    };
    const data = yield songModel_1.songsModel.find({});
    if (data) {
        return res.status(200).json({ message: "Successfully", data });
    }
    return res.status(404).json({ message: "Data is Not Found" });
});
exports.GetAllSongs = GetAllSongs;
const UpdateSong = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = { _id: req.params.id };
    const options = {
        upsert: true,
        new: true,
    };
    const { name, imageURL, artist, category, songURL, album, language } = req.body;
    try {
        const update = yield songModel_1.songsModel.findOneAndUpdate(filter, {
            name,
            imageURL,
            artist,
            category,
            songURL,
            album,
            language,
        }, options);
        return res
            .status(200)
            .json({ success: "Successfully Updated Artist", data: update });
    }
    catch (error) {
        return res.status(404).json({ message: "false" });
    }
});
exports.UpdateSong = UpdateSong;
const DeleteSong = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = { _id: req.params.id };
    const remove = yield songModel_1.songsModel.deleteOne(filter);
    if (remove) {
        return res
            .status(200)
            .json({ message: "Data has been deleted Successfully", data: remove });
    }
    return res.status(404).json({ message: "Data is Not Found" });
});
exports.DeleteSong = DeleteSong;
