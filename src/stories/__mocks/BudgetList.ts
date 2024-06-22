import { BudgetItemProps } from '@/components/budget/BudgetItem';

export default {
  Default: {
    avatar: {
      emoji: '💰',
      backgroundColor: '#24e90a',
    },
    title: 'Salary',
    budgeted: 4000,
    actual: 4500,
    budgetType: 'debit',
  } as BudgetItemProps,
  CreditNoRemaining: {
    avatar: {
      emoji: '🏠',
      backgroundColor: '#10e3b9',
    },
    title: 'Mortgage',
    budgeted: 4000,
    actual: 4500,
    budgetType: 'credit',
  } as BudgetItemProps,
  CreditRemaining: {
    avatar: {
      emoji: '🍔',
      backgroundColor: '#f10dad',
    },
    title: 'Eating Out',
    budgeted: 4000,
    actual: 3500,
    budgetType: 'credit',
  } as BudgetItemProps,
  DebitNoRemaining: {
    avatar: {
      emoji: '🤑',
      backgroundColor: '#2eaf4a',
    },
    title: 'Rent Income',
    budgeted: 4000,
    actual: 3500,
    budgetType: 'debit',
  } as BudgetItemProps,
  DebitRemaining: {
    avatar: {
      emoji: '🍔',
      backgroundColor: '#FDF9A9',
    },
    title: 'Salary',
    budgeted: 4000,
    actual: 4500,
    budgetType: 'debit',
  } as BudgetItemProps,
};
