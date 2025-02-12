import  { Request, Response } from "express";
import { contentModel } from "../model/contentModel";


export const fetchData = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const allContent = await contentModel.find({ userId });

    if (!allContent || allContent.length === 0) {
      res.json({ message: "No content found", data: [] });
      return;
    }
    res.json({ message: "Content found", data: allContent });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

export const postData = async (req: Request, res: Response) => {
  try {
    const { content, tags } = req.body;
    console.log(content);
    const userId = req.user?.userId;
    if (!content) {
      res.status(400).json({ mssage: "Content is Required" });
      return;
    }
    let userContent = await contentModel.findOne({ userId });
    if (!userContent) {
      userContent = await contentModel.create({
        userId,
        content: [content],
        tags: tags || [],
      });
    } else {
      userContent.content.push(content);
      if (tags) {
        userContent.tags.push(...tags);
      }
      await userContent.save();
    }
    res.status(201).json({
      message: "Content posted successfully",
      content: userContent,
    });
    return;
  } catch (error) {
    console.error("Error in posting content:", error);
    res.status(500).json({
      message: "Error posting content",
      error,
    });
    return;
  }
};

export const deleteData =  async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    const index = parseInt(req.params.index);
    const userContent = await contentModel.findOne({ userId });
    if (!userContent) {
      res.status(404).json({ message: "No content found for this user" });
      return;
    }
    if (index < 0 || index > userContent.content.length) {
      res.status(400).json({ message: "Invalid content index" });
      return;
    }
    userContent.content.splice(index, 1);
    await userContent.save();
    res.json({
      message: "Content deleted successfully",
      content: userContent,
    });
    return;
  } catch (error) {
    console.error("Error deleting content:", error);
    res.status(500).json({
      message: "Error deleting content",
      error: error instanceof Error ? error.message : "Unknown error",
    });
    return;
  }
};
