import { call, put, takeLatest } from 'redux-saga/effects';

import { PayloadAction } from '@reduxjs/toolkit';
import actions from '../../actions';
import apiService from '../../../apiService/apiService';
import { getUrl } from '../../../helpers';
import { PicturesResponseType, PictureType } from '../../../types/pictures';

export const processPictures = (
  fetchedPictures: PicturesResponseType,
): PictureType[] =>
  fetchedPictures.results.map((picture, index: number) => ({
    description: picture.description,
    id: picture.id,
    thumb: picture.urls.thumb,
    index,
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

  yield put(actions.searchPictures.setIsSearchPending(false));
}

export function* searchPicturesSaga() {
  yield takeLatest(
    actions.searchPicturesSaga.searchPictures,
    runSearchPictures,
  );
}
