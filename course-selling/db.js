const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    email: {type: String, unique: true},
    password: String,
    fristName: String,
    lastName: String
})
const adminSchema = new mongoose.Schema({
    email: {type: String, unique: true},
    password: String,
    fristName: String,
    lastName: String
})
const courseSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    imageUrl: String,
    creatorId: mongoose.Types.ObjectId
})
const purchaseSchema = ({
    userId: mongoose.Types.ObjectId,
    courseId: mongoose.Types.ObjectId
})

const userModel = mongoose.model("user", userSchema)
const adminModel = mongoose.model("admin", adminSchema)
const courseModel = mongoose.model("course", courseSchema);
const purchaseModel = mongoose.model("purchases", purchaseSchema);

module.exports= {
    userModel,adminModel,purchaseModel, courseModel
}