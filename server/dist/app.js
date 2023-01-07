"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_1 = __importDefault(require("./routes/auth"));
const songs_1 = __importDefault(require("./routes/songs"));
const artist_1 = __importDefault(require("./routes/artist"));
const albums_1 = __importDefault(require("./routes/albums"));
const dotenv_1 = __importDefault(require("dotenv"));
const index_1 = __importDefault(require("./config/index"));
dotenv_1.default.config();
(0, index_1.default)();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: true }));
app.use(express_1.default.json());
app.get("/", (req, res) => {
    return res.json("hey there now");
});
//user authentication routes
app.use('/api/user', auth_1.default);
//artist routes
app.use('/api/artist', artist_1.default);
//song routes
app.use('/api/song', songs_1.default);
//album routes
app.use('/api/album', albums_1.default);
app.listen(4000, () => console.log("listening to port 4000"));
