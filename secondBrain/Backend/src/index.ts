import express from "express";
import cors from "cors";  // Import CORS package
import { connectDatabase } from "./config/connectDb";
import userRoute from "./routes/userRoute";
import contentRoute from "./routes/contentRoute";
import previewRoutes from "./routes/previewRoutes";

const app = express();

// Enable CORS
app.use(cors({
  origin: "http://localhost:5173", // Replace with your frontend URL (e.g., Vite dev server)
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,  // Allow cookies to be sent with requests
}));

app.use(express.json());
connectDatabase();

app.use("/user", userRoute);
app.use("/content", contentRoute);
app.use("/preview", previewRoutes);

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
