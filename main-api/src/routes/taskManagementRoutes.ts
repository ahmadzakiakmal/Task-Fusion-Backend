import express, { Request, Response } from "express";
import { taskManagementServices } from "../services/task-management-service";

const taskManagementRoutes = express.Router();

taskManagementRoutes.post("/", taskManagementServices.createTask);

export default taskManagementRoutes;