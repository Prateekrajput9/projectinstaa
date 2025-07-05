import express from 'express'
import { isAuth } from '../middleware/isAuth.js';
import { followandUnfollowUser, myProfile } from '../controllers/usercontroller.js';
import { userProfile } from '../controllers/usercontroller.js';
const router= express.Router()
router.get("/me",isAuth, myProfile);
router.get("/:id",isAuth,userProfile);
router.get("/follow/:id",isAuth,followandUnfollowUser);

export default router;