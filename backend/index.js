import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import nodemailer from "nodemailer";

dotenv.config();

const port = process.env.PORT || 5000;
const app = express();



app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));


app.use(express.json());
app.use(cookieParser());
app.use("/api/auth",authRouter);
app.use("/api/user", userRouter);


app.get("/",(req,res)=> {
    res.send("Hello from Node");
    
})
const startServer = async () => {
    try {
        await connectDb();
        app.listen(port, () => {
            console.log("Server running on port", port);
        });
    } catch (error) {
        console.log("Server failed to start:", error.message);
    }
};

startServer();