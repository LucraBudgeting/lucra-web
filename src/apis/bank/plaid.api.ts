import HttpClient from '@/libs/http/http.client';
import { BaseRepository } from '../base.repository';

export class PlaidApi extends BaseRepository {
  getLinkToken = async (): Promise<string> => {
    const linkToken = await HttpClient.post<{ linkToken: string }>(
      `${this.apiUrl}/api/plaid/link_token`
    );
    return linkToken.linkToken;
  };

  syncLinkedAccounts = async (publicToken: string): Promise<any> => {
    const response = await HttpClient.get<any>(
      `${this.apiUrl}/api/plaid/sync_accounts/${publicToken}`
    );
    return response;
  };
}
