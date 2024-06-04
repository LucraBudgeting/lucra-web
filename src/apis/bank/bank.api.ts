import HttpClient from '@/libs/http/http.client';
import { BaseRepository } from '../base.repository';
import { IBankAccount } from '@/types/models/bank/BankAccount';

export default class BankApi extends BaseRepository {
  getBankAccounts = async (): Promise<{ bankAccounts: IBankAccount[]; message: string }> => {
    const response = await HttpClient.get<{ bankAccounts: IBankAccount[]; message: string }>(
      `${this.apiUrl}/api/bank/accounts`
    );
    return response;
  };
}
