import HttpClient from '@/libs/http/http.client';
import { BaseRepository } from '../base.repository';

type onboardingUserResponse = { message: string; token: string; checkoutUrl: string };

export class OnboardingApi extends BaseRepository {
  doesAccountWithEmailExist = async (email: string): Promise<{ message: string }> => {
    return await HttpClient.get<{ message: string }>(
      `${this.apiUrl}/api/onboarding/does_email_already_exist/${email}`
    );
  };

  createAccount = async (
    email: string,
    fullName: string,
    password: string
  ): Promise<onboardingUserResponse> => {
    return await HttpClient.post<onboardingUserResponse>(
      `${this.apiUrl}/api/onboarding/create_account`,
      { email, fullName, password }
    );
  };

  getUser = async (userId: string): Promise<onboardingUserResponse> => {
    return await HttpClient.get<onboardingUserResponse>(
      `${this.apiUrl}/api/onboarding/user/${userId}`
    );
  };
}
