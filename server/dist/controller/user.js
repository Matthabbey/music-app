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
exports.User = void 0;
const firebase_config_1 = __importDefault(require("../config/firebase.config"));
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
            return res.status(505);
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
