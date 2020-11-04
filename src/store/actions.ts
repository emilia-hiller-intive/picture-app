import { searchPicturesActions } from './reducers/searchPictures/searchPicturesReducer';
import searchPicturesSagaActions from './reducers/searchPictures/searchPicturesSagaActions';

const actions = {
  searchPictures: searchPicturesActions,
  searchPicturesSaga: searchPicturesSagaActions,
};

export default actions;
