import { combineReducers } from '@reduxjs/toolkit';
import searchPictures from './searchPictures/searchPicturesReducer';

const rootReducer = combineReducers({
  searchPictures,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
