import NotificationAPI from "../dataSources/NotificationAPI";
import AuthAPI from "../dataSources/AuthAPI";

// const projectManagementAPI = new ProjectManagementAPI();
// const taskManagementAPI = new TaskManagementAPI();
const notificationAPI = new NotificationAPI();
const authAPI = new AuthAPI();

const root = {
  sendNotification: async ({ message }: { message: string }) => {
    return notificationAPI.produceMessage({ message });
  },
  signUp: async ({
    email,
    name,
    password,
    password_confirm,
  }: {
    email: string;
    name: string;
    password: string;
    password_confirm: string;
  }) => {
    return authAPI.signUp({ email, name, password, password_confirm });
  },
  signIn: async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    return authAPI.signIn({ email, password });
  },
};

export default root;

