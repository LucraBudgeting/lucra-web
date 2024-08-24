import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GuideType, userGuideType } from '@/apis/guide/guide.type';
import { useAppSelector } from '../store.hooks';

export const initialUserGuideState = {
  guides: [] as GuideType[],
  progress: {} as Record<string, userGuideType>,
};

export const userGuideSlice = createSlice({
  name: 'userGuideSlice',
  initialState: initialUserGuideState,
  reducers: {
    setInitialState: (state, action: PayloadAction<typeof initialUserGuideState>) => {
      state.progress = action.payload.progress;
      state.guides = action.payload.guides;
    },
  },
});

export const userGuideSelector = () => useAppSelector((store) => store.userGuide);

export const { setInitialState } = userGuideSlice.actions;

export default userGuideSlice.reducer;
