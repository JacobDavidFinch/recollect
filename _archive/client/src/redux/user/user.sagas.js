import { takeLatest, put, all, call } from 'redux-saga/effects';
import * as R from 'ramda';

import UserActionTypes from './user.types';
import { postCard, putCard, postTest, putTest, fetchUser } from "../../utils/API"
import {
  userSuccess,
  userFail, 
  // userSuccess,
  createCard,
  createCardSuccess,
  createCardFail,
  updateCard,
  updateCardSuccess,
  updateCardFail,
  deleteCard,
  deleteCardSuccess,
  deleteCardFail,
  createTest,
  createTestSuccess,
  createTestFail,
  updateTest,
  updateTestSuccess,
  updateTestFail,
  deleteTest,
  deleteTestSuccess,
  deleteTestFail,
} from './user.actions';

import { handleResult,  addTags} from './user.sagas.helper.js'
import { createLogger } from 'redux-logger';

export function* fetchUserSaga({ payload }){
  const result = yield fetchUser(payload)
  yield put(handleResult(addTags(result), userSuccess, userFail));
}

export function* createCardSaga({ payload: { user, card } }){
  try {
    const result = yield postCard(user, card)
    yield put(handleResult(result, createCardSuccess, createCardFail));
  } catch(err) {
    createLogger(err)
  }
}

export function* updateCardSaga({ payload: { user, card, index }}){
  const result = yield putCard(user, card, index)
  yield put(handleResult(result, updateCardSuccess, updateCardFail));
}

export function* deleteCardSaga(user, cards){
  const result = yield deleteCard(user, cards)
  yield put(handleResult(result, deleteCardSuccess, deleteCardFail));
}

export function* createTestSaga({ payload: { user, test }}){
  console.log('hi');
  const result = yield postTest(user, test)
  yield put(handleResult(result, createCardSuccess, createCardFail));
}

export function* updateTestSaga({ payload: { user, test, index }}){
  const result = yield putTest(user, test, index)
  yield put(handleResult(result, updateCardSuccess, updateCardFail));
}

export function* deleteTestSaga({ payload: { user, tests }}){
  const result = yield deleteTest(user, tests)
  yield put(handleResult(result, deleteCardSuccess, deleteCardFail));
}

export function* fetchUserSagaWatcher() {
  yield takeLatest(UserActionTypes.USER_FETCH, fetchUserSaga);
}

export function* createCardSagaWatcher(){
  yield takeLatest(UserActionTypes.CREATE_CARD, createCardSaga);
}

export function* updateCardSagaWatcher(){
  yield takeLatest(UserActionTypes.UPDATE_CARD, updateCardSaga);
}

export function* deleteCardSagaWatcher(){
  yield takeLatest(UserActionTypes.DELETE_CARD, deleteCardSaga);
}

export function* createTestSagaWatcher(){
  yield takeLatest(UserActionTypes.CREATE_TEST, createTestSaga);
}

export function* updateTestSagaWatcher(){
  yield takeLatest(UserActionTypes.UPDATE_TEST, updateTestSaga);
}

export function* deleteTestSagaWatcher(){
  yield takeLatest(UserActionTypes.DELETE_TEST, deleteTestSaga);
}

export function* userSagas() {
  yield all([
    call(fetchUserSagaWatcher),
    call(createCardSagaWatcher),
    call(updateCardSagaWatcher),
    call(deleteCardSagaWatcher),
    call(createTestSagaWatcher),
    call(updateTestSagaWatcher),
    call(deleteTestSagaWatcher)
  ]);
}
