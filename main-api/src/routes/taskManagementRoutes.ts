import express, { Request, Response } from "express";
import { taskManagementServices } from "../services/task-management-service";

const taskManagementRoutes = express.Router();

taskManagementRoutes.get("/", taskManagementServices.createTask);
taskManagementRoutes.post("/:taskId/:projectId", taskManagementServices.getOneTask);

export default taskManagementRoutes;