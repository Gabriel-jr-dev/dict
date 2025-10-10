import { useEffect, useMemo, useState } from 'react';
import { categories, dictionaryEntries, wordMap } from '../data/entries';

const CATEGORY_ALL = 'todas';

const normalize = (value) => value.trim().toLowerCase();

const pickRandomEntry = (entries, avoidWord) => {
  if (entries.length === 0) {
    return undefined;
  }

  const available = avoidWord
    ? entries.filter((entry) => entry.word !== avoidWord)
    : entries;

  const list = available.length > 0 ? available : entries;
  const index = Math.floor(Math.random() * list.length);
  return list[index];
};

export const useDictionaryData = () => {
  const [query, setQuery] = useState('');
  const [history, setHistory] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [dailyWord, setDailyWord] = useState(() => pickRandomEntry(dictionaryEntries));
  const [selectedCategory, setSelectedCategory] = useState(CATEGORY_ALL);

  const normalizedQuery = normalize(query);

  const activeEntry = normalizedQuery ? wordMap[normalizedQuery] : undefined;

  const suggestions = useMemo(() => {
    if (!normalizedQuery) {
      return [];
    }

    return dictionaryEntries
      .filter((entry) =>
        entry.word.includes(normalizedQuery) && entry.word !== normalizedQuery
      )
      .slice(0, 6)
      .map((entry) => entry.word);
  }, [normalizedQuery]);

  const filteredEntries = useMemo(() => {
    if (selectedCategory === CATEGORY_ALL) {
      return dictionaryEntries;
    }

    return dictionaryEntries.filter((entry) => entry.category === selectedCategory);
  }, [selectedCategory]);

  const refreshDailyWord = () => {
    const newWord = pickRandomEntry(dictionaryEntries, dailyWord?.word);
    if (newWord) {
      setDailyWord(newWord);
    }
  };

  useEffect(() => {
    if (!activeEntry) {
      return;
    }

    setHistory((prev) => {
      const existingIndex = prev.indexOf(activeEntry.word);
      if (existingIndex === 0) {
        return prev;
      }

      const withoutExisting = existingIndex >= 0
        ? prev.filter((item) => item !== activeEntry.word)
        : prev;

      const updated = [activeEntry.word, ...withoutExisting];
      return updated.slice(0, 10);
    });
  }, [activeEntry?.word]);

  const handleSelectWord = (word) => {
    setQuery(word);
  };

  const toggleFavorite = (word) => {
    if (!word) {
      return;
    }

    setFavorites((prev) => {
      if (prev.includes(word)) {
        return prev.filter((item) => item !== word);
      }

      return [word, ...prev];
    });
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const categoryOptions = useMemo(
    () => [CATEGORY_ALL, ...categories],
    []
  );

  return {
    query,
    setQuery,
    normalizedQuery,
    activeEntry,
    suggestions,
    history,
    favorites,
    toggleFavorite,
    dailyWord,
    refreshDailyWord,
    handleSelectWord,
    clearHistory,
    filteredEntries,
    categoryOptions,
    selectedCategory,
    setSelectedCategory
  };
};
