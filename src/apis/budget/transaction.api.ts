import HttpClient from '@/libs/http/http.client';
import { ITransaction } from '@/types/basic/Transaction.type';
import { BaseRepository } from '../base.repository';

export default class TransactionApi extends BaseRepository {
  GetTransactions = async (
    startDate: string,
    endDate: string
  ): Promise<{ message: string; transactions: ITransaction[] }> => {
    const response = await HttpClient.get<{ message: string; transactions: ITransaction[] }>(
      `${this.apiUrl}/api/transaction?start=${startDate}&end=${endDate}`
    );
    return response;
  };

  GetTransaction = async (
    transactionId: string
  ): Promise<{ message: string; transaction: ITransaction }> => {
    const response = await HttpClient.get<{ message: string; transaction: ITransaction }>(
      `${this.apiUrl}/api/transaction/${transactionId}`
    );
    return response;
  };

  AssociateCategory = async (transactionId: string, categoryId?: string) => {
    const response = await HttpClient.put<{ message: string }>(
      `${this.apiUrl}/api/transaction/${transactionId}/category/${categoryId}`
    );
    return response;
  };
}
