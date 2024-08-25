import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GuideType, userGuideType } from '@/apis/guide/guide.type';
import { useAppSelector } from '../store.hooks';

export const initialUserGuideState = {
  guides: [] as GuideType[],
  progress: {} as Record<string, userGuideType>,
  closeDialogBuster: '',
};

export const userGuideSlice = createSlice({
  name: 'userGuideSlice',
  initialState: initialUserGuideState,
  reducers: {
    setInitialState: (state, action: PayloadAction<typeof initialUserGuideState>) => {
      state.progress = action.payload.progress;
      state.guides = action.payload.guides;
    },
    markGuideAsCompleted: (state, action: PayloadAction<string>) => {
      const guideId = action.payload;

      if (!state.progress[guideId]) return;

      state.progress[guideId].completed = true;
      state.progress[guideId].progress = 1;
    },
    closeAllDialogs: (state) => {
      state.closeDialogBuster = new Date().toISOString();
    },
  },
});

export const userGuideSelector = () => useAppSelector((store) => store.userGuide);

export const { setInitialState, markGuideAsCompleted, closeAllDialogs } = userGuideSlice.actions;

export default userGuideSlice.reducer;
