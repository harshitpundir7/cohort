import  { Request, Response } from "express";
import { userModel } from "../model/userSchema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config();


export const signUp = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    const exist = await userModel.findOne({ email });
    
    if (exist) {
        res.json({ message: "User Already exist" });
        return;
    } else {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        
        const newUser = await userModel.create({
            name,
            email,
            password: hashPassword
        });
        console.log(process.env.JWTSECRET);
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

         res.status(201).json({ 
            message: "User signed in Successfully"
        });
    }
};

export const signIn =  async(req: Request, res: Response) => {
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
};

export const signout = async(req:Request, res:Response)=>{
    res.clearCookie("token");
    res.json({message: "You logout Succesfully"})
    return;
};
