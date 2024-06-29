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

      // action.payload.forEach((transaction) => {
      //   if (!transaction.categoryId) return;

      //   if (state.budgetActuals[transaction.categoryId]) {
      //     state.budgetActuals[transaction.categoryId] += transaction.amount;
      //   } else {
      //     state.budgetActuals[transaction.categoryId] = transaction.amount;
      //   }
      // });
    },
  },
});

export const dashboardSelector = () => useAppSelector((state) => state.dashboard);
export const { setCategories, setTransactions, addNewCategory } = dashboardSlice.actions;
export default dashboardSlice.reducer;
