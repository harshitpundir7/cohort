import express from "express"
import { connectDatabase } from "./config/connectDb";
import userRoute from "./routes/userRoute"
import contentRoute from "./routes/contextRoute"
const app = express();

app.use(express.json());
connectDatabase();

app.use("/user", userRoute);
app.use("/content", contentRoute);

app.listen(3000);