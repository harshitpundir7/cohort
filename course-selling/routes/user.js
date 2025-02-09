const {Router} = require("express")
const { userModel, purchaseModel, courseModel } = require("../db");
const jwt = require("jsonwebtoken")
const authMiddleware = require("../middleware/authMiddleware")

const userRouter = Router();

userRouter.post("/signup", async function(req,res){
    const {email,password, fristName, lastName} = req.body;
    await userModel.create({
        email: email,
        password: password,
        fristName: fristName,
        lastName: lastName
    })
    res.json({
        message: "Signd up succesfully"
    })
})
userRouter.post("/signin", async function(req,res){
    const {email,password} = req.body;
    const user = await userModel.findOne({
        email:email,
        password: password
    })
    if (user) {
        const token = jwt.sign({
            id: user._id,
        }, process.env.JWT_SECRET);
        res.json({
            token: token
        })
    } else {
        res.status(403).json({
            message: "Incorrect credentials"
        })
    }
})

userRouter.get("/purchases", authMiddleware, async function(req,res){
    const userId = req.userId
    const purchases = await purchaseModel.find({
        userId,
    });
    let purchasedCourseIds = [];
    for (let i = 0; i<purchases.length;i++){ 
        purchasedCourseIds.push(purchases[i].courseId)
    }
    const coursesData = await courseModel.find({
        _id: { $in: purchasedCourseIds }
    })

    res.json({
        purchases,
        coursesData
    })
})

module.exports = userRouter