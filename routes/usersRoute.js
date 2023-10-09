import { Router } from "express";
import {
  createUser,
  createUserBus,
  updateUser,
  updateUserImage,
  loginUser,
  createRefreshToken,
  updateUserPass,
  getUser
} from "../controller/userController.cjs";
const router = Router();
import { upload } from "../multer.cjs";
import auth from "../models/auth.cjs";

import authGet from "../models/auth2.cjs";

// define the home page route

router.post("/user", createUser);
router.post("/user/login", loginUser);
router.post("/userBus", createUserBus);
router.patch("/user", auth, updateUser);
router.post("/refreshToken", createRefreshToken);
router.post("/user/avatar", upload.single("img"), updateUserImage);
router.patch("/user/pass", auth, updateUserPass);
router.post("/getUser", authGet, getUser);

export default router;
