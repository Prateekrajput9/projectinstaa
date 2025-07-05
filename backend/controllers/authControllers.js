import generateToken from "../utils/generatetokens.js";
import  User  from "../model/userModel.js";

import getDataUrl from "../utils/urlGenerator.js";
import bcrypt from "bcrypt";
import cloudinary from "cloudinary";

const registerUser = async (req, res) => {
  try {
    const { name, email, password, gender } = req.body;
    const file = req.file;

    if (!name || !email || !password || !gender || !file) {
      return res.status(400).json({
        message: "Please provide all required fields",
      });
    }

    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Convert file buffer to Data URI
    const fileUri = getDataUrl(file);
    const hashedPassword = await bcrypt.hash(password, 10);

    // Upload image to Cloudinary
    const uploadResult = await cloudinary.v2.uploader.upload(fileUri.content, {
      folder: "profilePics", // optional
    });

    // Create new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      gender,
      profilePic: {
        id: uploadResult.public_id,
        url: uploadResult.secure_url,
      },
    });

    // Send token + response
    generateToken(user._id, res);

    res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

export default registerUser;
