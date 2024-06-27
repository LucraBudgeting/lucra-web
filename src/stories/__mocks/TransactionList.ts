import { createShortGuid } from '@/utils/guid.helper';

export const transactionList = [
  {
    category: {
      label: 'Eating Out',
      avatar: {
        emoji: '🍔',
        backgroundColor: '#FDF9A9',
      },
      id: createShortGuid(),
    },
    id: createShortGuid(),
    amount: -49.88,
    description: 'TST* Rodney Scotts BBQ',
    date: '2021-09-01',
  },
  {
    category: {
      label: 'Car Payment',
      avatar: {
        emoji: '🚗',
        backgroundColor: '#FDF9A9',
      },
      id: createShortGuid(),
    },
    id: createShortGuid(),
    amount: -409.88,
    description: 'Lindon Toyota',
    date: '2021-09-01',
  },
  {
    category: {
      label: 'Groceries',
      avatar: {
        emoji: '🛒',
        backgroundColor: '#FDF9A9',
      },
      id: createShortGuid(),
    },
    id: createShortGuid(),
    amount: -102.34,
    description: 'Walmart',
    date: '2021-08-27',
  },
  {
    id: createShortGuid(),
    amount: -102.34,
    description: 'Mortgage',
    date: '2021-08-27',
  },
];
