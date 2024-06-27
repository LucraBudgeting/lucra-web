import HttpClient from '@/libs/http/http.client';
import { ITransaction } from '@/types/basic/Transaction.type';
import { BaseRepository } from '../base.repository';

export default class TransactionApi extends BaseRepository {
  GetTransactions = async (): Promise<{ message: string; transactions: ITransaction[] }> => {
    const response = await HttpClient.get<{ message: string; transactions: ITransaction[] }>(
      `${this.apiUrl}/api/transaction`
    );
    return response;
  };
}
