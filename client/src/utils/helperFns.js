export const createTags = arr => arr.reduce((acc, card) => {
    if(!card || !card.Tags){return acc}
    const newTags = card.Tags.filter(tag => !acc.includes(tag))
    return newTags.length ? [...acc, ...newTags] : acc;
  }, [])