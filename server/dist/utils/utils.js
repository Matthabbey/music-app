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
exports.updateNewUserData = exports.newUserData = void 0;
const userModel_1 = require("../models/userModel");
const newUserData = (decodeValue, req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = new userModel_1.userModel({
        name: decodeValue.name,
        email: decodeValue.email,
        imageUrl: decodeValue.picture,
        email_verified: decodeValue.email_verified,
        role: "member",
        user_id: decodeValue.user_id,
        auth_time: decodeValue.auth_time,
    });
    try {
        const savedUser = yield newUser.save();
        res.status(200).send({
            message: "Successfully created",
            user: savedUser,
        });
    }
    catch (error) {
        // console.log("hello world")
        res.status(500).send({ success: false, msg: error });
    }
});
exports.newUserData = newUserData;
const updateNewUserData = (decodeValue, req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = { user_id: decodeValue.user_id };
    const options = {
        upsert: true,
        new: true,
    };
    try {
        const update = yield userModel_1.userModel.findOneAndUpdate(filter, { auth_time: decodeValue.auth_time }, options);
        return res.status(200).json({
            message: "Successfully updated",
            user: update,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            route: "todo/update router",
        });
    }
});
exports.updateNewUserData = updateNewUserData;
