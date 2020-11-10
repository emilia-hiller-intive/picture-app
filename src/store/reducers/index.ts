import { combineReducers } from '@reduxjs/toolkit';
import searchPictures from './searchPictures/searchPicturesReducer';
import focus from './focusReducer';

const rootReducer = combineReducers({
  searchPictures,
  focus,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
