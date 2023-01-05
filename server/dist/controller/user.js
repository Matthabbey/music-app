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
exports.GetUser = void 0;
const firebase_config_1 = __importDefault(require("../config/firebase.config"));
const user_1 = require("../models/user");
const utils_1 = require("../utils/utils");
const GetUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.headers.authorization) {
            return res.status(404).json({ message: "resquest Not Found" });
        }
        const token = req.headers.authorization.split(" ")[1];
        const decodeValue = yield firebase_config_1.default.auth().verifyIdToken(token);
        if (!decodeValue) {
            return res.status(505).json({ message: "UnAuthorized" });
        }
        else {
            const userExist = yield user_1.userModel.findOne({ "user_id": decodeValue.user_id });
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
exports.GetUser = GetUser;
