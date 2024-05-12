export type balanceEntry = 'credit' | 'debit' | 'transfer';

export function balanceEntryToText(entry: balanceEntry): string {
  switch (entry) {
    case 'credit':
      return 'Expense';
    case 'debit':
      return 'Income';
    case 'transfer':
      return 'Transfer';
  }
}

export function textToBalanceEntry(text: string): balanceEntry {
  switch (text) {
    case 'Expense':
      return 'credit';
    case 'Income':
      return 'debit';
    case 'Transfer':
      return 'transfer';
    default:
      throw new Error(`Invalid balance entry: ${text}`);
  }
}
