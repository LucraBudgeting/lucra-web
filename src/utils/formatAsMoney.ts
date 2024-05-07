export function formatAsMoney(amount: number): string {
  // Use Number.toLocaleString() to format the number as currency
  return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}
