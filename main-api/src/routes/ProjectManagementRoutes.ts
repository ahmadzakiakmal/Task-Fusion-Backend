import express, { Request, Response } from "express";
import axios, { AxiosError, isAxiosError } from "axios";
import { projectManagementServices } from "../services/project-management-service";

const projectRoutes = express.Router();

projectRoutes.post("/create/:userId", projectManagementServices.createProject);
projectRoutes.get("/all", projectManagementServices.getAllProjects);
projectRoutes.get("/:projectId", projectManagementServices.getOneProject);
projectRoutes.delete("/:projectId/:userMasterId", projectManagementServices.deleteProject);
projectRoutes.put("/:projectId", projectManagementServices.editProject);
projectRoutes.post("/member/:projectId", projectManagementServices.addMember);
projectRoutes.delete("/member/:projectId/:userId/:userMasterId", projectManagementServices.removeMember);

export default projectRoutes;
