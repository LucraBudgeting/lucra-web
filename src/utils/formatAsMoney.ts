export function formatAsMoney(amount: number): string {
  if (!amount) {
    return '$0.00';
  }
  // Use Number.toLocaleString() to format the number as currency
  return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}
