import { PlaidLinkOnSuccessMetadata } from 'react-plaid-link';
import HttpClient from '@/libs/http/http.client';
import { BaseRepository } from '../base.repository';

export class PlaidApi extends BaseRepository {
  getLinkToken = async (mode: 'add' | 'update' = 'add', itemId?: string): Promise<string> => {
    const body: any = { mode };
    if (itemId) body.itemId = itemId;
    const linkToken = await HttpClient.post<{ linkToken: string }>(
      `${this.apiUrl}/api/plaid/link_token`,
      body
    );
    return linkToken.linkToken;
  };

  syncLinkedAccounts = async (
    publicToken: string,
    metaData: PlaidLinkOnSuccessMetadata
  ): Promise<any> => {
    const response = await HttpClient.post<any>(
      `${this.apiUrl}/api/plaid/sync_accounts/${publicToken}`,
      metaData
    );
    return response;
  };
}
