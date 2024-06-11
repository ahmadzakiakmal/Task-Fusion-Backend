import axios, { AxiosResponse, isAxiosError } from "axios";
import { Request, Response } from "express";

const projectManagementURL = process.env.PROJECT_MANAGEMENT_SERVICE;

const createProject = (req: Request, res: Response) => {
  const { title, description } = req.body;
  const { userId } = req.params;
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

const getAllProjects = (req: Request, res: Response) => {
  axios
    .get(projectManagementURL + "/projects")
    .then((resp) => {
      res.send(resp.data);
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

const getUserProjects = (req: Request, res: Response) => {
  const { userId } = req.params;
  console.log(userId);
  axios
    .get(projectManagementURL + "/projects?userId=" + userId)
    .then((resp) => {
      res.send(resp.data);
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

const deleteProject = () => {};

const editProject = () => {};

const addMember = () => {};

const removeMember = () => {};

export const projectManagementServices = {
  createProject,
  getAllProjects,
  getUserProjects,
  deleteProject,
  editProject,
  addMember,
  removeMember,
};
