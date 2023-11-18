import AuthController from "@/controllers/auth.controller";
import express from "express";

const router = express.Router();

const { login, registerUser, activateUser } = AuthController;

router.post("/login", login);
router.post("/register", registerUser);
router.post("/activate", activateUser);

export default router;
