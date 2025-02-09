const { Router } = require("express");
const authMiddleware = require("../middleware/authMiddleware")
const { purchaseModel, courseModel } = require("../db")
const courseRouter = Router();

courseRouter.post("/purchase", authMiddleware, async function (req,res){
    const userId = req.userId;
    const courseId = req.body.courseId;
    await purchaseModel.create({
        userId,
        courseId
    })
    res.json({
        message: "You have successfully boughted Course"
    })
})
courseRouter.get("/preview", async function(req, res) {
    const courseId = req.body.courseId;
    
    const courses = await courseModel.findOne({
        courseId
    });

    res.json({
        courses
    })
})

module.exports = courseRouter