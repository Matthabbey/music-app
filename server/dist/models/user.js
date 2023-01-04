"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    user_id: {
        type: String,
        required: true,
    },
    email_verified: {
        type: Boolean,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    auth_time: {
        type: String,
        required: true,
    },
}, { timestamps: true });
exports.userModel = mongoose_1.default.model("user", UserSchema);
