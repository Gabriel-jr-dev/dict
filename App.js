import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import NavigationBar from './src/components/NavigationBar';
import { categories, dictionary, dictionaryIndex } from './src/data/words';
import AboutScreen from './src/screens/AboutScreen';
import DictionaryScreen from './src/screens/DictionaryScreen';
import StudyScreen from './src/screens/StudyScreen';
import {
  addToHistory,
  findEntry,
  getRandomEntry,
  getRelatedWords,
  getSuggestionsForTerm,
  normalizeTerm,
  toggleFavorite
} from './src/utils/dictionary';

const PAGES = [
  { key: 'dictionary', label: 'Dicionário' },
  { key: 'study', label: 'Estudar' },
  { key: 'about', label: 'Sobre' }
];

export default function App() {
  const [query, setQuery] = useState('');
  const [activePage, setActivePage] = useState('dictionary');
  const [history, setHistory] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [dailyWord, setDailyWord] = useState(() => getRandomEntry(dictionary));

  const normalizedQuery = useMemo(() => normalizeTerm(query), [query]);
  const activeEntry = useMemo(
    () => findEntry(dictionaryIndex, normalizedQuery),
    [normalizedQuery]
  );
  const suggestions = useMemo(
    () => getSuggestionsForTerm(dictionary, normalizedQuery),
    [normalizedQuery]
  );
  const relatedWords = useMemo(
    () => getRelatedWords(categories, activeEntry),
    [activeEntry]
  );
  const favoriteEntries = useMemo(
    () => favorites.map((item) => dictionaryIndex[item]).filter(Boolean),
    [favorites]
  );

  useEffect(() => {
    if (activeEntry && normalizedQuery) {
      setHistory((previous) => addToHistory(previous, normalizedQuery));
    }
  }, [activeEntry, normalizedQuery]);

  const refreshDailyWord = useCallback(() => {
    const newWord = getRandomEntry(dictionary);

    if (newWord) {
      setDailyWord(newWord);
      setQuery('');
    }
  }, []);

  const handleChipPress = useCallback((term) => {
    setQuery(term);
    setActivePage('dictionary');
  }, []);

  const handleToggleFavorite = useCallback((term) => {
    setFavorites((previous) => toggleFavorite(previous, term));
  }, []);

  const isFavorite = activeEntry ? favorites.includes(activeEntry.word) : false;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <NavigationBar pages={PAGES} activePage={activePage} onNavigate={setActivePage} />
      <View style={styles.content}>
        {activePage === 'dictionary' && (
          <DictionaryScreen
            query={query}
            onChangeQuery={setQuery}
            entry={activeEntry}
            suggestions={suggestions}
            onChipPress={handleChipPress}
            dailyWord={dailyWord}
            refreshDailyWord={refreshDailyWord}
            history={history}
            onToggleFavorite={handleToggleFavorite}
            isFavorite={isFavorite}
            relatedWords={relatedWords}
          />
        )}
        {activePage === 'study' && (
          <StudyScreen
            favorites={favoriteEntries}
            onChipPress={handleChipPress}
            categories={categories}
            dictionary={dictionary}
          />
        )}
        {activePage === 'about' && <AboutScreen />}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f2f2f2'
  },
  content: {
    flex: 1
  }
});
