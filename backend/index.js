import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./database/db.js";
import cloudinary from 'cloudinary';
import cookieParser from "cookie-parser";
dotenv.config();
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";


cloudinary.v2.config({
cloud_name: process.env.Cloud_name,
api_key:process.env.Cloudinary_api,
api_secret:process.env.Cloudinary_secret,

});
const app = express();
const PORT = process.env.PORT || 5000;
//midddleware 
app.use(express.json());
app.use(cookieParser());
app.get("/", (req, res) => {
  res.send("Hello, world!");
});
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);


connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => {
  console.error("Failed to connect to DB", err);
});
