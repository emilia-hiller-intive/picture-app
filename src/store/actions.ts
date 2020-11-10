import { searchPicturesActions } from './reducers/searchPictures/searchPicturesReducer';
import searchPicturesSagaActions from './reducers/searchPictures/searchPicturesSagaActions';
import { focusActions } from './reducers/focusReducer';

const actions = {
  searchPictures: searchPicturesActions,
  searchPicturesSaga: searchPicturesSagaActions,
  focus: focusActions,
};

export default actions;
