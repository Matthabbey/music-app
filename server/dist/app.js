"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// app.use(cors({origin: true}))
app.get("/", (req, res) => {
    return res.json("hey there now");
});
mongoose_1.default.set("strictQuery", false);
mongoose_1.default.connect(process.env.MONGO_DB);
mongoose_1.default.connection
    .once("open", () => console.log("Successfully Connected to MongoDB"))
    .on("error", (error) => {
    console.log(`ERROR: ${error}`);
});
app.listen(4000, () => console.log("listening to port 4000"));
