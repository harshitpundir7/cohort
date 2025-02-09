const jwt = require("jsonwebtoken");
const JWT_SECRET = "s3cret";

function auth(req, res, next) {
    const authHeader = req.headers.authorization;

    // Check if Authorization header exists
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token provided" });
    }

    // Extract token from "Bearer <token>"
    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.id;
        next(); // Continue to next middleware
    } catch (error) {
        return res.status(403).json({ message: "Invalid token" });
    }
}

module.exports = { auth, JWT_SECRET };
