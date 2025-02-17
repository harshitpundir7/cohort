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
exports.updateData = exports.checkAuth = exports.deleteData = exports.postData = exports.fetchData = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const contentModel_1 = require("../model/contentModel");
const fetchData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
        const data = yield contentModel_1.contentModel.find({
            userId: userId
        });
        if (data) {
            res.json(data);
        }
        else {
            res.json({ message: "No Content Found" });
        }
    }
    catch (error) {
        console.log(error);
        res.status(403).json({ messagae: "Error in Fetching Data" });
    }
});
exports.fetchData = fetchData;
const postData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        console.log("hello");
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
        console.log("UserID:", userId);
        const { content, tags, preview } = req.body;
        yield contentModel_1.contentModel.create({
            userId: userId,
            content: content,
            tags: tags,
            preview: preview
        });
        res.json({ message: "Content added" });
        return;
    }
    catch (error) {
        console.log(error);
        res.status(403).json({ message: "Unable to create Content" });
        return;
    }
});
exports.postData = postData;
const deleteData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { id } = req.params;
        console.log("Content ID to delete:", id);
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            res.status(400).json({ message: "Invalid content ID" });
            return;
        }
        const deleteContent = yield contentModel_1.contentModel.findOneAndDelete({
            _id: id,
            userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId
        });
        if (!deleteContent) {
            res.status(404).json({
                message: "Content not found or you don't have permission"
            });
            return;
        }
        res.status(200).json({
            message: "Content deleted successfully",
            deleteContent,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting content" });
    }
});
exports.deleteData = deleteData;
const checkAuth = (req, res) => {
    res.status(200).json({ isAuthenticated: true });
};
exports.checkAuth = checkAuth;
const updateData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { content } = req.body;
        if (!id) {
            res.status(400).json({ message: "ID is required" });
            return;
        }
        const updatedContent = yield contentModel_1.contentModel.findByIdAndUpdate(id, { content }, { new: true });
        if (!updatedContent) {
            res.status(404).json({ message: "Content not found" });
            return;
        }
        res.json(updatedContent);
        return;
    }
    catch (error) {
        console.error('Update error:', error);
        res.status(500).json({
            message: "Server error",
            error: error instanceof Error ? error.message : String(error)
        });
        return;
    }
});
exports.updateData = updateData;
