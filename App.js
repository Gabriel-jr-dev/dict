import React, { useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { NavigationTabs } from './src/components/NavigationTabs';
import { useDictionaryData } from './src/hooks/useDictionaryData';
import { wordMap } from './src/data/entries';
import { DictionaryScreen } from './src/screens/DictionaryScreen';
import { FavoritesScreen } from './src/screens/FavoritesScreen';
import { AboutScreen } from './src/screens/AboutScreen';

const tabs = [
  { id: 'dictionary', label: 'Dicionário' },
  { id: 'favorites', label: 'Favoritos' },
  { id: 'about', label: 'Sobre' }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('dictionary');

  const {
    query,
    setQuery,
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
  } = useDictionaryData();

  const handleNavigateToDictionary = (word) => {
    setActiveTab('dictionary');
    handleSelectWord(word);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dictionary':
        return (
          <DictionaryScreen
            query={query}
            onQueryChange={setQuery}
            activeEntry={activeEntry}
            suggestions={suggestions}
            onSelectSuggestion={handleSelectWord}
            history={history}
            onSelectHistory={handleSelectWord}
            onClearHistory={clearHistory}
            onToggleFavorite={toggleFavorite}
            favorites={favorites}
            dailyWord={dailyWord}
            onRefreshDailyWord={refreshDailyWord}
            filteredEntries={filteredEntries}
            categoryOptions={categoryOptions}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        );
      case 'favorites':
        return (
          <FavoritesScreen
            favorites={favorites}
            onSelectWord={handleNavigateToDictionary}
            onToggleFavorite={toggleFavorite}
            wordMap={wordMap}
          />
        );
      case 'about':
      default:
        return <AboutScreen />;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#EEF2FF" />
      <View style={styles.appContainer}>
        <NavigationTabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
        <View style={styles.content}>{renderContent()}</View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#EEF2FF'
  },
  appContainer: {
    flex: 1,
    backgroundColor: '#EEF2FF'
  },
  content: {
    flex: 1
  }
});
