import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./database/db.js";
import cloudinary from 'cloudinary';
import cookieParser from "cookie-parser";
dotenv.config();
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import messagesRoutes from "./routes/messagesRoutes.js";
import { isAuth } from "./middleware/isAuth.js";
import { Chat } from "./model/chatModel.js";


cloudinary.v2.config( {
cloud_name: process.env.Cloud_name,
api_key:process.env.Cloudinary_api,
api_secret:process.env.Cloudinary_secret,

});
const app = express();
const PORT = process.env.PORT || 5000;
//midddleware 
app.get("/api/messages/chats", isAuth, async (req, res) => {
  try {
    const chats = await Chat.find({
      users: req.user._id,
    }).populate({
      path: "users",
      select: "name profilePic",
    });

    chats.forEach((e) => {
      e.users = e.users.filter(
        (user) => user._id.toString() !== req.user._id.toString()
      );
    });

    res.json(chats);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
app.get("/api/user/all", isAuth, async (req, res) => {
  try {
    const search = req.query.search || "";
    const users = await User.find({
      name: {
        $regex: search,
        $options: "i",
      },
      _id: { $ne: req.user._id },
    }).select("-password");

    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

app.use(express.json());
app.use(cookieParser());
app.get("/", (req, res) => {
  res.send("Hello, world!");
});
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/messages", messagesRoutes);

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => {
  console.error("Failed to connect to DB", err);
});
