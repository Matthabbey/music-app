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
exports.newUserDate = exports.User = void 0;
const firebase_config_1 = __importDefault(require("../config/firebase.config"));
const user_1 = require("../models/user");
const User = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // return res.send(req.headers.authorization)
        if (!req.headers.authorization) {
            return res.status(404).json({ message: "resquest Not Found" });
        }
        const token = req.headers.authorization.split(" ")[1];
        // return res.status(200).json({token: token })
        const decodeValue = yield firebase_config_1.default.auth().verifyIdToken(token);
        if (!decodeValue) {
            return res.status(505).json({ message: "UnAuthorized" });
        }
        else {
            // return res.status(200).json(decodeValue)
            const userExist = yield user_1.userModel.findOne({ "user_id": decodeValue.user_id });
            if (!userExist) {
                return res.send('need to create');
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
exports.User = User;
const newUserDate = (req, res, decodeValue) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = new user_1.userModel({
        name: decodeValue.name,
        email: decodeValue.email,
        imageUrl: decodeValue.imageUrl,
        email_verified: decodeValue.email_verified,
        role: decodeValue.role,
        user_id: decodeValue.user_id,
        auth_time: decodeValue.auth_time
    });
});
exports.newUserDate = newUserDate;
