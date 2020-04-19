export const tags = arr => arr.reduce((acc, card) => {
    if(!card || !card.tags){return acc}
    const newTags = card.tags.filter(tag => !acc.includes(tag))
    return newTags.length ? [...acc, ...newTags] : acc;
  }, [])