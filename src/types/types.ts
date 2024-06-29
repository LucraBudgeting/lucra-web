export type balanceEntry = 'credit' | 'debit' | 'transfer';

export function balanceEntryToText(entry: balanceEntry): string {
  switch (entry.toLowerCase()) {
    case 'credit':
      return 'Expense';
    case 'debit':
      return 'Income';
    case 'transfer':
      return 'Transfer';
    default:
      throw new Error(`Invalid balance entry: ${entry}`);
  }
}

export function textToBalanceEntry(text: string): balanceEntry {
  switch (text.toLowerCase()) {
    case 'expense':
      return 'debit';
    case 'income':
      return 'credit';
    case 'transfer':
      return 'transfer';
    default:
      throw new Error(`Invalid balance entry: ${text}`);
  }
}
