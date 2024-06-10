import express, { Request, Response } from "express";
import axios, { AxiosError, isAxiosError } from "axios";
import { authServices } from "../services/auth-service";

const authRoutes = express.Router();

authRoutes.post("/signup", authServices.signUp);
authRoutes.post("/signin", authServices.signIn);
authRoutes.get("/me", authServices.myProfile);
authRoutes.post("/forgot-password", authServices.forgotPassword);

export default authRoutes;
