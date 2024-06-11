import axios, { AxiosResponse, isAxiosError } from "axios";
import { Request, Response } from "express";
import projectRoutes from "../routes/ProjectManagementRoutes";

const projectManagementURL = process.env.PROJECT_MANAGEMENT_SERVICE;

const createProject = (req: Request, res: Response) => {
  console.log(projectManagementURL);
  const { title, description } = req.body;
  const { userId } = req.params;
  console.log(userId)
  axios
    .post(projectManagementURL + "/projects?userId=" + userId, { title, description })
    .then((resp) => {
      return res.send(resp.data);
    })
    .catch((err) => {
      console.log(err);
      if (isAxiosError(err)) {
        console.log(err);
        return res
          .status(isNaN(Number(err.response?.status)) ? 500 : Number(err.response?.status))
          .send({ error: err.name, detail: err.response?.data });
      }
      res.status(500).send(err);
    });
};

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
