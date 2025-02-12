import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDatabase = async ()=> {
    try {
        const uri = process.env.MONGOURI;
        console.log(uri);
        if (!uri) {
            throw new Error("MONGOURI is not defined in the environment variables.");
        }

        await mongoose.connect(uri);
        console.log("Database connected!");
    } catch (error) {
        console.error("Database connection error:", error);
        process.exit(1);
    }
};