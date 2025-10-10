import React, { useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
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
import React, { useEffect, useMemo, useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

const words = {
  hello: 'um cumprimento amigável',
  world: 'o planeta que habitamos',
  react: 'biblioteca para construir interfaces',
  expo: 'ferramentas para apps React Native',
  dictionary: 'coleção de palavras e significados',
  student: 'pessoa que estuda ou está em processo de aprendizagem',
  teacher: 'profissional responsável por orientar e ensinar alunos',
  learn: 'adquirir conhecimento ou habilidade nova',
  practice: 'repetir uma atividade para ganhar confiança e domínio',
  homework: 'tarefas escolares para realizar fora da sala de aula'
};

const dictionaryEntries = Object.entries(words);

const getDefinition = (term) => {
  if (!term) {
    return undefined;
  }

  return words[term] ?? undefined;
};

const getSuggestions = (term) => {
  if (!term) {
    return [];
  }

  const normalized = term.toLowerCase();

  return Object.keys(words)
    .filter((word) => word.includes(normalized) && word !== normalized)
    .slice(0, 5);
};

const getRandomEntry = () => {
  if (dictionaryEntries.length === 0) {
    return undefined;
  }

  const index = Math.floor(Math.random() * dictionaryEntries.length);
  const [word, meaning] = dictionaryEntries[index];

  return { word, meaning };
};

const addToHistory = (history, term) => {
  if (!term || history.includes(term)) {
    return history;
  }

  const updated = [term, ...history];

  return updated.slice(0, 8);
};

export default function App() {
  const [query, setQuery] = useState('');
  const [activePage, setActivePage] = useState('dictionary');
  const [dailyWord, setDailyWord] = useState(() => getRandomEntry());
  const [history, setHistory] = useState([]);

  const normalizedQuery = query.trim().toLowerCase();
  const definition = getDefinition(normalizedQuery);
  const suggestions = useMemo(
    () => getSuggestions(normalizedQuery),
    [normalizedQuery]
  );

  useEffect(() => {
    if (definition && normalizedQuery) {
      setHistory((prev) => addToHistory(prev, normalizedQuery));
    }
  }, [definition, normalizedQuery]);

  const refreshDailyWord = () => {
    const newWord = getRandomEntry();

    if (newWord) {
      setDailyWord(newWord);
      setQuery('');
    }
  };

  const handleChipPress = (value) => {
    setQuery(value);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <NavigationTabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
      <View style={styles.pageContainer}>{renderContent()}</View>
      <View style={styles.navBar}>
        <Pressable
          style={[styles.navButton, activePage === 'dictionary' && styles.navButtonActive]}
          onPress={() => setActivePage('dictionary')}
        >
          <Text
            style={[styles.navButtonText, activePage === 'dictionary' && styles.navButtonTextActive]}
          >
            Dicionário
          </Text>
        </Pressable>
        <Pressable
          style={[styles.navButton, activePage === 'about' && styles.navButtonActive]}
          onPress={() => setActivePage('about')}
        >
          <Text style={[styles.navButtonText, activePage === 'about' && styles.navButtonTextActive]}>
            Sobre
          </Text>
        </Pressable>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        {activePage === 'dictionary' ? (
          <>
            <Text style={styles.title}>Mini Dicionário</Text>
            <Text style={styles.subtitle}>
              Digite uma palavra em inglês para ver a tradução livre.
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Digite aqui..."
              value={query}
              onChangeText={setQuery}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <View style={styles.resultBox}>
              {definition ? (
                <>
                  <Text style={styles.definitionTitle}>{query.trim()}</Text>
                  <Text style={styles.definition}>{definition}</Text>
                </>
              ) : (
                <Text style={styles.placeholder}>Nenhum resultado encontrado.</Text>
              )}
            </View>
            {!definition && suggestions.length > 0 && (
              <View style={styles.suggestionsBox}>
                <Text style={styles.sectionTitle}>Talvez você procure:</Text>
                <View style={styles.suggestionsList}>
                  {suggestions.map((item) => (
                    <Pressable
                      key={item}
                      onPress={() => handleChipPress(item)}
                      style={styles.suggestionChip}
                    >
                      <Text style={styles.suggestionText}>{item}</Text>
                    </Pressable>
                  ))}
                </View>
              </View>
            )}
            {dailyWord && (
              <View style={styles.dailyWordBox}>
                <View style={styles.dailyWordHeader}>
                  <Text style={styles.sectionTitle}>Palavra aleatória</Text>
                  <Pressable onPress={refreshDailyWord} style={styles.secondaryButton}>
                    <Text style={styles.secondaryButtonText}>Surpreenda-me</Text>
                  </Pressable>
                </View>
                <Text style={styles.dailyWordWord}>{dailyWord.word}</Text>
                <Text style={styles.dailyWordDefinition}>{dailyWord.meaning}</Text>
              </View>
            )}
            {history.length > 0 && (
              <View style={styles.historyBox}>
                <Text style={styles.sectionTitle}>Histórico recente</Text>
                <View style={styles.historyList}>
                  {history.map((item) => (
                    <Pressable
                      key={item}
                      onPress={() => handleChipPress(item)}
                      style={styles.historyChip}
                    >
                      <Text style={styles.historyText}>{item}</Text>
                    </Pressable>
                  ))}
                </View>
              </View>
            )}
          </>
        ) : (
          <View style={styles.aboutContainer}>
            <Text style={styles.title}>Sobre o Mini Dicionário</Text>
            <Text style={styles.aboutText}>
              Este aplicativo foi criado para ajudar estudantes brasileiros a
              praticarem vocabulário em inglês. Digite uma palavra simples e
              veja uma explicação rápida em português.
            </Text>
            <Text style={styles.aboutText}>
              A lista de palavras cresce com o tempo e prioriza termos comuns
              do dia a dia. Se sentir falta de algum termo, compartilhe a ideia
              com a comunidade para incluirmos na próxima atualização!
            </Text>
            <Text style={styles.aboutText}>
              Construído com React Native e Expo, o Mini Dicionário é leve e
              ideal para revisões rápidas no celular ou durante os estudos.
            </Text>
          </View>
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
  pageContainer: {
    flex: 1
  container: {
    flexGrow: 1,
    padding: 24,
    alignItems: 'stretch',
    gap: 16
  },
  navBar: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 12,
    gap: 12,
    backgroundColor: '#f2f2f2'
  },
  navButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: '#e0e0e0',
    alignItems: 'center'
  },
  navButtonActive: {
    backgroundColor: '#222'
  },
  navButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#444'
  },
  navButtonTextActive: {
    color: '#fff'
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#222'
  },
  subtitle: {
    fontSize: 16,
    color: '#555'
  },
  input: {
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    fontSize: 18
  },
  resultBox: {
    minHeight: 120,
    borderRadius: 12,
    backgroundColor: '#fff',
    padding: 16,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#eee',
    gap: 8
  },
  definitionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    textTransform: 'capitalize'
  },
  definition: {
    fontSize: 20,
    color: '#333'
  },
  placeholder: {
    fontSize: 16,
    color: '#999'
  },
  suggestionsBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#eee',
    gap: 12
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333'
  },
  suggestionsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8
  },
  suggestionChip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: '#f0f0f0'
  },
  suggestionText: {
    fontSize: 14,
    color: '#333'
  },
  dailyWordBox: {
    backgroundColor: '#222',
    borderRadius: 16,
    padding: 20,
    gap: 8
  },
  dailyWordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  secondaryButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: '#444'
  },
  secondaryButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14
  },
  dailyWordWord: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
    textTransform: 'capitalize'
  },
  dailyWordDefinition: {
    fontSize: 16,
    color: '#f5f5f5'
  },
  historyBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#eee',
    gap: 12
  },
  historyList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8
  },
  historyChip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: '#e8e8e8'
  },
  historyText: {
    fontSize: 14,
    color: '#333'
  },
  aboutContainer: {
    gap: 16
  },
  aboutText: {
    fontSize: 16,
    color: '#444',
    lineHeight: 24
  }
});
