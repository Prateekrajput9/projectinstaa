import express from 'express'
import  {logoutUser, registerUser}  from '../controllers/authControllers.js'
import { loginUser } from '../controllers/authControllers.js';

import uploadFile from "../middleware/multer.js"; //
const router = express.Router();

router.post("/register", uploadFile,registerUser);
router.post("/login",loginUser);
router.post("/logout",logoutUser);

export default router; // <-- THIS LINE IS REQUIRED FOR DEFAULT EXPORT
