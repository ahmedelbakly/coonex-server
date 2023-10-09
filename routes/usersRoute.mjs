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
} from "../controller/userController.mjs";
const router = Router();
import { upload } from "../multer.mjs";
import auth from "../models/auth.mjs";

import authGet from "../models/auth2.mjs";

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
