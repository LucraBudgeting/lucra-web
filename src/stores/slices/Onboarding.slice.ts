import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useAppSelector } from '@/stores/store.hooks';
import { IBankAccount } from '@/types/models/bank/BankAccount';

export const initialState = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
  isCurrentPageDisabled: false,
  isNextStepLoading: false,
  isCurrentPageLoading: false,
  bankAccounts: [] as IBankAccount[],
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
} = onboardingSlice.actions;

export default onboardingSlice.reducer;
