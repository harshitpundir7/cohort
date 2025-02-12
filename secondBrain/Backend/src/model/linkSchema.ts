import mongoose from "mongoose";

const linkSchema = new mongoose.Schema({
    userId: {type: mongoose.Types.ObjectId, ref: "User"},
    contentId: {type: mongoose.Types.ObjectId,  ref: "Content"},
    linkId:{type: String}
})