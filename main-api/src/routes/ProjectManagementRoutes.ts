import express, { Request, Response } from "express";
import axios, { AxiosError, isAxiosError } from "axios";
import { projectManagementServices } from "../services/project-management-service";

const projectRoutes = express.Router();

// projectRoutes.post("/create", projectManagementServices.createProject)

export default projectRoutes;