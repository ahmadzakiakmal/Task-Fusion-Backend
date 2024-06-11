import axios, { AxiosResponse, isAxiosError } from "axios";
import { Request, Response } from "express";

const taskManagementURL = process.env.TASK_MANAGEMENT_SERVICE;

const getOneTask = (req: Request, res: Response) => {
  const { taskId, userId } = req.params;
  axios
    .post(taskManagementURL + `/tasks/${taskId}?userId=${userId}`)
    .then((resp) => {
      res.send(resp.data);
    })
    .catch((err) => {
      console.log(err);
      if (isAxiosError(err)) {
        console.log(err.response?.data);
        return res.status(Number(err.response?.status)).send({ error: err.name, detail: err.response?.data });
      }
      res.status(500).send(err);
    });
};

const createTask = (req: Request, res: Response) => {
  const { userId, title, description, milestone, deadline } = req.body;
  axios
    .post(taskManagementURL + "/tasks", { userId, title, description, milestone, deadline })
    .then((resp) => res.send(resp.data))
    .catch((err) => {
      console.log(err);
      if (isAxiosError(err)) {
        console.log(err.response?.data);
        return res.status(Number(err.response?.status)).send({ error: err.name, detail: err.response?.data });
      }
      res.status(500).send(err);
    });
};

const editTask = (req: Request, res: Response) => {};

const deleteTask = (req: Request, res: Response) => {};

const getAllTask = (req: Request, res: Response) => {};

export const taskManagementServices = { getOneTask, createTask, editTask, deleteTask, getAllTask };
