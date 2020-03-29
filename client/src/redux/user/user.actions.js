import UserActionTypes from './user.types';

export const fetchUser = () => ({
  type: UserActionTypes.USER_FETCH
});

export const userSuccess = user => ({
  type: UserActionTypes.USER_SUCCESS,
  payload: user[1]
});

export const userFail = user => ({
  type: UserActionTypes.USER_FAIL,
  payload: user[0]
});

export const createTest = list => ({
  type: UserActionTypes.CREATE_TEST,
  payload: list
});

export const createCard = (user, card) => ({type: UserActionTypes.CREATE_CARD_FETCH, payload: {user, card}})
export const createCardSuccess = (card) => ({type: UserActionTypes.CREATE_CARD_SUCCESS})
export const createCardFail = (card) => ({type: UserActionTypes.CREATE_CARD_FAIL})
export const updateCard = (user, card) => ({type: payload: UPDATE_CARD})
export const updateCardSuccess = (user, card) => ({type: payload: UPDATE_CARD})
export const updateCardFail = (user, card) => ({type: payload: UPDATE_CARD})
export const deleteCard = (user, card) => ({type: payload: })
export const deleteCardSuccess = (user, card) => ({type: payload: })
export const deleteCardFail = (user, card) => ({type: payload: })
export const createTest = param => ({type: payload: })
export const createTestSuccess = param => ({type: payload: })
export const createTestFail = param => ({type: payload: })
export const updateTest = param => ({type: payload: })
export const updateTestSuccess = param => ({type: payload: })
export const updateTestFail = param => ({type: payload: })
export const deleteTest = param => ({type: payload: })
export const deleteTestSuccess = param => ({type: payload: })
export const deleteTestFail = param => ({type: payload: })