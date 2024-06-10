import axios, { AxiosResponse } from "axios";
class AuthAPI {
  private baseURL: string;

  constructor() {
    this.baseURL = process.env.AUTH_SERVICE as string;
  }

  async signUp({
    email,
    name,
    password,
    password_confirm,
  }: {
    email: string;
    name: string;
    password: string;
    password_confirm: string;
  }) {
    console.log(this.baseURL)
    try {
      const response: AxiosResponse = await axios.post(`${this.baseURL}/signup`, {
        email,
        name,
        password,
        password_confirm,
      });
      return response.data.token;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Failed to sign up: ${error.response?.data || error.message}`);
      }
      throw new Error(`Unexpected error: ${error}`);
    }
  }

  async signIn({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    console.log(this.baseURL)
    try {
      const response: AxiosResponse = await axios.post(`${this.baseURL}/signin`, {
        email,
        password,
      });
      return response.data.token;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Failed to sign in: ${error.response?.data || error.message}`);
      }
      throw new Error(`Unexpected error: ${error}`);
    }
  }
}

export default AuthAPI;