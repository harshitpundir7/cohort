import mongoose from "mongoose";

const contentSchema = new mongoose.Schema({
    userId: {type: mongoose.Types.ObjectId, ref: "User"},
    content: [{type: String}],
    tags: [{type: String}]
})

export const contentModel =  mongoose.model("Content", contentSchema)