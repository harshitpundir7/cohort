"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors")); // Import CORS package
const connectDb_1 = require("./config/connectDb");
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const contentRoute_1 = __importDefault(require("./routes/contentRoute"));
const previewRoutes_1 = __importDefault(require("./routes/previewRoutes"));
const app = (0, express_1.default)();
// Enable CORS
app.use((0, cors_1.default)({
    origin: "http://localhost:5173", // Replace with your frontend URL (e.g., Vite dev server)
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Allow cookies to be sent with requests
}));
app.use(express_1.default.json());
(0, connectDb_1.connectDatabase)();
app.use("/user", userRoute_1.default);
app.use("/content", contentRoute_1.default);
app.use("/preview", previewRoutes_1.default);
app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
