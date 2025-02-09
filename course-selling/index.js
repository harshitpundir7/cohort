const dotenv = require("dotenv")
const express = require("express")
const mongoose = require("mongoose")
dotenv.config();

const app = express();
app.use(express.json())


const userRoutes = require("./routes/user")
const adminRoutes = require("./routes/admin")
const courseRoutes = require("./routes/course")

app.use("/user", userRoutes);
app.use("/course", courseRoutes);
app.use("/admin", adminRoutes)

async function main() {
    await mongoose.connect(process.env.MONGO_URI)
    app.listen(3000)
    console.log("Listening on the port 3000")
    
}

main();

