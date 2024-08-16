export function isBalanceOrAvailable(type?: string) {
  switch (type?.toLowerCase()) {
    case 'checking':
    case 'savings':
      return 'Balance';
      break;
    case 'loan':
    case 'creditcard':
      return 'Available';
      break;
    default:
      return '';
  }
}
