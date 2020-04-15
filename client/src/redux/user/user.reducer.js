import UserActionTypes from './user.types';

const INITIAL_STATE = {
  currentUser: null,
  userStatus: 'idle',
  tests: [],
  tags: [],
  cards: [],
  // userCardsStatus: 'idle',
  // userTestsStatus: 'idle',
  // userTestHistory: [],
  // userTestHistory: 'idle',
};


const userReducer = (state = INITIAL_STATE, action) => {

  const statusObjWithState = keyType => statusType => ({
    ...state,
    [`${keyType}Status`] : statusType
  })
  const userStatusObjWithState = statusObjWithState('user')
  const testsStatusObjWithState = statusObjWithState('userTests');;
  const testHistoryStatusObjWithState = statusObjWithState('userTestHistory');
  const cardsStatusObjWithState = statusObjWithState('userCards');

  switch (action.type) {
    case UserActionTypes.USER_FETCH: return {...userStatusObjWithState('pending')};
    case UserActionTypes.USER_SUCCESS: return {...userStatusObjWithState('resolved'), ...action.payload };
    case UserActionTypes.USER_FAIL: return {...userStatusObjWithState('rejected')};
    case UserActionTypes.CREATE_CARD: return {...cardsStatusObjWithState('pending')};
    case UserActionTypes.USER_TESTS_FETCH: return {...testsStatusObjWithState('pending')};
    // case UserActionTypes.USER_TESTS_SUCCESS: return {...testsStatusObjWithState('resolved'), userTests: action.payload };
    // case UserActionTypes.USER_TESTS_FAIL: return {...testsStatusObjWithState('rejected')};
    // case UserActionTypes.USER_TEST_HISTORY_FETCH: return {...testHistoryStatusObjWithState('pending')};
    // case UserActionTypes.USER_TEST_HISTORY_SUCCESS: return {...testHistoryStatusObjWithState('resolved'), userTestHistory: action.payload };
    // case UserActionTypes.USER_TEST_HISTORY_FAIL: return {...testHistoryStatusObjWithState('rejected')};
    // case UserActionTypes.USER_CARDS_FETCH: return {...cardsStatusObjWithState('pending')};
    // case UserActionTypes.USER_CARDS_SUCCESS: return {...cardsStatusObjWithState('resolved'), userCards: action.payload };
    // case UserActionTypes.USER_CARDS_FAIL: return {...cardsStatusObjWithState('rejected')};
    default: return state;
  }
};

export default userReducer;

// user collection will have name, last login, previous tests, cards reference, 