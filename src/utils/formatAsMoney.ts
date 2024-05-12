export function formatAsMoney(amount: number): string {
  if (!amount) {
    return '$0.00';
  }
  // Use Number.toLocaleString() to format the number as currency
  return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

export function formatMoneyAsNumber(amount: string): number {
  // Use Number.parseFloat() to convert the currency string to a number
  return Number.parseFloat(amount.replace(/[^0-9.-]+/g, ''));
}
