import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { ICategory } from '@/types/basic/Category.type';
import { ITransaction } from '@/types/basic/Transaction.type';
import { RootState } from '../store';

interface IDateRange {
  startDate: string;
  endDate: string;
}

const now = new Date();
const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

export const initialState = {
  creditCategories: [] as ICategory[],
  debitCategories: [] as ICategory[],
  categoryDictionary: {} as Record<string, ICategory>,
  transactions: [] as ITransaction[],
  budgetActuals: {} as Record<string, number>,
  dateRange: {
    startDate: startOfMonth.toISOString(),
    endDate: now.toISOString(),
  } as IDateRange,
};

export const dashboardSlice = createSlice({
  name: 'dashboardSlice',
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<ICategory[]>) => {
      state.creditCategories = action.payload.filter(
        (category) => category.budgetType === 'credit'
      );
      state.debitCategories = action.payload.filter((category) => category.budgetType === 'debit');

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
    setTransactions: (state, action: PayloadAction<ITransaction[]>) => {
      state.transactions = action.payload;
      state.budgetActuals = calculateCategoryActuals(state);
    },
    goForward1Month: (state) => {
      const currentEndDate = new Date(state.dateRange.endDate);

      // Calculate the next startDate as the first day of the next month
      const nextStartDate = new Date(
        currentEndDate.getFullYear(),
        currentEndDate.getMonth() + 1,
        1
      );

      // Calculate the next endDate as the last day of the next month
      const nextEndDate = new Date(currentEndDate.getFullYear(), currentEndDate.getMonth() + 2, 0);

      // Ensure that the nextEndDate does not go into the future
      if (nextStartDate > now) {
        return;
      }

      state.dateRange = {
        startDate: nextStartDate.toISOString(),
        endDate: (nextEndDate > now ? now : nextEndDate).toISOString(),
      };
    },
    goBack1Month: (state) => {
      const currentStartDate = new Date(state.dateRange.startDate);

      // Set the startDate to the first day of the previous month
      const startDate = new Date(
        currentStartDate.getFullYear(),
        currentStartDate.getMonth() - 1,
        1
      );

      // Set the endDate to the last day of the previous month
      const endDate = new Date(currentStartDate.getFullYear(), currentStartDate.getMonth(), 0);

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

function calculateCategoryActuals(state: typeof initialState): Record<string, number> {
  return state.transactions.reduce(
    (acc, transaction) => {
      if (!transaction.categoryId) return acc;

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

export const dashboardSelector = () => useSelector((state: RootState) => state.dashboard);
export const {
  setCategories,
  setTransactions,
  addNewCategory,
  updateTransactionCategory,
  goForward1Month,
  goBack1Month,
} = dashboardSlice.actions;
export default dashboardSlice.reducer;
