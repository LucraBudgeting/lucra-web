import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useAppSelector } from '@/stores/store.hooks';
import { IBankAccount } from '@/types/models/bank/BankAccount';
import { category } from '@/components/category/category.type';
import { balanceEntry } from '@/types/types';

export const initialState = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
  isCurrentPageDisabled: false,
  isNextStepLoading: false,
  isCurrentPageLoading: false,
  bankAccounts: [] as IBankAccount[],
  categories: [] as category[],
  step5Stage: 'debit' as balanceEntry,
};

export const onboardingSlice = createSlice({
  name: 'onboardingSlice',
  initialState,
  reducers: {
    setFullName: (state, action: PayloadAction<string>) => {
      state.fullName = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setConfirmPassword: (state, action: PayloadAction<string>) => {
      state.confirmPassword = action.payload;
    },
    setIsCurrentPageDisabled: (state, action: PayloadAction<boolean>) => {
      state.isCurrentPageDisabled = action.payload;
    },
    setIsCurrentPageLoading: (state, action: PayloadAction<boolean>) => {
      state.isCurrentPageLoading = action.payload;
    },
    setIsNextStepLoading: (state, action: PayloadAction<boolean>) => {
      state.isNextStepLoading = action.payload;
    },
    addAccounts: (state, action: PayloadAction<IBankAccount[]>) => {
      const uniqueAccounts = state.bankAccounts.concat(action.payload).reduce((acc, obj) => {
        acc.set(obj.id, obj);
        return acc;
      }, new Map());

      state.bankAccounts = Array.from(uniqueAccounts.values());
    },
    addCategories: (state, action: PayloadAction<category[]>) => {
      const uniqueCategories = state.categories.concat(action.payload).reduce((acc, obj) => {
        acc.set(obj.id, obj);
        return acc;
      }, new Map());

      state.categories = Array.from(uniqueCategories.values());
    },
    changeStep5Stage: (state, action: PayloadAction<balanceEntry>) => {
      state.step5Stage = action.payload;
    },
  },
});

export const onboardingSelector = () => useAppSelector((store) => store.onboarding);

export const {
  setFullName,
  setEmail,
  setPassword,
  setConfirmPassword,
  setIsCurrentPageDisabled,
  setIsCurrentPageLoading,
  setIsNextStepLoading,
  addAccounts,
  addCategories,
  changeStep5Stage,
} = onboardingSlice.actions;

export default onboardingSlice.reducer;
