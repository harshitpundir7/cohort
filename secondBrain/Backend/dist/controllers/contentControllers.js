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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteData = exports.postData = exports.fetchData = void 0;
const contentModel_1 = require("../model/contentModel");
const fetchData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
        if (!userId) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const allContent = yield contentModel_1.contentModel.find({ userId });
        if (!allContent || allContent.length === 0) {
            res.json({ message: "No content found", data: [] });
            return;
        }
        res.json({ message: "Content found", data: allContent });
    }
    catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});
exports.fetchData = fetchData;
const postData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { content, tags } = req.body;
        console.log(content);
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
        if (!content) {
            res.status(400).json({ mssage: "Content is Required" });
            return;
        }
        let userContent = yield contentModel_1.contentModel.findOne({ userId });
        if (!userContent) {
            userContent = yield contentModel_1.contentModel.create({
                userId,
                content: [content],
                tags: tags || [],
            });
        }
        else {
            userContent.content.push(content);
            if (tags) {
                userContent.tags.push(...tags);
            }
            yield userContent.save();
        }
        res.status(201).json({
            message: "Content posted successfully",
            content: userContent,
        });
        return;
    }
    catch (error) {
        console.error("Error in posting content:", error);
        res.status(500).json({
            message: "Error posting content",
            error,
        });
        return;
    }
});
exports.postData = postData;
const deleteData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
        const index = parseInt(req.params.index);
        const userContent = yield contentModel_1.contentModel.findOne({ userId });
        if (!userContent) {
            res.status(404).json({ message: "No content found for this user" });
            return;
        }
        if (index < 0 || index > userContent.content.length) {
            res.status(400).json({ message: "Invalid content index" });
            return;
        }
        userContent.content.splice(index, 1);
        yield userContent.save();
        res.json({
            message: "Content deleted successfully",
            content: userContent,
        });
        return;
    }
    catch (error) {
        console.error("Error deleting content:", error);
        res.status(500).json({
            message: "Error deleting content",
            error: error instanceof Error ? error.message : "Unknown error",
        });
        return;
    }
});
exports.deleteData = deleteData;
