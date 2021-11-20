import UserActionTypes from './user.types';
import { createLogger } from 'redux-logger';

export const fetchUser = (user) => ({
  type: UserActionTypes.USER_FETCH,
  payload: user
});

export const userSuccess = (user) => ({
  type: UserActionTypes.USER_SUCCESS,
  payload: user
});

export const userFail = user => ({
  type: UserActionTypes.USER_FAIL,
  payload: user
});

// export const createTest = list => ({
//   type: UserActionTypes.CREATE_TEST,
//   payload: list
// });

const dispatchObj = (type, payload) => {
    console.log(`Executing action type ${type}`);
    console.log(payload);
    console.log(UserActionTypes[type]);
    
    return {type: UserActionTypes[type], payload};
}

export const createCard = (user, card) => dispatchObj('CREATE_CARD', {user, card});
export const createCardSuccess = (card) => ({type: UserActionTypes.CREATE_CARD_SUCCESS});
export const createCardFail = () => ({type: UserActionTypes.CREATE_CARD_FAIL});

export const updateCard = (user, card, index) => ({type: UserActionTypes.UPDATE_CARD, payload: {user, card, index}});
export const updateCardSuccess = (user, card) => ({type: UserActionTypes.UPDATE_CARD_SUCCESS});
export const updateCardFail = () => ({type: UserActionTypes.UPDATE_CARD_FAIL});

export const deleteCard = (user, cards) => ({type: UserActionTypes.DELETE_CARD, payload: {user, cards} });
export const deleteCardSuccess = (user, card) => ({type: UserActionTypes.DELETE_CARD });
export const deleteCardFail = () => ({type: UserActionTypes.DELETE_CARD_FAIL });

export const createTest = (user, test) => ({type: UserActionTypes.CREATE_TEST, payload: {user, test}});
export const createTestSuccess = (test) => ({type: UserActionTypes.CREATE_TEST_SUCCESS});
export const createTestFail = () => ({type: UserActionTypes.CREATE_TEST_FAIL});

export const updateTest = (user, test, index) => ({type: UserActionTypes.UPDATE_TEST, payload: {user, test, index}});
export const updateTestSuccess = (user, test) => ({type: UserActionTypes.UPDATE_TEST_SUCCESS});
export const updateTestFail = () => ({type: UserActionTypes.UPDATE_TEST_FAIL});

export const deleteTest = (user, tests) => ({type: UserActionTypes.DELETE_TEST, payload: {user, tests}});
export const deleteTestSuccess = (user, test) => ({type: UserActionTypes.DELETE_TEST_SUCCESS });
export const deleteTestFail = () => ({type: UserActionTypes.DELETE_TEST_FAIL });