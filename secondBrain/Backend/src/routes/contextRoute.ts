import express from "express"
import { verifyToken } from "../middleware/middleware";
import { deleteData, fetchData, postData } from "../controllers/contentControllers";

const app = express();

app.get("/post", verifyToken, fetchData );
app.post("/post", verifyToken, postData);
app.delete("/post:index",  verifyToken, deleteData)

export default app;
