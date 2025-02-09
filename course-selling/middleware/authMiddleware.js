const jwt = require("jsonwebtoken")

function authMiddleware(req, res, next){
    const token = req.headers.token;
    const decode = jwt.verify(token, process.env.JWT_SECRET)
    if(decode){
        req.userId = decode.id;
        next();
    }else{
        res.status(403).json({
            message: "You are not signed in"
        })
    }
}
module.exports = authMiddleware