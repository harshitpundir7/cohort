import mongoose from 'mongoose';
import { Request, Response } from "express";
import { contentModel } from "../model/contentModel";


export const fetchData = async(req:Request, res:Response)=>{
  try {
    const userId = req.user?.userId;
    const data = await contentModel.find({
      userId: userId
    });
    if(data){
      res.json(data);
    }
    else{
      res.json({ message: "No Content Found" });
    }
  } catch (error) {
    console.log(error);
    res.status(403).json({messagae: "Error in Fetching Data"})
  }
}

export const postData = async(req:Request, res:Response)=>{
  try {
    console.log("hello");
    const userId = req.user?.userId;
    console.log("UserID:", userId); 
    const {content, tags,preview }= req.body;
    await contentModel.create({
      userId: userId,
    
      content: content,
      tags: tags,
      preview: preview 
    })
    res.json({ message: "Content added" })
    return;
  } catch (error) {
    console.log(error);
    res.status(403).json({message: "Unable to create Content"})
    return;
  }
}

export const deleteData = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log("Content ID to delete:", id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "Invalid content ID" });
      return;
    }

    const deleteContent = await contentModel.findOneAndDelete({
      _id: id, 
      userId: req.user?.userId 
    });

    if (!deleteContent) {
      res.status(404).json({ 
        message: "Content not found or you don't have permission" 
      });
      return;
    }

    res.status(200).json({
      message: "Content deleted successfully",
      deleteContent,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting content" });
  }
}

export const checkAuth = (req: Request, res: Response) => {
  res.status(200).json({ isAuthenticated: true });
}

export const updateData = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; 
    const { content } = req.body;

    if (!id) {
       res.status(400).json({ message: "ID is required" });
       return
    }

    const updatedContent = await contentModel.findByIdAndUpdate(
      id,
      { content },
      { new: true }
    );

    if (!updatedContent) {
       res.status(404).json({ message: "Content not found" });
       return
    }

     res.json(updatedContent);
     return
  } catch (error) {
    console.error('Update error:', error);
     res.status(500).json({ 
      message: "Server error", 
      error: error instanceof Error ? error.message : String(error)
    });
    return
  }
}
