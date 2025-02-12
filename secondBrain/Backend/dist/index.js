"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const connectDb_1 = require("./config/connectDb");
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const contextRoute_1 = __importDefault(require("./routes/contextRoute"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
(0, connectDb_1.connectDatabase)();
app.use("/user", userRoute_1.default);
app.use("/content", contextRoute_1.default);
app.listen(3000);
