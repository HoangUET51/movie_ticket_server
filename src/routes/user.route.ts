import UserController from "@/controllers/user.controller";
import { authenticateJwt } from "@/middlewares/auth.middleware";
import express from "express";

const router = express.Router();

const { upLoadAvatar, updateUser } = UserController;
router.post("/update", authenticateJwt, updateUser);
router.post("/upload/avatar", authenticateJwt, upLoadAvatar);

export default router;
