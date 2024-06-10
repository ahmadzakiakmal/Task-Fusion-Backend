import axios, { AxiosResponse, isAxiosError } from "axios";
import { Request, Response } from "express";

const authURL = process.env.AUTH_SERVICE;
const signUp = (req: Request, res: Response) => {
  const {
    email,
    name,
    password,
    password_confirm,
  }: { email: string; name: string; password: string; password_confirm: string } = req.body;
  console.log({ email, name, password, password_confirm });
  axios
    .post(authURL + "/signup", {
      email,
      name,
      password,
      password_confirm,
    })
    .then((resp) => {
      console.log(resp.data);
      res.send(resp.data);
    })
    .catch((err) => {
      if (isAxiosError(err)) {
        console.log(err.response?.data);
        return res.status(Number(err.response?.status)).send({ error: err.name, detail: err.response?.data });
      }
      res.status(500).send(err);
    });
};

export const authServices = { signUp };
