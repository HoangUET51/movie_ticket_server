import UserController from "@/controllers/user.controller";
import { authenticateJwt } from "@/middlewares/auth.middleware";
import { validateEmail } from "@/middlewares/validators/user.validator";
import { validate } from "@/middlewares/validators/validator";
import express from "express";

const router = express.Router();

const { upLoadAvatar, updateUser, forgotPassword, changePassword } =
  UserController;
router.post("/update", authenticateJwt, updateUser);
router.post("/upload/avatar", authenticateJwt, upLoadAvatar);
router.post("/change-password", authenticateJwt, changePassword);
router.post("/forgot-password", validate(validateEmail()), forgotPassword);

export default router;
