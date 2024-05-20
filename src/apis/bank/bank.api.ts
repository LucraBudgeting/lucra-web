import HttpClient from '@/libs/http/http.client';
import { BaseRepository } from '../base.repository';

export default class BankApi extends BaseRepository {
  getBankAccounts = async (): Promise<any> => {
    const response = await HttpClient.get<any>(`${this.apiUrl}/api/bank/accounts`);
    return response;
  };
}
