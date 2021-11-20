export const handleResult = (result, success, failure) => result !== "error" ? success(result) :  failure(result);

export const addTags = (userObj) => {
    const tags = userObj.cards.reduce((acc, card) => {
      if(!card || !card.tags){return acc}
      const newTags = card.tags.filter(tag => !acc.includes(tag))
      return newTags.length ? [...acc, ...newTags] : acc;
    }, [])
    return {
      ...userObj,
      tags,
    }
  }