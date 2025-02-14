import  { Request, Response } from "express";
import { userModel } from "../model/userSchema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config();


export const signUp = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;

        if (!password) {
             res.status(400).json({ message: "Password is required" });
             return
        }

        console.log("Password received:", password);

        const exist = await userModel.findOne({ email });

        if (exist) {
             res.json({ message: "User Already exist" });
             return
        } else {
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);

            const newUser = await userModel.create({
                name,
                email,
                password: hashPassword
            });

            const token = jwt.sign(
                { userId: newUser._id }, 
                process.env.JWTSECRET!, 
                { expiresIn: "1h" }
            );

            res.cookie('token', token, {
                httpOnly: true,      
                secure: true,            
                sameSite: 'strict',    
                maxAge: 3600000         
            });

             res.status(201).json({ message: "User signed in Successfully" });
             return
        }
    } catch (error) {
        console.log("Error in signUp:", error); 
         res.status(500).json({ message: "Internal server error" });
         return
    }
};


export const signIn =  async(req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const exist = await userModel.findOne({ email });
        
        if(exist) {
            try {
                const validPass = await bcrypt.compare(password, exist.password);
                if(!validPass) {
                    res.json({ message: "Password is invalid" });
                    return;
                }
                
                const token = jwt.sign(
                    { userId: exist._id }, 
                    process.env.JWTSECRET!, 
                    { expiresIn: "7d" }
                );
    
                res.cookie('token', token, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'strict',
                    maxAge: 3600000
                });
    
                res.status(201).json({ message: "You Logged in" });
                return;
            } catch (error) {
                console.log(error);
                res.status(500).json({ message: "Internal server error" });
                return;
            }
        } else {
            res.status(404).json({ message: "User not found" });
            return;
        }
        
    } catch (error) {
        console.log("Error in signUp:", error); 
         res.status(500).json({ message: "Internal server error" });
         return
    }
};

export const signout = async(req:Request, res:Response)=>{
    res.clearCookie("token");
    res.json({message: "You logout Succesfully"})
    return;
};
