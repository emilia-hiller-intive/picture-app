import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PictureType } from '../../../types/pictures';

export interface PicturesStateType {
  pictures?: PictureType[];
  isPending: boolean;
  isSearchError: boolean;
}

const initialState: PicturesStateType = {
  isPending: false,
  isSearchError: false,
};

const searchPicturesReducer = createSlice({
  name: 'searchPictures',
  initialState,

  reducers: {
    setPictures(state, { payload }: PayloadAction<PictureType[]>) {
      state.pictures = payload;
    },
    setIsSearchPending(state, { payload }: PayloadAction<boolean>) {
      state.isPending = payload;
    },
    setIsSearchError(state, { payload }: PayloadAction<boolean>) {
      state.isSearchError = payload;
    },
  },
});

export const searchPicturesActions = searchPicturesReducer.actions;
export default searchPicturesReducer.reducer;
