import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useAppSelector } from '@/stores/store.hooks';

export const initialState = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
  isCurrentPageDisabled: false,
  isNextStepLoading: false,
  isCurrentPageLoading: false,
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
} = onboardingSlice.actions;

export default onboardingSlice.reducer;
