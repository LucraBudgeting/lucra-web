export function formatAsMoney(amount: number): string {
  if (!amount) {
    return '$0.00';
  }

  if (typeof amount === 'string') {
    amount = parseFloat(amount);
  }

  return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

export function formatMoneyAsNumber(amount: string): number {
  // Use Number.parseFloat() to convert the currency string to a number
  return Number.parseFloat(amount.replace(/[^0-9.-]+/g, ''));
}
