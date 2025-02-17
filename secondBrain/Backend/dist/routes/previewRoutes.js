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
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const middleware_1 = require("../middleware/middleware");
const app = (0, express_1.default)();
app.get("/youtube/:videoId", middleware_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Youtube API Called");
        const { videoId } = req.params;
        const response = yield axios_1.default.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${process.env.YOUTUBE_API_KEY}`);
        const video = response.data.items[0];
        res.json({
            title: video.snippet.title,
            thumbnail: video.snippet.thumbnails.high.url,
            likes: video.statistics.likeCount
        });
    }
    catch (error) {
        console.error('YouTube API Error:', error);
        res.status(500).json({ error: 'Failed to fetch YouTube data' });
    }
}));
app.get("/tweet/:tweetId", middleware_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { tweetId } = req.params;
        const response = yield axios_1.default.get(`https://api.twitter.com/2/tweets/${tweetId}?expansions=attachments.media_keys&media.fields=url&tweet.fields=public_metrics`, {
            headers: {
                Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`
            }
        });
        const tweet = response.data.data;
        res.json({
            text: tweet.text,
            media: ((_b = (_a = tweet.attachments) === null || _a === void 0 ? void 0 : _a.media[0]) === null || _b === void 0 ? void 0 : _b.url) || null,
            likes: tweet.public_metrics.like_count
        });
    }
    catch (error) {
        console.error('Twitter API Error:', error);
        res.status(500).json({ error: 'Failed to fetch Tweet data' });
    }
}));
exports.default = app;
