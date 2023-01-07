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
exports.DeleteArtist = exports.UpdateArtist = exports.GetAllArtists = exports.GetSingleArtist = exports.CreateArtists = void 0;
const artistModel_1 = require("../models/artistModel");
const CreateArtists = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, imageURL, twitter, instagram } = req.body;
    const newArtist = new artistModel_1.artistModel({
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
const GetSingleArtist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = { _id: req.params.id };
    const data = yield artistModel_1.artistModel.findById(filter);
    if (data) {
        return res.status(200).json({ message: "Data is available", data });
    }
    return res.status(404).json({ message: "Data is Not Found" });
});
exports.GetSingleArtist = GetSingleArtist;
const GetAllArtists = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const option = {
        sort: {
            createdAt: 0,
        },
    };
    const data = yield artistModel_1.artistModel.find({});
    if (data) {
        return res.status(200).json({ message: "Successfully", data });
    }
    return res.status(404).json({ message: "Data is Not Found" });
});
exports.GetAllArtists = GetAllArtists;
const UpdateArtist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = { _id: req.params.id };
    const options = {
        upsert: true,
        new: true,
    };
    const { name, imageURL, twitter, instagram } = req.body;
    try {
        const update = yield artistModel_1.artistModel.findOneAndUpdate(filter, {
            name,
            imageURL,
            twitter,
            instagram,
        }, options);
        return res.status(200).json({ success: "Successfully Updated Artist", data: update });
    }
    catch (error) {
        return res.status(404).json({ message: "false" });
    }
});
exports.UpdateArtist = UpdateArtist;
const DeleteArtist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = { _id: req.params.id };
    const remove = yield artistModel_1.artistModel.deleteOne(filter);
    if (remove) {
        return res
            .status(200)
            .json({ message: "Data has been deleted Successfully", data: remove });
    }
    return res.status(404).json({ message: "Data is Not Found" });
});
exports.DeleteArtist = DeleteArtist;
