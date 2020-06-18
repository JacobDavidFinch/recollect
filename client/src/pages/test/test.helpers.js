import * as R from 'ramda';

export const includedInTag = test => (tags = []) => {
    // if any of the tests are in the card tags, it won't return the same length
    return R.difference(test, tags).length !== test.length;
}

export const getTestCards = (cards = [], fn) => cards.reduce((acc, curr) => fn(curr.tags ? curr.tags : curr.Tags) ? [...acc, curr] : acc, [])