import { all } from 'redux-saga/effects';
import { searchPicturesSaga } from './reducers/searchPictures/searchPicturesSagas';

function* rootSaga() {
  yield all([searchPicturesSaga()]);
}

export default rootSaga;
