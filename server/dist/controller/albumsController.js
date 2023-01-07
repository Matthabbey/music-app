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
exports.DeleteAlbum = exports.UpdateAlbum = exports.GetAllAlbums = exports.GetSingleAlbum = exports.CreateAlbums = void 0;
const albumModel_1 = require("../models/albumModel");
const CreateAlbums = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, imageURL, twitter, instagram } = req.body;
    const newArtist = new albumModel_1.albumModel({
        name,
        imageURL
    });
    try {
        const savedArtist = yield newArtist.save();
        return res
            .status(201)
            .json({ message: "New Album Successfully created", savedArtist });
    }
    catch (error) {
        return res.status(500).json({ message: "Failed to save Album", error });
    }
});
exports.CreateAlbums = CreateAlbums;
const GetSingleAlbum = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = { _id: req.params.id };
    const data = yield albumModel_1.albumModel.findById(filter);
    if (data) {
        return res.status(200).json({ message: "Data is available", data });
    }
    return res.status(404).json({ message: "Data is Not Found" });
});
exports.GetSingleAlbum = GetSingleAlbum;
const GetAllAlbums = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const option = {
        sort: {
            createdAt: 0,
        },
    };
    const data = yield albumModel_1.albumModel.find({});
    if (data) {
        return res.status(200).json({ message: "Successfully", data });
    }
    return res.status(404).json({ message: "Data is Not Found" });
});
exports.GetAllAlbums = GetAllAlbums;
const UpdateAlbum = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = { _id: req.params.id };
    const options = {
        upsert: true,
        new: true,
    };
    const { name, imageURL, twitter, instagram } = req.body;
    try {
        const update = yield albumModel_1.albumModel.findOneAndUpdate(filter, {
            name,
            imageURL
        }, options);
        return res.status(200).json({ success: "Successfully Updated Album", data: update });
    }
    catch (error) {
        return res.status(404).json({ message: "false" });
    }
});
exports.UpdateAlbum = UpdateAlbum;
const DeleteAlbum = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = { _id: req.params.id };
    const remove = yield albumModel_1.albumModel.deleteOne(filter);
    if (remove) {
        return res
            .status(200)
            .json({ message: "Data has been deleted Successfully", data: remove });
    }
    return res.status(404).json({ message: "Data is Not Found" });
});
exports.DeleteAlbum = DeleteAlbum;
