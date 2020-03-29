import { takeLatest, put, all, call } from 'redux-saga/effects';

import UserActionTypes from './user.types';
import {updateCard, updateTest, fetchUser} from "../../utils/API"
import {
  userSuccess,
  userFail, 
  userSuccess,
  createCardSuccess,
  createCardFail,
  updateCardSuccess,
  updateCardFail,
  deleteCardSuccess,
  deleteCardFail,
  createTestSuccess,
  createTestFail,
  updateTestSuccess,
  updateTestFail,
  deleteTestSuccess,
  deleteTestFail,
  
} from './user.actions';

import {fetchResult, addTags} from 'user.sagas.helper.js'
const fetchResultSaga = fetchResult(put);

export function* fetchUserSaga(user){
  const completeUserObj = R.pipe(addTags, userSuccess);
  fetchResultSaga(fetchUser, completeUserObj, userFail, user);
}

export function* createCardSaga(user, card){
  fetchResultSaga(createCard, createCardSuccess, createCardFail, user, card);
}

export function* updateCardSaga(user, card){
  fetchResultSaga(updateCard, updateCardSuccess, updateCardFail, user, card);
}

export function* deleteCardSaga(user, card){
  fetchResultSaga(deleteCard, deleteCardSuccess, deleteCardFail, user, card);
}

export function* createTestSaga(user, test){
  fetchResultSaga(createTest, createTestSuccess, createTestFail, user, test);
}

export function* updateTestSaga(user, test){
  fetchResultSaga(updateTest, updateTestSuccess, updateTestFail, user, test);
}

export function* deleteTestSaga(user, test){
  fetchResultSaga(deleteTest, deleteTestSuccess, deleteTestFail, user, test);
}

export function* userSagas() {
  yield all([
    takeLatest(UserActionTypes.USER_FETCH, fetchUserSaga),
    takeLatest(UserActionTypes.CARD_FETCH, createCardSaga),
    takeLatest(UserActionTypes.CARD_UPDATE, updateCardSaga),
    takeLatest(UserActionTypes.CARD_DELETE, deleteCardSaga),
    takeLatest(UserActionTypes.TEST_FETCH, createTestSaga),
    takeLatest(UserActionTypes.TEST_UPDATE, updateTestSaga),
    takeLatest(UserActionTypes.TEST_DELETE, deleteTestSaga)
  ]);
}
