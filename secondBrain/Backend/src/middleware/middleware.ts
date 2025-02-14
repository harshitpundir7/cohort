import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

declare global {
    namespace Express {
        interface Request {
            user?: {
                userId: string;
            };
        }
    }
}

export const verifyToken = async (
    req: Request, 
    res: Response, 
    next: NextFunction
) => {
    try {
        const cookie = req.headers.cookie;
        const token = cookie?.split("=")[1];
        console.log(token)
        if (!token) {
            res.status(401).json({ message: "No token, authorization denied" });
            return;
        }

        try {
            if(!process.env.JWTSECRET){
                throw new Error("JWT SECRET NOT FOUND")
            }
            const decoded = jwt.verify(token, process.env.JWTSECRET) as {
                userId: string;
            };
            req.user = decoded;
            next(); 
        } catch (error) {
            res.status(401).json({ message: "Token is not valid" });
            return;
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
        return;
    }
};