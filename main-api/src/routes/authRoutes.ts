import express, { Request, Response } from "express";
import { authServices } from "../services/auth-service";

const authRoutes = express.Router();

authRoutes.post("/signup", authServices.signUp);
authRoutes.post("/signin", authServices.signIn);
authRoutes.get("/me", authServices.myProfile);
authRoutes.post("/forgot-password", authServices.forgotPassword);
authRoutes.post("/reset-password", authServices.resetPassword);

export default authRoutes;
