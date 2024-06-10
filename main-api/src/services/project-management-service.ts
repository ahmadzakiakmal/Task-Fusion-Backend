import axios, { AxiosResponse, isAxiosError } from "axios";
import { Request, Response } from "express";

const projectManagementURL = process.env.PROJECT_MANAGEMENT_SERVICE;

const createProject = () => {};

const getAllProject = () => {};

const getOneProject = () => {};

const deleteProject = () => {};

const editProject = () => {};

const addMember = () => {};

const removeMember = () => {};

export const projectManagementServices = {
  createProject,
  getAllProject,
  getOneProject,
  deleteProject,
  editProject,
  addMember,
  removeMember,
};
