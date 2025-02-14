import express from "express"
import { verifyToken } from "../middleware/middleware";
import { checkAuth, deleteData, fetchData, postData, updateData } from "../controllers/contentControllers";

const app = express();

app.get("/post", verifyToken, fetchData );
app.post("/post", verifyToken, postData);
app.delete("/post/:id", verifyToken, deleteData);
app.put("/post/:id", verifyToken, updateData);
app.get("/check-auth", verifyToken, checkAuth)

export default app;
