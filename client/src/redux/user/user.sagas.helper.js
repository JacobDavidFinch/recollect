export function *fetchResult(put){
        return (apiCall, success, failure, ...apiCallParams) => {
        const result = yield apiCall(...apiCallParams);
        return result !== "error" ? put(success(result)) : put(failure(result)); 
    }
}

export const addTags = (userObj) => {
    const tags = userObj.cards.reduce((acc, card) => {
      const newTags = card.tags.filter(tag => !acc.includes(tag))
      return newTags.length ? [...acc, ...newTags] : acc;
    }, [])
    return {
      ...userObj,
      tags,
    }
  }