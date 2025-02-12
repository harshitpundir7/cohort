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
exports.signout = exports.signIn = exports.signUp = void 0;
const userSchema_1 = require("../model/userSchema");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    const exist = yield userSchema_1.userModel.findOne({ email });
    if (exist) {
        res.json({ message: "User Already exist" });
        return;
    }
    else {
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashPassword = yield bcrypt_1.default.hash(password, salt);
        const newUser = yield userSchema_1.userModel.create({
            name,
            email,
            password: hashPassword
        });
        console.log(process.env.JWTSECRET);
        const token = jsonwebtoken_1.default.sign({ userId: newUser._id }, process.env.JWTSECRET, { expiresIn: "1h" });
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 3600000
        });
        res.status(201).json({
            message: "User signed in Successfully"
        });
    }
});
exports.signUp = signUp;
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const exist = yield userSchema_1.userModel.findOne({ email });
    if (exist) {
        try {
            const validPass = yield bcrypt_1.default.compare(password, exist.password);
            if (!validPass) {
                res.json({ message: "Password is invalid" });
                return;
            }
            const token = jsonwebtoken_1.default.sign({ userId: exist._id }, process.env.JWTSECRET, { expiresIn: "7d" });
            res.cookie('token', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                maxAge: 3600000
            });
            res.status(201).json({ message: "You Logged in" });
            return;
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal server error" });
            return;
        }
    }
    else {
        res.status(404).json({ message: "User not found" });
        return;
    }
});
exports.signIn = signIn;
const signout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie("token");
    res.json({ message: "You logout Succesfully" });
    return;
});
exports.signout = signout;
