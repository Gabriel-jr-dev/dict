import React from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import { QuickQuiz } from '../components/QuickQuiz';

export const DictionaryScreen = ({
  query,
  onQueryChange,
  activeEntry,
  suggestions,
  onSelectSuggestion,
  history,
  onSelectHistory,
  onClearHistory,
  onToggleFavorite,
  favorites,
  dailyWord,
  onRefreshDailyWord,
  filteredEntries,
  categoryOptions,
  selectedCategory,
  onSelectCategory
}) => {
  const isFavorite = activeEntry ? favorites.includes(activeEntry.word) : false;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Mini Dicionário</Text>
      <Text style={styles.subtitle}>
        Procure palavras em inglês, veja significados em português e salve suas favoritas.
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Digite aqui..."
        value={query}
        onChangeText={onQueryChange}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <View style={styles.resultBox}>
        {activeEntry ? (
          <>
            <View style={styles.resultHeader}>
              <Text style={styles.definitionTitle}>{activeEntry.word}</Text>
              <Pressable
                onPress={() => onToggleFavorite(activeEntry.word)}
                style={[styles.favoriteButton, isFavorite && styles.favoriteButtonActive]}
              >
                <Text style={[styles.favoriteButtonText, isFavorite && styles.favoriteButtonTextActive]}>
                  {isFavorite ? '★ Favorito' : '☆ Favoritar'}
                </Text>
              </Pressable>
            </View>
            <Text style={styles.definition}>{activeEntry.meaning}</Text>
            <Text style={styles.exampleLabel}>Exemplo:</Text>
            <Text style={styles.exampleText}>{activeEntry.example}</Text>
          </>
        ) : (
          <Text style={styles.placeholder}>Nenhum resultado encontrado. Tente outra palavra.</Text>
        )}
      </View>

      {!activeEntry && suggestions.length > 0 && (
        <View style={styles.suggestionsBox}>
          <Text style={styles.sectionTitle}>Talvez você procure:</Text>
          <View style={styles.chipList}>
            {suggestions.map((item) => (
              <Pressable
                key={item}
                onPress={() => onSelectSuggestion(item)}
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
            <Text style={styles.sectionTitle}>Palavra do momento</Text>
            <Pressable onPress={onRefreshDailyWord} style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>Surpreenda-me</Text>
            </Pressable>
          </View>
          <Text style={styles.dailyWordWord}>{dailyWord.word}</Text>
          <Text style={styles.dailyWordDefinition}>{dailyWord.meaning}</Text>
          <Text style={styles.dailyWordExample}>{dailyWord.example}</Text>
        </View>
      )}

      {history.length > 0 && (
        <View style={styles.historyBox}>
          <View style={styles.historyHeader}>
            <Text style={styles.sectionTitle}>Histórico recente</Text>
            <Pressable onPress={onClearHistory} style={styles.linkButton}>
              <Text style={styles.linkButtonText}>Limpar</Text>
            </Pressable>
          </View>
          <View style={styles.chipList}>
            {history.map((item) => (
              <Pressable
                key={item}
                onPress={() => onSelectHistory(item)}
                style={styles.historyChip}
              >
                <Text style={styles.historyText}>{item}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      )}

      <View style={styles.categoriesBox}>
        <Text style={styles.sectionTitle}>Explore por categoria</Text>
        <View style={styles.chipList}>
          {categoryOptions.map((category) => {
            const isSelected = category === selectedCategory;
            return (
              <Pressable
                key={category}
                onPress={() => onSelectCategory(category)}
                style={[styles.categoryChip, isSelected && styles.categoryChipActive]}
              >
                <Text
                  style={[styles.categoryText, isSelected && styles.categoryTextActive]}
                >
                  {category === 'todas' ? 'Todas' : category}
                </Text>
              </Pressable>
            );
          })}
        </View>
        <View style={styles.entryList}>
          {filteredEntries.map((entry) => (
            <Pressable
              key={entry.word}
              onPress={() => onSelectSuggestion(entry.word)}
              style={styles.entryCard}
            >
              <Text style={styles.entryWord}>{entry.word}</Text>
              <Text style={styles.entryMeaning}>{entry.meaning}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      <QuickQuiz entries={filteredEntries} onSelectWord={onSelectSuggestion} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    gap: 16
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
    borderRadius: 12,
    backgroundColor: '#fff',
    padding: 16,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#eee',
    gap: 8
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12
  },
  definitionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    textTransform: 'capitalize'
  },
  definition: {
    fontSize: 18,
    color: '#333'
  },
  exampleLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666'
  },
  exampleText: {
    fontSize: 16,
    color: '#444',
    lineHeight: 22
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
  chipList: {
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
  dailyWordExample: {
    fontSize: 14,
    color: '#d9d9d9'
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
  historyBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#eee',
    gap: 12
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
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
  linkButton: {
    padding: 8
  },
  linkButtonText: {
    color: '#1d4ed8',
    fontWeight: '600'
  },
  favoriteButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#bbb'
  },
  favoriteButtonActive: {
    backgroundColor: '#ffe08a',
    borderColor: '#f2c94c'
  },
  favoriteButtonText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600'
  },
  favoriteButtonTextActive: {
    color: '#78450f'
  },
  categoriesBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#eee',
    gap: 12
  },
  categoryChip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: '#f0f0f0'
  },
  categoryChipActive: {
    backgroundColor: '#222'
  },
  categoryText: {
    fontSize: 14,
    color: '#333'
  },
  categoryTextActive: {
    color: '#fff'
  },
  entryList: {
    gap: 12
  },
  entryCard: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 12,
    padding: 16,
    backgroundColor: '#fafafa',
    gap: 4
  },
  entryWord: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
    textTransform: 'capitalize'
  },
  entryMeaning: {
    fontSize: 14,
    color: '#555'
  }
});
