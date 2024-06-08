import axios, { AxiosResponse } from "axios";

interface Project {
  id: string;
  name: string;
  description?: string;
}

class ProjectManagementAPI {
  private baseURL: string;

  constructor() {
    this.baseURL = "http://your-project-management-service-url.com/";
  }

  async getProjects(): Promise<Project[]> {
    const response: AxiosResponse<Project[]> = await axios.get(`${this.baseURL}projects`);
    return response.data;
  }

  async createProject(project: Partial<Project>): Promise<Project> {
    const response: AxiosResponse<Project> = await axios.post(`${this.baseURL}projects`, project);
    return response.data;
  }
}

export default ProjectManagementAPI;
