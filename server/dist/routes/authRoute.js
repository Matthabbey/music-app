"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../controller/user");
const router = express_1.default.Router();
router.get("/", user_1.LoginUser);
router.put("/favourites/:userId", user_1.UpdateUser);
router.get("/getUsers", user_1.getAllUSers);
router.put("/updateUser/:userId", user_1.updateUserRole);
router.delete('/deleteUser/:userId', user_1.deleteUser);
// router.put('/update', (req, res)=>{console.log(`I am here for you`);
// })
exports.default = router;
