import { createAction } from '@reduxjs/toolkit';

export default {
  searchPictures: createAction<string>('searchPictures'),
};
