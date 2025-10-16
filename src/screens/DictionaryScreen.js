import React from 'react';
import {
  Image,
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
  onSelectCategory,
  onOpenDefinition
}) => {
  const isFavorite = activeEntry ? favorites.includes(activeEntry.word) : false;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.container}>
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
        placeholderTextColor="#94A3B8"
      />
      <View style={styles.resultBox}>
        {activeEntry ? (
          <>
            <View style={styles.resultHeader}>
              <Text style={styles.definitionTitle}>{activeEntry.word}</Text>
              <Pressable
                onPress={() => onToggleFavorite(activeEntry.word)}
                style={({ pressed }) => [
                  styles.favoriteButton,
                  isFavorite && styles.favoriteButtonActive,
                  pressed && styles.favoriteButtonPressed
                ]}
              >
                <Text
                  style={[styles.favoriteButtonText, isFavorite && styles.favoriteButtonTextActive]}
                >
                  {isFavorite ? '★ Favorito' : '☆ Favoritar'}
                </Text>
              </Pressable>
            </View>
            <Pressable
              accessibilityRole="button"
              onPress={() => onOpenDefinition?.(activeEntry)}
              style={({ pressed }) => [
                styles.quickDefinition,
                pressed && styles.quickDefinitionPressed
              ]}
            >
              <View style={styles.previewContent}>
                {activeEntry.image && (
                  <Image
                    source={{ uri: activeEntry.image }}
                    style={styles.previewImage}
                    resizeMode="cover"
                    accessible
                    accessibilityLabel={`Imagem ilustrativa para ${activeEntry.word}`}
                  />
                )}
                <View style={styles.resultTitleGroup}>
                  <Text style={styles.definition}>{activeEntry.meaning}</Text>
                  <Text style={styles.exampleLabel}>Exemplo rápido</Text>
                  <Text style={styles.exampleText}>{activeEntry.example}</Text>
                </View>
                <Text style={styles.definitionHint}>Toque para ver mais detalhes</Text>
              </View>
            </Pressable>
          </>
        ) : (
          <View style={styles.placeholderBox}>
            <Text style={styles.placeholderTitle}>
              Procure por uma palavra para ver o significado.
            </Text>
            <Text style={styles.placeholderHelper}>
              Você também pode explorar pelas categorias abaixo.
            </Text>
          </View>
        )}
      </View>

      {!activeEntry && suggestions.length > 0 && (
        <View style={styles.surface}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionLabel}>Sugestões</Text>
            <Text style={styles.sectionHelper}>Toque para preencher a busca</Text>
          </View>
          <View style={styles.chipList}>
            {suggestions.map((item) => (
              <Pressable
                key={item}
                onPress={() => onSelectSuggestion(item)}
                style={({ pressed }) => [styles.suggestionChip, pressed && styles.chipPressed]}
              >
                <Text style={styles.suggestionText}>{item}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      )}

      {dailyWord && (
        <View style={[styles.surface, styles.dailyWordBox]}>
          <View style={styles.dailyWordHeader}>
            <Text style={styles.sectionTitle}>Palavra do momento</Text>
            <Pressable
              onPress={onRefreshDailyWord}
              style={({ pressed }) => [styles.secondaryButton, pressed && styles.secondaryButtonPressed]}
            >
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
            <Pressable
              onPress={onClearHistory}
              style={({ pressed }) => [styles.linkButton, pressed && styles.linkButtonPressed]}
            >
              <Text style={styles.linkButtonText}>Limpar</Text>
            </Pressable>
          </View>
          <View style={styles.chipList}>
            {history.map((item) => (
              <Pressable
                key={item}
                onPress={() => onSelectHistory(item)}
                style={({ pressed }) => [styles.historyChip, pressed && styles.chipPressed]}
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
                style={({ pressed }) => [
                  styles.categoryChip,
                  isSelected && styles.categoryChipActive,
                  pressed && styles.chipPressed
                ]}
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
              style={({ pressed }) => [styles.entryCard, pressed && styles.entryCardPressed]}
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
  screen: {
    backgroundColor: '#EEF2FF'
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 48,
    gap: 20
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#1E1B4B'
  },
  subtitle: {
    fontSize: 16,
    color: '#475569',
    lineHeight: 22
  },
  input: {
    height: 48,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.6)',
    paddingHorizontal: 18,
    backgroundColor: '#fff',
    fontSize: 18,
    color: '#0F172A',
    shadowColor: '#0F172A',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2
  },
  resultBox: {
    borderRadius: 18,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.25)',
    gap: 10,
    shadowColor: '#0F172A',
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4
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
    color: '#1E293B',
    textTransform: 'capitalize'
  },
  definition: {
    fontSize: 18,
    color: '#334155',
    lineHeight: 24
  },
  exampleLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#475569'
  },
  exampleText: {
    fontSize: 16,
    color: '#475569',
    lineHeight: 22
  },
  quickDefinition: {
    marginTop: 6,
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.25)',
    gap: 10
  },
  previewContent: {
    gap: 12
  },
  previewImage: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 14
  },
  quickDefinitionPressed: {
    backgroundColor: '#E2E8F0'
  },
  definitionHint: {
    fontSize: 13,
    color: '#64748B',
    fontStyle: 'italic'
  },
  placeholderBox: {
    gap: 6,
    alignItems: 'flex-start'
  },
  placeholderTitle: {
    fontSize: 16,
    color: '#94A3B8'
  },
  placeholderHelper: {
    fontSize: 14,
    color: '#A5B4FC'
  },
  suggestionsBox: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.25)',
    gap: 12,
    shadowColor: '#0F172A',
    shadowOpacity: 0.05,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B'
  },
  chipList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10
  },
  suggestionChip: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: 'rgba(76, 110, 245, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(76, 110, 245, 0.25)'
  },
  chipText: {
    fontSize: 14,
    color: '#1D4ED8',
    fontWeight: '600',
    textTransform: 'capitalize'
  },
  dailyWordBox: {
    backgroundColor: '#312E81',
    borderRadius: 24,
    padding: 24,
    gap: 12,
    shadowColor: '#312E81',
    shadowOpacity: 0.3,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 12 },
    elevation: 5
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
    color: '#E0E7FF'
  },
  dailyWordExample: {
    fontSize: 14,
    color: '#C7D2FE'
  },
  secondaryButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 999,
    backgroundColor: '#4338CA'
  },
  secondaryButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14
  },
  secondaryButtonPressed: {
    opacity: 0.85
  },
  historyBox: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.25)',
    gap: 12,
    shadowColor: '#0F172A',
    shadowOpacity: 0.05,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  historyChip: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.25)'
  },
  historyText: {
    fontSize: 14,
    color: '#1E293B',
    textTransform: 'capitalize'
  },
  linkButton: {
    padding: 8,
    borderRadius: 999
  },
  linkButtonText: {
    color: '#2563EB',
    fontWeight: '600'
  },
  linkButtonPressed: {
    backgroundColor: 'rgba(37, 99, 235, 0.08)'
  },
  favoriteButton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(76, 110, 245, 0.4)',
    backgroundColor: 'rgba(76, 110, 245, 0.08)'
  },
  favoriteButtonActive: {
    backgroundColor: 'rgba(250, 204, 21, 0.18)',
    borderColor: '#FACC15'
  },
  favoriteButtonText: {
    fontSize: 14,
    color: '#1E1B4B',
    fontWeight: '600'
  },
  favoriteButtonTextActive: {
    color: '#92400E'
  },
  favoriteButtonPressed: {
    transform: [{ scale: 0.98 }]
  },
  categoriesBox: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.25)',
    gap: 16,
    shadowColor: '#0F172A',
    shadowOpacity: 0.05,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3
  },
  categoryChip: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.25)'
  },
  categoryChipActive: {
    backgroundColor: '#4C6EF5',
    borderColor: '#4C6EF5'
  },
  categoryText: {
    fontSize: 14,
    color: '#1F2937',
    fontWeight: '600',
    textTransform: 'capitalize'
  },
  categoryTextActive: {
    color: '#fff'
  },
  entryList: {
    gap: 14
  },
  entryCard: {
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.25)',
    borderRadius: 16,
    padding: 18,
    backgroundColor: '#FFFFFF',
    gap: 6,
    shadowColor: '#0F172A',
    shadowOpacity: 0.04,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 8 },
    elevation: 2
  },
  entryWord: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E1B4B',
    textTransform: 'capitalize'
  },
  entryMeaning: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 20
  },
  chipPressed: {
    transform: [{ scale: 0.97 }]
  },
  entryCardPressed: {
    transform: [{ scale: 0.98 }]
  }
});
