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
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Mini Dicionário</Text>
          <Text style={styles.headerSubtitle}>Aprenda um pouco a cada dia</Text>
        </View>
      </View>
      <NavigationTabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
      <View style={styles.pageContainer}>{renderContent()}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8fafc'
  },
  header: {
    backgroundColor: '#4338ca',
    paddingHorizontal: 24,
    paddingVertical: 28,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    marginBottom: 16,
    shadowColor: '#312e81',
    shadowOpacity: 0.18,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#fff'
  },
  headerSubtitle: {
    marginTop: 6,
    fontSize: 16,
    color: '#e0e7ff'
  },
  pageContainer: {
    flex: 1
  }
});
