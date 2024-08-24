import HttpClient from '@/libs/http/http.client';
import { BaseRepository } from '../base.repository';

export class UserFeedbackApi extends BaseRepository {
  sendFeedback = async (feedback: string): Promise<void> => {
    return HttpClient.post(`${this.apiUrl}/api/userFeedback`, { feedback });
  };
}
