import ProjectManagementAPI from '../dataSources/ProjectManagementAPI';
import TaskManagementAPI from '../dataSources/TaskManagementAPI';
import NotificationAPI from '../dataSources/NotificationAPI';

const projectManagementAPI = new ProjectManagementAPI();
const taskManagementAPI = new TaskManagementAPI();
const notificationAPI = new NotificationAPI();

const root = {
  getProjects: async () => {
    return projectManagementAPI.getProjects();
  },
  getTasks: async ({ projectId }: { projectId: string }) => {
    return taskManagementAPI.getTasks(projectId);
  },
  createProject: async ({ name, description }: { name: string; description: string }) => {
    return projectManagementAPI.createProject({ name, description });
  },
  createTask: async ({ projectId, name, description }: { projectId: string; name: string; description: string }) => {
    return taskManagementAPI.createTask(projectId, { name, description });
  },
  sendNotification: async ({ message }: { message: string }) => {
    return notificationAPI.produceMessage({ message });
  },
};

export default root;
