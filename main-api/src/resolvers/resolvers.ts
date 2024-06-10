import NotificationAPI from '../dataSources/NotificationAPI';

// const projectManagementAPI = new ProjectManagementAPI();
// const taskManagementAPI = new TaskManagementAPI();
const notificationAPI = new NotificationAPI();

const root = {
  sendNotification: async ({ message }: { message: string }) => {
    return notificationAPI.produceMessage({ message });
  },
};

export default root;
