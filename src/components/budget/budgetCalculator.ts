import { balanceEntry } from '@/types/types';

export function calcIsRemainingGood(budgeted: number, actual: number, budgetType: balanceEntry) {
  if (budgetType === 'debit') {
    return actual - budgeted < 0;
  } else {
    return budgeted - actual < 0;
  }
}

export function calcRemaining(budgeted: number, actual: number) {
  return Math.abs(budgeted - actual);
}
