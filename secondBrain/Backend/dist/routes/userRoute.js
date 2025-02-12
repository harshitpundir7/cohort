"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userControllers_1 = require("../controllers/userControllers");
const app = (0, express_1.default)();
app.post("/signup", userControllers_1.signUp);
app.post("/signin", userControllers_1.signIn);
app.post("/signout", userControllers_1.signout);
exports.default = app;
