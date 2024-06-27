import { BudgetItemProps } from '@/components/budget/BudgetItem';

export default {
  Default: {
    category: {
      avatar: {
        emoji: '💰',
        backgroundColor: '#24e90a',
      },
      label: 'Salary',
      amount: 4500,
      budgetType: 'debit',
    },
  } as BudgetItemProps,
  CreditNoRemaining: {
    category: {
      avatar: {
        emoji: '🏠',
        backgroundColor: '#10e3b9',
      },
      label: 'Mortgage',
      amount: 4500,
      budgetType: 'credit',
    },
  } as BudgetItemProps,
  CreditRemaining: {
    category: {
      avatar: {
        emoji: '🍔',
        backgroundColor: '#f10dad',
      },
      label: 'Eating Out',
      amount: 3500,
      budgetType: 'credit',
    },
  } as BudgetItemProps,
  DebitNoRemaining: {
    category: {
      avatar: {
        emoji: '🤑',
        backgroundColor: '#2eaf4a',
      },
      label: 'Rent Income',
      amount: 3500,
      budgetType: 'debit',
    },
  } as BudgetItemProps,
  DebitRemaining: {
    category: {
      avatar: {
        emoji: '🍔',
        backgroundColor: '#FDF9A9',
      },
      label: 'Salary',
      amount: 4500,
      budgetType: 'debit',
    },
  } as BudgetItemProps,
};
