import express from 'express'
import { isAuth } from '../middleware/isAuth.js';
import { followandUnfollowUser, myProfile, updatePassword, updateProfile, userFollowerandFollowingData } from '../controllers/usercontroller.js';
import { userProfile } from '../controllers/usercontroller.js'; 
import uploadFile from '../middleware/multer.js';

const router= express.Router()
router.get("/me",isAuth, myProfile);
router.get("/:id",isAuth,userProfile);
router.get("/:id",isAuth,updatePassword);
router.put("/:id",isAuth, uploadFile,updateProfile);
router.post("/follow/:id",isAuth,followandUnfollowUser);
router.get("/followdata/:id",isAuth,userFollowerandFollowingData);


export default router;