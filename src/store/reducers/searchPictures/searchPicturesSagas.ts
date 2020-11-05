import { call, put, takeLatest } from 'redux-saga/effects';

import { PayloadAction } from '@reduxjs/toolkit';
import actions from '../../actions';
import apiService from '../../../services/apiService/apiService';
import { PicturesResponseType, PictureType } from '../../../types/pictures';
import NavigationService from '../../../services/navigationService';
import { PATHS } from '../../../consts';
import { getUrl } from '../../../services/apiService/helpers';

export const processPictures = (
  fetchedPictures: PicturesResponseType,
): PictureType[] =>
  fetchedPictures.results.map((picture) => ({
    description: picture.description,
    id: picture.id,
    thumb: picture.urls.thumb,
  }));

const runFetchPictures = (q: string): any =>
  apiService.request({
    url: getUrl(q),
    processData: processPictures,
  });

export function* runSearchPictures({ payload }: PayloadAction<string>) {
  yield put(actions.searchPictures.setIsSearchPending(true));

  // @ts-ignore
  const response = yield call(runFetchPictures, payload);

  const { isError, data } = response;

  if (isError || !data) {
    yield put(actions.searchPictures.setIsSearchError(true));
  } else {
    yield put(actions.searchPictures.setPictures(data));
  }

  if (!isError) {
    NavigationService.navigate(PATHS.RESULTS);
  }

  yield put(actions.searchPictures.setIsSearchPending(false));
}

export function* searchPicturesSaga() {
  yield takeLatest(
    actions.searchPicturesSaga.searchPictures,
    runSearchPictures,
  );
}
