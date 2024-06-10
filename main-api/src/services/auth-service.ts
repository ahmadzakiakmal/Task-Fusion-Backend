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

const signIn = (req: Request, res: Response) => {
  const { email, password } = req.body;
  axios
    .post(authURL + "/signin", { email, password })
    .then((resp) => {
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

const myProfile = (req: Request, res: Response) => {
  axios
    .get(authURL + "/users/me", { withCredentials: true })
    .then((resp) => {
      res.send(resp.data);
    })
    .catch((err) => {
      if (isAxiosError(err)) {
        console.log(err.response);
        return res.status(Number(err.response?.status)).send({ error: err.name, detail: err.response?.data });
      }
      res.status(500).send(err);
    });
};

const forgotPassword = (req: Request, res: Response) => {
  const { email } = req.body;
  axios
    .post(authURL + "/forgot-pw", { email })
    .then((resp) => {
      res.send(resp.data);
    })
    .catch((err) => {
      if (isAxiosError(err)) {
        console.log(err);
        return res
          .status(isNaN(Number(err.response?.status)) ? 500 : Number(err.response?.status))
          .send({ error: err.name, detail: err.response?.data });
      }
      console.log(err);
      res.status(500).send(err);
    });
};

const resetPassword = (req: Request, res: Response) => {};

export const authServices = { signUp, signIn, myProfile, forgotPassword, resetPassword };
