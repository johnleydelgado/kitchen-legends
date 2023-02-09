import { createSlice } from '@reduxjs/toolkit';

const timer = createSlice({
  name: 'timer',
  initialState: {
    remainingTime: 0,
  },
  reducers: {
    setRemainingTime: (state, action) => {
      state.remainingTime = action.payload;
    },
    decrementRemainingTime: (state) => {
      state.remainingTime--;
    },
  },
});

export const { setRemainingTime } = timer.actions;
export default timer.reducer;
