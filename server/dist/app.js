"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("./routes/auth"));
const dotenv_1 = __importDefault(require("dotenv"));
const index_1 = __importDefault(require("./config/index"));
dotenv_1.default.config();
(0, index_1.default)();
const app = (0, express_1.default)();
// app.use(cors({origin: true}))
app.get("/", (req, res) => {
    return res.json("hey there now");
});
//user authentication routes
app.use('/api/user', auth_1.default);
// mongoose.set("strictQuery", false);
// mongoose.connect(process.env.MONGO_DB as string);
// mongoose.connection
//   .once("open", () => console.log("Successfully Connected to MongoDB"))
//   .on("error", (error) => {
//     console.log(`ERROR: ${error}`);
//   });
app.listen(4000, () => console.log("listening to port 4000"));
