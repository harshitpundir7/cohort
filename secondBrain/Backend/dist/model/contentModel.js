"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contentModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const contentSchema = new mongoose_1.default.Schema({
    userId: { type: String, required: true },
    content: { type: String, required: true },
    tags: { type: String, required: true },
    preview: {
        title: String,
        thumbnail: String,
        likes: String,
        text: String,
        media: String
    }
});
exports.contentModel = mongoose_1.default.model("Content", contentSchema);
