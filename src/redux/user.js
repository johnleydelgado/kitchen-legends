import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {},
  profileInfo: {},
  error: '',
  roomStatus: { ongoing: false, id: 0, name: '', totalNoOfQuestion: 0 },
  isLoggedIn: false,
  isLoading: false,
};

export const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.user = action.payload;
    },
    setProfile: (state, action) => {
      state.profileInfo = action.payload;
    },
    setRoomStatus: (state, action) => {
      state.roomStatus = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    resetState: () => initialState,
  },
});

// Action creators are generated for each case reducer function
export const { setUsers, setProfile, setRoomStatus, resetState, setLoading } = user.actions;

export default user.reducer;
