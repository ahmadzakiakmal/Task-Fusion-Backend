import express, { Request, Response } from "express";
import { taskManagementServices } from "../services/task-management-service";

const taskManagementRoutes = express.Router();

taskManagementRoutes.get("/:taskId/:userId", taskManagementServices.getOneTask);
taskManagementRoutes.post("/", taskManagementServices.createTask);
taskManagementRoutes.put("/:taskId", taskManagementServices.editTask);
taskManagementRoutes.get("/user/:userId", taskManagementServices.getAllTask);
taskManagementRoutes.delete("/:taskId/:userId", taskManagementServices.deleteTask);

export default taskManagementRoutes;