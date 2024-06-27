import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ICategory } from '@/types/basic/Category.type';
import { ITransaction } from '@/types/basic/Transaction.type';
import { useAppSelector } from '../store.hooks';
export const initialState = {
  creditCategories: [] as ICategory[],
  debitCategories: [] as ICategory[],
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
    },
    setTransactions: (state, action: PayloadAction<ITransaction[]>) => {
      state.transactions = action.payload;

      action.payload.forEach((transaction) => {
        if (!transaction.categoryId) return;

        if (state.budgetActuals[transaction.categoryId]) {
          state.budgetActuals[transaction.categoryId] += transaction.amount;
        } else {
          state.budgetActuals[transaction.categoryId] = transaction.amount;
        }
      });
    },
  },
});

export const dashboardSelector = () => useAppSelector((state) => state.dashboard);
export const { setCategories, setTransactions } = dashboardSlice.actions;
export default dashboardSlice.reducer;
