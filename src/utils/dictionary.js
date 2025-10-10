export const normalizeTerm = (term) => term.trim().toLowerCase();

export const findEntry = (index, term) => {
  if (!term) {
    return undefined;
  }

  return index[term];
};

export const getSuggestionsForTerm = (dictionary, term, limit = 5) => {
  if (!term) {
    return [];
  }

  return dictionary
    .filter((entry) => entry.word.includes(term) && entry.word !== term)
    .slice(0, limit)
    .map((entry) => entry.word);
};

export const getRandomEntry = (dictionary) => {
  if (dictionary.length === 0) {
    return undefined;
  }

  const index = Math.floor(Math.random() * dictionary.length);
  return dictionary[index];
};

export const addToHistory = (history, term, maxItems = 8) => {
  if (!term) {
    return history;
  }

  const alreadyExists = history.includes(term);

  if (alreadyExists) {
    return history;
  }

  const updated = [term, ...history];

  return updated.slice(0, maxItems);
};

export const toggleFavorite = (favorites, term, maxItems = 20) => {
  if (!term) {
    return favorites;
  }

  if (favorites.includes(term)) {
    return favorites.filter((item) => item !== term);
  }

  const updated = [term, ...favorites];

  if (updated.length > maxItems) {
    return updated.slice(0, maxItems);
  }

  return updated;
};

export const getRelatedWords = (categoriesMap, entry, limit = 4) => {
  if (!entry) {
    return [];
  }

  const siblings = categoriesMap[entry.category] ?? [];

  return siblings
    .filter((item) => item.word !== entry.word)
    .slice(0, limit)
    .map((item) => item.word);
};
