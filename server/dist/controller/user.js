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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUserRole = exports.getAllUSers = exports.UpdateUser = exports.LoginUser = void 0;
const firebase_config_1 = __importDefault(require("../config/firebase.config"));
const userModel_1 = require("../models/userModel");
const utils_1 = require("../utils/utils");
const LoginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.headers.authorization) {
            return res.status(404).json({ message: "resquest Not  Here Found" });
        }
        const token = req.headers.authorization.split(" ")[1];
        const decodeValue = yield firebase_config_1.default.auth().verifyIdToken(token);
        if (!decodeValue) {
            return res.status(505).json({ message: "UnAuthorized" });
        }
        else {
            const userExist = yield userModel_1.userModel.findOne({
                user_id: decodeValue.user_id,
            });
            if (!userExist) {
                (0, utils_1.newUserData)(decodeValue, req, res);
            }
            else {
                (0, utils_1.updateNewUserData)(decodeValue, req, res);
                // return res.send("need to update")
            }
        }
    }
    catch (error) {
        return res.status(500).json({
            Error: error,
            route: "/user/signup",
        });
    }
});
exports.LoginUser = LoginUser;
const UpdateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = { _id: req.params.userId };
    const songId = req.query;
    try {
        // console.log(filter, songId);
        const result = yield userModel_1.userModel.updateOne(filter, {
            $push: { favourites: songId },
        });
        res.status(200).send({ success: true, msg: "Song added to favourites" });
    }
    catch (error) {
        res.status(400).send({ success: false, msg: error });
    }
});
exports.UpdateUser = UpdateUser;
const getAllUSers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const options = {
        // sort returned documents in ascending order
        sort: { createdAt: 1 },
        // Include only the following
        // projection : {}
    };
    const cursor = yield userModel_1.userModel.find();
    if (cursor) {
        res.status(200).send({ success: true, data: cursor });
    }
    else {
        res.status(400).send({ success: false, msg: "No Data Found" });
    }
});
exports.getAllUSers = getAllUSers;
const updateUserRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = { _id: req.params.userId };
    const role = req.body.data.role;
    try {
        const result = yield userModel_1.userModel.findByIdAndUpdate(filter, { role: role });
        console.log(result);
        return res.status(200).send({ user: result });
    }
    catch (error) {
        res.status(400).send({ success: false, msg: error });
        console.log(error);
    }
});
exports.updateUserRole = updateUserRole;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = { _id: req.params.userId };
    try {
        const result = yield userModel_1.userModel.findByIdAndDelete(filter);
        return res.status(200).send({ user: result });
    }
    catch (error) {
        res.status(400).send({ success: false, msg: error });
        console.log(error);
    }
});
exports.deleteUser = deleteUser;
