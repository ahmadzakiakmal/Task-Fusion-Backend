import express, { Request, Response } from "express";
import axios, { AxiosError, isAxiosError } from "axios";
import { projectManagementServices } from "../services/project-management-service";

const projectRoutes = express.Router();

projectRoutes.post("/create/:userId", projectManagementServices.createProject);
projectRoutes.get("/all", projectManagementServices.getAllProjects);
projectRoutes.get("/:userId", projectManagementServices.getUserProjects);
projectRoutes.delete("/:projectId/:userMasterId", projectManagementServices.deleteProject);

export default projectRoutes;
