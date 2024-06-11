import express, { Request, Response } from "express";
import axios, { AxiosError, isAxiosError } from "axios";
import { notificationServices } from "../services/notification-service";

const notificationRoutes = express.Router();

notificationRoutes.post("/produce", notificationServices.produceMessage)

export default notificationRoutes;
