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
      <View style={styles.heroCard}>
        <Text style={styles.heroTitle}>Descubra novas palavras</Text>
        <Text style={styles.heroSubtitle}>
          Procure termos em inglês, veja significados rápidos em português e salve os
          favoritos para revisar depois.
        </Text>
      </View>

      <View style={styles.surface}>
        <Text style={styles.sectionLabel}>Pesquisa rápida</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite uma palavra em inglês"
          value={query}
          onChangeText={onQueryChange}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <View style={styles.resultBox}>
          {activeEntry ? (
            <>
              <View style={styles.resultHeader}>
                <View style={styles.resultTitleGroup}>
                  <Text style={styles.definitionTitle}>{activeEntry.word}</Text>
                  <Text style={styles.definitionCategory}>{activeEntry.category}</Text>
                </View>
                <Pressable
                  onPress={() => onToggleFavorite(activeEntry.word)}
                  style={[styles.favoriteButton, isFavorite && styles.favoriteButtonActive]}
                >
                  <Text
                    style={[styles.favoriteButtonText, isFavorite && styles.favoriteButtonTextActive]}
                  >
                    {isFavorite ? '★ Salva' : '☆ Favoritar'}
                  </Text>
                </Pressable>
              </View>
              <Text style={styles.definition}>{activeEntry.meaning}</Text>
              <View style={styles.exampleBox}>
                <Text style={styles.exampleLabel}>Exemplo</Text>
                <Text style={styles.exampleText}>{activeEntry.example}</Text>
              </View>
            </>
          ) : (
            <View style={styles.placeholderBox}>
              <Text style={styles.placeholderTitle}>Nenhum resultado ainda</Text>
              <Text style={styles.placeholder}>Digite uma palavra ou escolha uma sugestão.</Text>
            </View>
          )}
        </View>
      </View>

      {!activeEntry && suggestions.length > 0 && (
        <View style={styles.surface}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionLabel}>Sugestões</Text>
            <Text style={styles.sectionHelper}>Toque para preencher a busca</Text>
          </View>
          <View style={styles.chipList}>
            {suggestions.map((item) => (
              <Pressable key={item} onPress={() => onSelectSuggestion(item)} style={styles.chip}>
                <Text style={styles.chipText}>{item}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      )}

      {dailyWord && (
        <View style={[styles.surface, styles.dailyWordBox]}>
          <View style={styles.dailyWordHeader}>
            <Text style={styles.sectionLabelAlt}>Palavra do momento</Text>
            <Pressable onPress={onRefreshDailyWord} style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>Nova palavra</Text>
            </Pressable>
          </View>
          <Text style={styles.dailyWordWord}>{dailyWord.word}</Text>
          <Text style={styles.dailyWordDefinition}>{dailyWord.meaning}</Text>
          <Text style={styles.dailyWordExample}>{dailyWord.example}</Text>
        </View>
      )}

      {history.length > 0 && (
        <View style={styles.surface}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionLabel}>Histórico recente</Text>
            <Pressable onPress={onClearHistory} style={styles.linkButton}>
              <Text style={styles.linkButtonText}>Limpar</Text>
            </Pressable>
          </View>
          <View style={styles.chipList}>
            {history.map((item) => (
              <Pressable
                key={item}
                onPress={() => onSelectHistory(item)}
                style={[styles.chip, styles.historyChip]}
              >
                <Text style={styles.chipText}>{item}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      )}

      <View style={styles.surface}>
        <Text style={styles.sectionLabel}>Explore por categoria</Text>
        <View style={styles.chipList}>
          {categoryOptions.map((category) => {
            const isSelected = category === selectedCategory;
            return (
              <Pressable
                key={category}
                onPress={() => onSelectCategory(category)}
                style={[styles.chip, isSelected && styles.categoryChipActive]}
              >
                <Text style={[styles.chipText, isSelected && styles.categoryChipTextActive]}>
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

const surfaceShadow = {
  shadowColor: '#0f172a',
  shadowOpacity: 0.08,
  shadowRadius: 18,
  shadowOffset: { width: 0, height: 6 },
  elevation: 4
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 32,
    gap: 18
  },
  heroCard: {
    backgroundColor: '#eef2ff',
    padding: 20,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#c7d2fe',
    ...surfaceShadow
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#312e81',
    marginBottom: 6
  },
  heroSubtitle: {
    fontSize: 15,
    color: '#4338ca',
    lineHeight: 22
  },
  surface: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    gap: 14,
    ...surfaceShadow
  },
  sectionLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a'
  },
  sectionLabelAlt: {
    fontSize: 18,
    fontWeight: '700',
    color: '#e0e7ff'
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  sectionHelper: {
    fontSize: 13,
    color: '#64748b'
  },
  input: {
    height: 50,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#cbd5f5',
    paddingHorizontal: 18,
    backgroundColor: '#f8fafc',
    fontSize: 16,
    color: '#0f172a'
  },
  resultBox: {
    borderRadius: 16,
    backgroundColor: '#f8fafc',
    padding: 18,
    borderWidth: 1,
    borderColor: '#d0d7ee',
    gap: 12
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12
  },
  resultTitleGroup: {
    flex: 1,
    gap: 6
  },
  definitionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e1b4b',
    textTransform: 'capitalize'
  },
  definitionCategory: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: '#c7d2fe',
    color: '#3730a3',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize'
  },
  definition: {
    fontSize: 17,
    color: '#1f2937'
  },
  exampleBox: {
    backgroundColor: '#e0e7ff',
    borderRadius: 14,
    padding: 12,
    gap: 4
  },
  exampleLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#312e81'
  },
  exampleText: {
    fontSize: 15,
    color: '#1e293b',
    lineHeight: 22
  },
  placeholderBox: {
    gap: 6,
    alignItems: 'flex-start'
  },
  placeholderTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937'
  },
  placeholder: {
    fontSize: 14,
    color: '#64748b'
  },
  favoriteButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#4338ca'
  },
  favoriteButtonActive: {
    backgroundColor: '#4338ca'
  },
  favoriteButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#4338ca'
  },
  favoriteButtonTextActive: {
    color: '#f8fafc'
  },
  chipList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10
  },
  chip: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: '#eef2ff'
  },
  chipText: {
    fontSize: 14,
    color: '#312e81'
  },
  historyChip: {
    backgroundColor: '#e2e8f0'
  },
  categoryChipActive: {
    backgroundColor: '#4338ca'
  },
  categoryChipTextActive: {
    color: '#f8fafc'
  },
  dailyWordBox: {
    backgroundColor: '#4338ca',
    borderColor: '#3730a3'
  },
  dailyWordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  secondaryButton: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: '#312e81'
  },
  secondaryButtonText: {
    color: '#f5f3ff',
    fontWeight: '600'
  },
  dailyWordWord: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
    textTransform: 'capitalize'
  },
  dailyWordDefinition: {
    fontSize: 16,
    color: '#ede9fe'
  },
  dailyWordExample: {
    fontSize: 14,
    color: '#c7d2fe'
  },
  linkButton: {
    padding: 6
  },
  linkButtonText: {
    color: '#4338ca',
    fontWeight: '600'
  },
  entryList: {
    gap: 12
  },
  entryCard: {
    borderWidth: 1,
    borderColor: '#e0e7ff',
    borderRadius: 16,
    padding: 16,
    backgroundColor: '#f8fafc',
    gap: 6
  },
  entryWord: {
    fontSize: 16,
    fontWeight: '700',
    color: '#312e81',
    textTransform: 'capitalize'
  },
  entryMeaning: {
    fontSize: 14,
    color: '#475569'
  }
});
