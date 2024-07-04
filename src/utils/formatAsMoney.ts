export function formatAsMoney(amount: number, includeDecimal: boolean = false): string {
  if (!amount) {
    return includeDecimal ? '$0.00' : '$0';
  }

  if (typeof amount === 'string') {
    amount = parseFloat(amount);
  }

  if (!includeDecimal) {
    return amount.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  }

  return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

export function formatMoneyAsNumber(amount: string): number {
  // Use Number.parseFloat() to convert the currency string to a number
  return Number.parseFloat(amount.replace(/[^0-9.-]+/g, ''));
}
