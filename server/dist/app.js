"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const authRoute_1 = __importDefault(require("./routes/authRoute"));
const songsRoute_1 = __importDefault(require("./routes/songsRoute"));
const artistRoute_1 = __importDefault(require("./routes/artistRoute"));
const albumsRoute_1 = __importDefault(require("./routes/albumsRoute"));
const dotenv_1 = __importDefault(require("dotenv"));
const index_1 = __importDefault(require("./config/index"));
dotenv_1.default.config();
(0, index_1.default)();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: true }));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    return res.json("hey there now");
});
//user authentication routes
app.use('/api/user', authRoute_1.default);
//artist routes
app.use('/api/artist', artistRoute_1.default);
//song routes
app.use('/api/song', songsRoute_1.default);
//album routes
app.use('/api/album', albumsRoute_1.default);
//update routes
app.listen(4000, () => console.log("listening to port 4000"));
