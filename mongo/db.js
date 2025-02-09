const mongoose = require("mongoose")

const User = mongoose.Schema({
    name: String,
    email: {type: String, unique: true},
    password: String
});

const Todo = mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    title: String,
    done:Boolean
})
const UserModel = mongoose.model("user", User)
const TodoModel = mongoose.model("todo", Todo)

module.exports = {
    UserModel, TodoModel
}