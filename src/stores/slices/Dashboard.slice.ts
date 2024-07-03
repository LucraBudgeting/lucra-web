import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ICategory } from '@/types/basic/Category.type';
import { ITransaction } from '@/types/basic/Transaction.type';
import { useAppSelector } from '../store.hooks';
export const initialState = {
  creditCategories: [] as ICategory[],
  debitCategories: [] as ICategory[],
  categoryDictionary: {} as Record<string, ICategory>,
  transactions: [] as ITransaction[],
  budgetActuals: {} as Record<string, number>,
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

      action.payload.reduce(
        (acc, transaction) => {
          if (!transaction.categoryId) return acc;

          acc[transaction.categoryId] != transaction.amount;
          return acc;
        },
        {} as Record<string, number>
      );
    },
    updateTransactionCategory: (
      state,
      action: PayloadAction<{ id: string; categoryId: string }>
    ) => {
      const transactionIndex = state.transactions.findIndex(
        (transaction) => transaction.id === action.payload.id
      );
      if (transactionIndex === -1) return;

      state.transactions[transactionIndex].categoryId = action.payload.categoryId;
    },
  },
});

export const dashboardSelector = () => useAppSelector((state) => state.dashboard);
export const { setCategories, setTransactions, addNewCategory, updateTransactionCategory } =
  dashboardSlice.actions;
export default dashboardSlice.reducer;
