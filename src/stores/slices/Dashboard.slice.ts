import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { ICategory } from '@/types/basic/Category.type';
import { ITransaction } from '@/types/basic/Transaction.type';
import { RootState } from '../store';

interface IDateRange {
  startDate: string;
  endDate: string;
}

export const initialState = {
  creditCategories: [] as ICategory[],
  debitCategories: [] as ICategory[],
  categoryDictionary: {} as Record<string, ICategory>,
  transactions: [] as ITransaction[],
  budgetActuals: {} as Record<string, number>,
  dateRange: {
    startDate: new Date().toISOString(),
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
    },
    addNewCategory: (state, action: PayloadAction<ICategory>) => {
      if (!action.payload.id) return;

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

      const categoryType = state.categoryDictionary[transaction.categoryId].budgetType;

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
export const { setCategories, setTransactions, addNewCategory, updateTransactionCategory } =
  dashboardSlice.actions;
export default dashboardSlice.reducer;
