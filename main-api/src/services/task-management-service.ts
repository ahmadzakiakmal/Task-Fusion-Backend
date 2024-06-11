import axios, { AxiosResponse, isAxiosError } from "axios";
import { Request, Response } from "express";

const taskManagementURL = process.env.TASK_MANAGEMENT_SERVICE;

const getOneTask = (req: Request, res: Response) => {
  const { taskId, userId } = req.params;
  console.log(taskManagementURL + `/tasks/${taskId}?userId=${userId}`);
  axios
    .get(taskManagementURL + `/tasks/${taskId}?userId=${userId}`)
    .then((resp) => {
      res.send(resp.data);
      console.log("response:", resp)
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

const editTask = (req: Request, res: Response) => {
  const { userId, title, description, milestone, deadline } = req.body;
  const { taskId } = req.params;
  axios
    .put(taskManagementURL + "/tasks/" + taskId, { userId, title, description, milestone, deadline })
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

const deleteTask = (req: Request, res: Response) => {};

const getAllTask = (req: Request, res: Response) => {
  const { userId } = req.params;
  axios
    .get(taskManagementURL + "/tasks?userId=" + userId)
    .then((resp) => {
      res.send({
        userId,
        tasks: resp.data,
      });
    })
    .catch((err) => {
      if (isAxiosError(err)) {
        // console.log(err.response?.data);
        return res.status(Number(err.response?.status)).send({ error: err.name, detail: err.response?.data });
      }
      res.status(500).send(err);
    });
};

export const taskManagementServices = { getOneTask, createTask, editTask, deleteTask, getAllTask };
