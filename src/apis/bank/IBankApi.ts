export interface IBankApi {
  getLinkToken: () => Promise<string>;
  getAccounts: () => Promise<any>;
  getTransactions: () => Promise<any>;
  exchangePublicToken: (publicToken: string) => Promise<any>;
}
