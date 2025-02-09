const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { UserModel, TodoModel } = require("./db");
const { auth, JWT_SECRET } = require("./auth");

const app = express(); // Corrected from Router to app
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/todoApp");

app.post("/signup", async function (req, res) {
    const { email, password, name } = req.body;
    await UserModel.create({ email, password, name });
    res.json({ message: "User created successfully" });
});

app.post("/signin", async function (req, res) {
    const { email, password } = req.body;
    const response = await UserModel.findOne({ email, password });

    if (response) {
        let token = jwt.sign({ id: response._id.toString() }, JWT_SECRET);
        res.json({ token });
    } else {
        res.status(403).json({ message: "Incorrect creds" });
    }
});

app.post("/todo", auth, async function (req, res) {
    const { title } = req.body;
    const userId = req.userId;

    await TodoModel.create({ title, userId });
    res.json({ userId });
});

app.get("/todos", auth, async function (req, res) {
    const userId = req.userId;
    const todos = await TodoModel.find({ userId });
    res.json({ todos });
});

app.listen(3000, () => console.log("Server running on port 3000"));
