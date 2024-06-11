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

const getOneProject = (req: Request, res: Response) => {
  const { projectId } = req.params;
  console.log(projectId);
  axios
    .get(projectManagementURL + "/projects/" + projectId)
    .then((resp) => {
      res.send({
        userId: projectId,
        projectManagementServices: resp.data,
      });
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

const deleteProject = (req: Request, res: Response) => {
  const { projectId, userMasterId } = req.params;
  axios
    .delete(projectManagementURL + `/projects/${projectId}?userMasterId=${userMasterId}`)
    .then((resp) => {
      res.send(resp.data);
    })
    .catch((err) => {
      // console.log(err);
      if (isAxiosError(err)) {
        // console.log(err);
        return res
          .status(isNaN(Number(err.response?.status)) ? 500 : Number(err.response?.status))
          .send({ error: err.name, detail: err.response?.data });
      }
      res.status(500).send(err);
    });
};

const editProject = (req: Request, res: Response) => {
  const { title, description } = req.body;
  const { projectId } = req.params;
  axios
    .put(projectManagementURL + "/projects/" + projectId, { title, description })
    .then((resp) => {
      res.send(resp.data);
    })
    .catch((err) => {
      if (isAxiosError(err)) {
        // console.log(err);
        return res
          .status(isNaN(Number(err.response?.status)) ? 500 : Number(err.response?.status))
          .send({ error: err.name, detail: err.response?.data });
      }
      res.status(500).send(err);
    });
};

const addMember = (req: Request, res: Response) => {
  const { userId, projectId } = req.body;
  const { userMasterId } = req.params;
  axios
    .post(projectManagementURL + "/projects/invite?userMasterId=" + userMasterId, { userId, projectId })
    .then((resp) => {
      res.send(resp.data);
    })
    .catch((err) => {
      if (isAxiosError(err)) {
        // console.log(err);
        return res
          .status(isNaN(Number(err.response?.status)) ? 500 : Number(err.response?.status))
          .send({ error: err.name, detail: err.response?.data });
      }
      res.status(500).send(err);
    });
};

const removeMember = (req: Request, res: Response) => {
  const { userMasterId, userId, projectId } = req.params;
  axios
    .delete(
      projectManagementURL + `/projects/kick?userMasterId=${userMasterId}&userId=${userId}&projectId=${projectId}`
    )
    .then((resp) => {
      res.send(resp.data);
    })
    .catch((err) => {
      if (isAxiosError(err)) {
        // console.log(err);
        return res
          .status(isNaN(Number(err.response?.status)) ? 500 : Number(err.response?.status))
          .send({ error: err.name, detail: err.response?.data });
      }
      res.status(500).send(err);
    });
};

export const projectManagementServices = {
  createProject,
  getAllProjects,
  getOneProject,
  deleteProject,
  editProject,
  addMember,
  removeMember,
};
