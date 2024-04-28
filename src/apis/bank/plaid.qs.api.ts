import HttpClient from '@/libs/http/http.client';
import { BaseRepository } from '../base.repository';

export class QsPlaidApi extends BaseRepository {
  getLinkToken = async (): Promise<string> => {
    const linkToken = await HttpClient.post<{ linkToken: string }>(
      `${this.apiUrl}/api/plaid/qs/link_token`
    );
    return linkToken.linkToken;
  };

  exchangePublicToken = async (publicToken: string): Promise<any> => {
    const accessToken = await HttpClient.get<any>(
      `${this.apiUrl}/api/plaid/qs/exchange_token/${publicToken}`
    );
    return accessToken;
  };

  getAccounts = async (): Promise<any> => {
    const accounts = await HttpClient.get<any>(`${this.apiUrl}/api/plaid/qs/accounts`);
    return accounts;
  };

  getTransactions = async (): Promise<any> => {
    const transactions = await HttpClient.get<any>(`${this.apiUrl}/api/plaid/qs/transactions`);
    return transactions;
  };

  getRecurringTransactions = async (): Promise<any> => {
    const recurringTransactions = await HttpClient.get<any>(
      `${this.apiUrl}/api/plaid/qs/recurring_transactions`
    );
    return recurringTransactions;
  };
}
