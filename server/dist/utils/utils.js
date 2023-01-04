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
exports.newUserData = void 0;
const user_1 = require("../models/user");
const newUserData = (decodeValue, req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = new user_1.userModel({
        name: decodeValue.name,
        email: decodeValue.email,
        imageUrl: decodeValue.picture,
        email_verified: decodeValue.email_verified,
        role: "member",
        user_id: decodeValue.user_id,
        auth_time: decodeValue.auth_time
    });
    try {
        const savedUser = yield newUser.save();
        res.status(200).send({ user: savedUser });
    }
    catch (error) {
        // console.log("hello world")
        res.status(500).send({ success: false, msg: error });
    }
});
exports.newUserData = newUserData;
