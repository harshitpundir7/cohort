import express from "express"
import { signout, signIn, signUp } from "../controllers/userControllers";
const app = express();

app.post("/signup", signUp)
app.post("/signin", signIn)
app.post("/signout", signout)

export default app;



