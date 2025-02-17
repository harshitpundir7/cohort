import express from "express";
import axios from "axios";
import { verifyToken } from "../middleware/middleware";

const app = express();

app.get("/youtube/:videoId", verifyToken, async (req, res) => {
  try {
    console.log("Youtube API Called");
    const { videoId } = req.params;
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${process.env.YOUTUBE_API_KEY}`
    );
    
    const video = response.data.items[0];
    res.json({
      title: video.snippet.title,
      thumbnail: video.snippet.thumbnails.high.url,
      likes: video.statistics.likeCount
    });
  } catch (error) {
    console.error('YouTube API Error:', error);
    res.status(500).json({ error: 'Failed to fetch YouTube data' });
  }
});

app.get("/tweet/:tweetId", verifyToken, async (req, res) => {
  try {
    const { tweetId } = req.params;
    const response = await axios.get(
      `https://api.twitter.com/2/tweets/${tweetId}?expansions=attachments.media_keys&media.fields=url&tweet.fields=public_metrics`,
      {
        headers: {
          Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`
        }
      }
    );
    
    const tweet = response.data.data;
    res.json({
      text: tweet.text,
      media: tweet.attachments?.media[0]?.url || null,
      likes: tweet.public_metrics.like_count
    });
  } catch (error) {
    console.error('Twitter API Error:', error);
    res.status(500).json({ error: 'Failed to fetch Tweet data' });
  }
});

export default app;