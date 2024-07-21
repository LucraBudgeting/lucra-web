import HttpClient from '@/libs/http/http.client';
import { ITransactionRule } from '@/types/models/rules/transaction.rule.type';
import { BaseRepository } from '../base.repository';

export default class RulesApi extends BaseRepository {
  GetTransactionRules = async () => {
    const response = await HttpClient.get<{ message: string; rules: ITransactionRule[] }>(
      `${this.apiUrl}/api/rule/transaction`
    );
    return response;
  };

  SaveTransactionRule = async (rule: ITransactionRule) => {
    if (rule.id) {
      const response = await HttpClient.put<{ message: string; rule: ITransactionRule }>(
        `${this.apiUrl}/api/rule/transaction`,
        { ...rule, rule: rule.parsedCondition }
      );
      return response;
    } else {
      const response = await HttpClient.post<{ message: string; rule: ITransactionRule }>(
        `${this.apiUrl}/api/rule/transaction`,
        {
          name: rule.name,
          rule: rule.parsedCondition,
        }
      );
      return response;
    }
  };
}
