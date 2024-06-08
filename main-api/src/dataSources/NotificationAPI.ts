import axios, { AxiosResponse } from 'axios';

interface Notification {
  status: string;
  error?: string;
}

class NotificationAPI {
  private baseURL: string;

  constructor() {
    this.baseURL = 'http://localhost:5001/';
  }

  async produceMessage(message: object): Promise<Notification> {
    try {
      const response: AxiosResponse<Notification> = await axios.post(`${this.baseURL}/produce`, message);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Failed to send message: ${error.response?.data || error.message}`);
      }
      throw new Error(`Unexpected error: ${error}`);
    }
  }
}

export default NotificationAPI;
