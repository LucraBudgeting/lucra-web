import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { ICategory } from '@/types/basic/Category.type';
import { ITransaction } from '@/types/basic/Transaction.type';
import { IBankAccount } from '@/types/models/bank/BankAccount';
import { RootState } from '../store';

interface IDateRange {
  startDate: string;
  endDate: string;
}

const now = new Date();
const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0);

export type budgetHeaderTimeRanges = '1mo' | '6mo' | '12mo';

export const initialState = {
  creditCategories: [] as ICategory[],
  debitCategories: [] as ICategory[],
  transferCategory: {} as ICategory,
  categoryDictionary: {} as Record<string, ICategory>,
  transactions: [] as ITransaction[],
  bankAccounts: {} as Record<string, IBankAccount>,
  budgetActuals: {} as Record<string, number>,
  totalTransactionIncome: 0,
  totalTransactionExpense: 0,
  budgetAverage: {} as Record<string, number>,
  currentRange: '1mo' as budgetHeaderTimeRanges,
  dateRange: {
    startDate: startOfMonth.toISOString(),
    endDate: now.toISOString(),
  } as IDateRange,
  isInTour: false,
};

export const dashboardSlice = createSlice({
  name: 'dashboardSlice',
  initialState,
  reducers: {
    setIsInTour: (state, action: PayloadAction<boolean>) => {
      state.isInTour = action.payload;
    },
    setCategories: (state, action: PayloadAction<ICategory[]>) => {
      state.creditCategories = action.payload.filter(
        (category) => category.budgetType === 'credit'
      );
      state.debitCategories = action.payload.filter((category) => category.budgetType === 'debit');
      state.transferCategory =
        action.payload.find((category) => category.budgetType === 'transfer') || ({} as ICategory);

      state.categoryDictionary = action.payload.reduce(
        (acc, category) => {
          if (!category.id) return acc;

          acc[category.id] = category;
          return acc;
        },
        {} as Record<string, ICategory>
      );

      state.budgetActuals = calculateCategoryActuals(state);
    },
    addNewCategory: (state, action: PayloadAction<ICategory>) => {
      if (!action.payload.id || !action.payload.budgetType) return;

      if (action.payload.budgetType === 'credit') {
        state.creditCategories.push(action.payload);
      } else {
        state.debitCategories.push(action.payload);
      }
      state.categoryDictionary[action.payload.id] = action.payload;
    },
    setBankAccounts: (state, action: PayloadAction<IBankAccount[]>) => {
      state.bankAccounts = action.payload.reduce(
        (acc, account) => {
          if (!account.id) return acc;

          acc[account.id] = account;
          return acc;
        },
        {} as Record<string, IBankAccount>
      );
    },
    setTransactions: (state, action: PayloadAction<ITransaction[]>) => {
      state.transactions = action.payload;
      state.budgetActuals = calculateCategoryActuals(state);
      state.budgetAverage = calculateCategoryAverage(state);
      const { income, expense } = calculateTransactionActuals(
        action.payload,
        state.transferCategory.id ?? '' //TODO POSSIBLE RACE CONDITION
      );
      state.totalTransactionIncome = income;
      state.totalTransactionExpense = expense;
    },
    setNewRange: (state, action: PayloadAction<budgetHeaderTimeRanges>) => {
      state.currentRange = action.payload;

      switch (action.payload) {
        case '1mo':
          state.dateRange = {
            startDate: startOfMonth.toISOString(),
            endDate: now.toISOString(),
          };
          break;
        case '6mo':
          state.dateRange = {
            startDate: new Date(now.getFullYear(), now.getMonth() - 5, 1).toISOString(),
            endDate: now.toISOString(),
          };
          break;
        case '12mo':
          state.dateRange = {
            startDate: new Date(now.getFullYear(), now.getMonth() - 11, 1).toISOString(),
            endDate: now.toISOString(),
          };
      }
    },
    resetDateRange: (state) => {
      state.currentRange = '1mo';
      state.dateRange = initialState.dateRange;
    },
    goForwardDateRange: (state) => {
      const rangeToMove = parseInt(state.currentRange.split('mo')[0]);

      const currentEndDate = new Date(state.dateRange.endDate);

      // Calculate the next startDate by adding the rangeToMove months
      const nextStartDate = new Date(
        currentEndDate.getFullYear(),
        currentEndDate.getMonth() + rangeToMove,
        1
      );

      // Calculate the next endDate as the last day after adding the rangeToMove months
      const nextEndDate = new Date(
        nextStartDate.getFullYear(),
        nextStartDate.getMonth() + rangeToMove,
        0
      );

      const now = new Date();

      // Ensure that the nextEndDate does not go into the future
      if (nextStartDate > now) {
        return;
      }

      state.dateRange = {
        startDate: nextStartDate.toISOString(),
        endDate: (nextEndDate > now ? now : nextEndDate).toISOString(),
      };
    },

    goBackDateRange: (state) => {
      const rangeToMove = parseInt(state.currentRange.split('mo')[0]);

      const currentStartDate = new Date(state.dateRange.startDate);

      // Calculate the startDate by subtracting the rangeToMove months
      const startDate = new Date(
        currentStartDate.getFullYear(),
        currentStartDate.getMonth() - rangeToMove,
        1
      );

      // Calculate the endDate as the last day of the calculated start month
      const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + rangeToMove, 0);

      state.dateRange = {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      };
    },

    updateTransactionCategory: (
      state,
      action: PayloadAction<{ id: string; categoryId?: string }>
    ) => {
      const transactionIndex = state.transactions.findIndex(
        (transaction) => transaction.id === action.payload.id
      );
      if (transactionIndex === -1) return;

      if (!action.payload.categoryId) {
        state.transactions[transactionIndex].categoryId = undefined;
      }

      state.transactions[transactionIndex].categoryId = action.payload.categoryId;
      state.budgetActuals = calculateCategoryActuals(state);
    },
  },
});

function calculateTransactionActuals(
  transactions: ITransaction[],
  transferCategoryId: string
): {
  income: number;
  expense: number;
} {
  return transactions.reduce(
    (acc, transaction) => {
      if (transaction.isExcludedFromBudget) return acc;
      if (transaction.categoryId === transferCategoryId) return acc;
      if (!transaction.categoryId) return acc;

      const amount = parseFloat(transaction.amount.toString());

      // If the amount is positive, it is an expense
      // If the amount is negative, it is an income
      if (amount > 0) {
        acc.expense += amount;
      } else {
        acc.income -= amount;
      }

      return acc;
    },
    { income: 0, expense: 0 }
  );
}

function calculateCategoryActuals(state: typeof initialState): Record<string, number> {
  return state.transactions.reduce(
    (acc, transaction) => {
      if (!transaction.categoryId) return acc;
      if (transaction.isExcludedFromBudget) return acc;

      const amount = parseFloat(transaction.amount.toString());

      const categoryType = state.categoryDictionary[transaction.categoryId]?.budgetType;

      if (categoryType === 'credit') {
        acc[transaction.categoryId] = acc[transaction.categoryId]
          ? acc[transaction.categoryId] - amount
          : -amount;
      } else if (categoryType === 'debit') {
        acc[transaction.categoryId] = acc[transaction.categoryId]
          ? acc[transaction.categoryId] + amount
          : amount;
      }

      return acc;
    },
    {} as Record<string, number>
  );
}

function calculateCategoryAverage(state: typeof initialState): Record<string, number> {
  const sums: Record<string, number> = {};
  const counts: Record<string, number> = {};

  let totalMonths = 1;
  switch (state.currentRange) {
    case '1mo':
      totalMonths = 1;
      break;
    case '6mo':
      totalMonths = 6;
      break;
    case '12mo':
      totalMonths = 12;
      break;
    default:
      totalMonths = 1;
      break;
  }

  state.transactions.forEach((transaction) => {
    if (!transaction.categoryId) return;
    if (transaction.isExcludedFromBudget) return;

    const amount = parseFloat(transaction.amount.toString());

    if (!sums[transaction.categoryId]) {
      sums[transaction.categoryId] = 0;
      counts[transaction.categoryId] = 0;
    }
    sums[transaction.categoryId] += amount;
    counts[transaction.categoryId] += 1;
  });

  const averages: Record<string, number> = {};
  for (const categoryId in sums) {
    averages[categoryId] = Math.abs(sums[categoryId] / totalMonths);
  }

  return averages;
}

export const dashboardSelector = () => useSelector((state: RootState) => state.dashboard);
export const {
  setCategories,
  setTransactions,
  addNewCategory,
  updateTransactionCategory,
  goForwardDateRange,
  goBackDateRange,
  setNewRange,
  setBankAccounts,
  resetDateRange,
  setIsInTour,
} = dashboardSlice.actions;
export default dashboardSlice.reducer;
