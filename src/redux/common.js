import { createSlice } from '@reduxjs/toolkit';

export const common = createSlice({
  name: 'common',
  initialState: {
    openModals: [],
  },
  reducers: {
    OPEN_MODAL: (state, action) => {
      state.openModals =
        state.openModals.filter((x) => x === action.payload).length > 0
          ? state.openModals
          : [...state.openModals, action.payload];
    },
    /**
     * CLOSE_MODAL
     * @param {string} action.payload - name of modal to be closed
     * @returns {string[]} array of name of modals without the payload
     */
    CLOSE_MODAL: (state, action) => {
      state.openModals =
        state.openModals.filter((x) => x === action.payload).length > 0
          ? state.openModals.filter((x) => x !== action.payload)
          : state.openModals;
    },
  },
});

// Action creators are generated for each case reducer function
export const { OPEN_MODAL, CLOSE_MODAL } = common.actions;

export default common.reducer;
