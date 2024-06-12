import express, { Request, Response } from "express";
import { taskManagementServices } from "../services/task-management-service";
import { notificationServices } from "../services/notification-service";

const taskManagementRoutes = express.Router();

taskManagementRoutes.get("/:taskId/:userId", taskManagementServices.getOneTask);
taskManagementRoutes.post("/", taskManagementServices.createTask, notificationServices.produceMessage);
taskManagementRoutes.put("/:taskId", taskManagementServices.editTask, notificationServices.produceMessage);
taskManagementRoutes.get("/user/:userId", taskManagementServices.getAllTask);
taskManagementRoutes.delete("/:taskId/:userId", taskManagementServices.deleteTask, notificationServices.produceMessage);

export default taskManagementRoutes;