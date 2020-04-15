import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectTags, selectCurrentUser, selectAllUser, selectTests, selectCards } from './user/user.selectors';
import { createCard, updateCard, deleteCard, createTest, updateTest, deleteTest } from './user/user.actions';

export {connect, createStructuredSelector, selectTags, selectTests, selectCards, selectCurrentUser, selectAllUser, createCard, updateCard }