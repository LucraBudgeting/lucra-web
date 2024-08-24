import HttpClient from '@/libs/http/http.client';
import { BaseRepository } from '../base.repository';
import { GuideType, userGuideType } from './guide.type';

export class UserGuideApi extends BaseRepository {
  getGuideAndProgress = async (): Promise<{
    guides: GuideType[];
    progress: Record<string, userGuideType>;
  }> => {
    return HttpClient.get(`${this.apiUrl}/api/userGuides`);
  };

  markGuideAsComplete = async (guideId: string): Promise<void> => {
    return HttpClient.put(`${this.apiUrl}/api/userGuides/${guideId}`);
  };
}
