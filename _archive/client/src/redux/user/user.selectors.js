import { createSelector } from 'reselect';

const selectUser = state => {
  console.log(state);
  return state.user};

export const selectCurrentUser = createSelector(
  [selectUser],
  ({userName, lastLogin, _id}) => ({userName, lastLogin, id: _id})
);

export const selectTags = createSelector(
  [selectUser],
  ({tags}) => ([...tags])
);

export const selectTests = createSelector(
  [selectUser],
  user => user.tests
);

export const selectCards = createSelector(
  [selectUser],
  user => user.cards
);

export const selectAllUser = createSelector(
  [selectUser],
  user => user
);
