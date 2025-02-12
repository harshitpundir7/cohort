"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middleware_1 = require("../middleware/middleware");
const contentControllers_1 = require("../controllers/contentControllers");
const app = (0, express_1.default)();
app.get("/post", middleware_1.verifyToken, contentControllers_1.fetchData);
app.post("/post", middleware_1.verifyToken, contentControllers_1.postData);
app.delete("/post:index", middleware_1.verifyToken, contentControllers_1.deleteData);
exports.default = app;
