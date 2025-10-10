import React from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

const DictionaryScreen = ({
  query,
  onChangeQuery,
  entry,
  suggestions,
  onChipPress,
  dailyWord,
  refreshDailyWord,
  history,
  onToggleFavorite,
  isFavorite,
  relatedWords
}) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Mini Dicionário</Text>
      <Text style={styles.subtitle}>
        Digite uma palavra em inglês para ver uma explicação rápida em português.
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Digite aqui..."
        value={query}
        onChangeText={onChangeQuery}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <View style={styles.resultBox}>
        {entry ? (
          <>
            <View style={styles.resultHeader}>
              <Text style={styles.definitionTitle}>{entry.word}</Text>
              <Pressable
                onPress={() => onToggleFavorite(entry.word)}
                style={[styles.favoriteButton, isFavorite && styles.favoriteButtonActive]}
              >
                <Text
                  style={[
                    styles.favoriteButtonText,
                    isFavorite && styles.favoriteButtonTextActive
                  ]}
                >
                  {isFavorite ? 'Salvo' : 'Salvar'}
                </Text>
              </Pressable>
            </View>
            <Text style={styles.definition}>{entry.meaning}</Text>
            <Text style={styles.exampleLabel}>Exemplo</Text>
            <Text style={styles.exampleText}>{entry.example}</Text>
          </>
        ) : (
          <Text style={styles.placeholder}>Nenhum resultado encontrado.</Text>
        )}
      </View>
      {!entry && suggestions.length > 0 && (
        <View style={styles.suggestionsBox}>
          <Text style={styles.sectionTitle}>Talvez você procure:</Text>
          <View style={styles.chipList}>
            {suggestions.map((item) => (
              <Pressable key={item} onPress={() => onChipPress(item)} style={styles.chip}>
                <Text style={styles.chipText}>{item}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      )}
      {entry && relatedWords.length > 0 && (
        <View style={styles.suggestionsBox}>
          <Text style={styles.sectionTitle}>Relacionadas</Text>
          <View style={styles.chipList}>
            {relatedWords.map((item) => (
              <Pressable key={item} onPress={() => onChipPress(item)} style={styles.secondaryChip}>
                <Text style={styles.secondaryChipText}>{item}</Text>
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
          <Text style={styles.dailyWordExample}>{dailyWord.example}</Text>
        </View>
      )}
      {history.length > 0 && (
        <View style={styles.historyBox}>
          <Text style={styles.sectionTitle}>Histórico recente</Text>
          <View style={styles.chipList}>
            {history.map((item) => (
              <Pressable key={item} onPress={() => onChipPress(item)} style={styles.historyChip}>
                <Text style={styles.historyText}>{item}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    alignItems: 'stretch',
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
    borderWidth: 1,
    borderColor: '#eee',
    gap: 12
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  definitionTitle: {
    fontSize: 22,
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
    color: '#555'
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
  chip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: '#f0f0f0'
  },
  chipText: {
    fontSize: 14,
    color: '#333'
  },
  secondaryChip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: '#e8f0ff'
  },
  secondaryChipText: {
    fontSize: 14,
    color: '#2d4b7c'
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
  dailyWordExample: {
    fontSize: 14,
    color: '#e1e1e1'
  },
  historyBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#eee',
    gap: 12
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
  favoriteButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#ccc'
  },
  favoriteButtonActive: {
    backgroundColor: '#ffd54f',
    borderColor: '#f0b400'
  },
  favoriteButtonText: {
    color: '#555',
    fontWeight: '600'
  },
  favoriteButtonTextActive: {
    color: '#2f1b00'
  }
});

export default DictionaryScreen;
