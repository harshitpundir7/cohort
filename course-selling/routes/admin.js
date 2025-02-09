const {Router} = require("express")
const adminRouter = Router();
const {adminModel, courseModel} = require("../db")
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/authMiddleware");


adminRouter.post("/signup", async function(req,res){
    const {email, password, fristName, lastName} = req.body
    await adminModel.create({
        email: email,
        password: password,
        fristName: fristName,
        lastName:lastName
    })
    res.json({
        mssage: "Signup Succesfully"
    })
})

adminRouter.post("/signin", async function(req,res){
    const {email, password} = req.body;
    const admin = await adminModel.findOne({
        email: email,
        password: password
    })

    if(admin){
        const token = jwt.sign({
            id: admin._id
        }, process.env.JWT_SECRET)
        res.json({
            token: token
        })
    }else{
        res.status(404).json({
            message: "user not found"
        })
    }
})
adminRouter.post("/course", authMiddleware, async function(req,res){
    const adminId = req.userId;
    const { title, description, imageUrl, price } = req.body;
    const course = await courseModel.create({
        title: title, 
        description: description, 
        imageUrl: imageUrl, 
        price: price, 
        creatorId: adminId
    })

    res.json({
        message: "Course created",
        courseId: course._id
    })

})

adminRouter.put("/course", authMiddleware, async function(req,res){
    const adminId = req.userId;
    const { title, description, imageUrl, price, courseId } = req.body;
    const course = await courseModel.updateOne({
        _id: courseId, 
        creatorId: adminId 
    }, {
        title: title, 
        description: description, 
        imageUrl: imageUrl, 
        price: price
    })
    res.json({
        message: "Course updated",
        courseId: course._id
    })
})

adminRouter.get("/course-bulk", authMiddleware, async function(req,res){
    const adminId = req.userId;

    const courses = await courseModel.find({
        creatorId: adminId 
    });

    res.json({
        message: "Course updated",
        courses
    })
})

module.exports = adminRouter