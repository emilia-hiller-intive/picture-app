import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FocusStateType {
  focused: number | null;
}

const initialState: FocusStateType = {
  focused: 0,
};

const focusReducer = createSlice({
  name: 'focusedItem',
  initialState,

  reducers: {
    setLastFocused(state, { payload }: PayloadAction<number | null>) {
      state.focused = payload;
    },
  },
});

export const focusActions = focusReducer.actions;
export default focusReducer.reducer;
