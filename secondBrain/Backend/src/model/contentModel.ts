import mongoose from "mongoose";

const contentSchema = new mongoose.Schema({
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
})

export const contentModel =  mongoose.model("Content", contentSchema)