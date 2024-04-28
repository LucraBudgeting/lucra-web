import HttpClient from '@/libs/http/http.client';
import { BaseRepository } from '../base.repository';

export class PlaidApi extends BaseRepository {
  getLinkToken = async (): Promise<string> => {
    const linkToken = await HttpClient.post<{ linkToken: string }>(
      `${this.apiUrl}/api/plaid/link_token`
    );
    return linkToken.linkToken;
  };

  exchangePublicToken = async (publicToken: string): Promise<any> => {
    const accessToken = await HttpClient.get<any>(
      `${this.apiUrl}/api/plaid/exchange_token/${publicToken}`
    );
    return accessToken;
  };

  getAccounts = async (): Promise<any> => {
    const accounts = await HttpClient.get<any>(`${this.apiUrl}/api/plaid/accounts`);
    return accounts;
  };

  getTransactions = async (): Promise<any> => {
    const transactions = await HttpClient.get<any>(`${this.apiUrl}/api/plaid/transactions`);
    return transactions;
  };

  getRecurringTransactions = async (): Promise<any> => {
    const recurringTransactions = await HttpClient.get<any>(
      `${this.apiUrl}/api/plaid/recurring_transactions`
    );
    return recurringTransactions;
  };
}
