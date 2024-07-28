import HttpClient from '@/libs/http/http.client';
import { IBankAccount } from '@/types/models/bank/BankAccount';
import { BaseRepository } from '../base.repository';

export default class BankApi extends BaseRepository {
  getBankAccounts = async (): Promise<{ bankAccounts: IBankAccount[]; message: string }> => {
    const response = await HttpClient.get<{ bankAccounts: IBankAccount[]; message: string }>(
      `${this.apiUrl}/api/bank/accounts`
    );
    return response;
  };

  getBankCategoryList = async (): Promise<{ categoryList: Record<string, string> }> => {
    const response = await HttpClient.get<{ categoryList: Record<string, string> }>(
      `${this.apiUrl}/api/bank/category-list`
    );
    return response;
  };
}
