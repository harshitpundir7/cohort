"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cookie = req.headers.cookie;
        const token = cookie === null || cookie === void 0 ? void 0 : cookie.split("=")[1];
        console.log(token);
        if (!token) {
            res.status(401).json({ message: "No token, authorization denied" });
            return;
        }
        try {
            if (!process.env.JWTSECRET) {
                throw new Error("JWT SECRET NOT FOUND");
            }
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWTSECRET);
            req.user = decoded;
            next();
        }
        catch (error) {
            res.status(401).json({ message: "Token is not valid" });
            return;
        }
    }
    catch (error) {
        res.status(500).json({ message: "Server Error" });
        return;
    }
});
exports.verifyToken = verifyToken;
