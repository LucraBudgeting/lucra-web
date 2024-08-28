import { balanceEntry } from '@/types/types';

function normalizeNumber(num: number) {
  if (!num || isNaN(num)) {
    num = 0;
  }

  return num;
}

export function calcIsRemainingGood(budgeted: number, actual: number, budgetType: balanceEntry) {
  actual = normalizeNumber(actual);

  if (budgetType === 'debit') {
    if (actual == 0) {
      return true;
    }
    return actual - budgeted < 0;
  } else {
    return budgeted - actual <= 0;
  }
}

export function calcRemaining(budgeted: number, actual: number, budgetType?: balanceEntry) {
  actual = normalizeNumber(actual);

  return Math.abs(budgeted - actual);
}
