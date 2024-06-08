import axios, { AxiosResponse } from 'axios';

interface Task {
  id: string;
  name: string;
  description?: string;
  projectId: string;
}

class TaskManagementAPI {
  private baseURL: string;

  constructor() {
    this.baseURL = 'http://your-task-management-service-url.com/';
  }

  async getTasks(projectId: string): Promise<Task[]> {
    const response: AxiosResponse<Task[]> = await axios.get(`${this.baseURL}projects/${projectId}/tasks`);
    return response.data;
  }

  async createTask(projectId: string, task: Partial<Task>): Promise<Task> {
    const response: AxiosResponse<Task> = await axios.post(`${this.baseURL}projects/${projectId}/tasks`, task);
    return response.data;
  }
}

export default TaskManagementAPI;
