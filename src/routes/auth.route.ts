import AuthController from "@/controllers/auth.controller";
import { authenticateJwt } from "@/middlewares/auth.middleware";
import {
  validateActivateUser,
  validateLogin,
  validateRegisterUser,
} from "@/middlewares/validators/user.validator";
import { validate } from "@/middlewares/validators/validator";
import express from "express";

const router = express.Router();

const { login, registerUser, activateUser, upLoadAvatar } = AuthController;

router.post("/login", validate(validateLogin()), login);
router.post("/register", validate(validateRegisterUser()), registerUser);
router.post("/activate", validate(validateActivateUser()), activateUser);
router.post("/upload/avatar", authenticateJwt, upLoadAvatar);

export default router;
