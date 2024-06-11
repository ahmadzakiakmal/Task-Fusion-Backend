import axios, { AxiosResponse, isAxiosError } from "axios";
import { Request, Response } from "express";
import projectRoutes from "../routes/ProjectManagementRoutes";

const notificationURL = process.env.NOTIFICATION_SERVICE;

const produceMessage = (req: Request, res: Response) => {
  const { message } = req.body;
  axios.post(notificationURL + "/produce", {message})
  .then((resp) => {
    res.status(200).send({
      message: message,
      status: resp.data.status
    })
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

export const notificationServices = {
  produceMessage,
};
