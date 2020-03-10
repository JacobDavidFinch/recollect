import { all, call } from 'redux-saga/effects';

import { studysheetSagas } from './studysheet/studysheet.sagas';
import { userSagas } from './user/user.sagas';

export default function* rootSaga() {
  yield all([call(studysheetSagas), call(userSagas)]);
}
