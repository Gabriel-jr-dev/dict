import React, { useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

const buildExampleSentences = (entry) => {
  if (!entry) {
    return [];
  }

  const baseExample = entry.example;
  const lowerWord = entry.word.toLowerCase();

  return [
    baseExample,
    `Try using the word "${entry.word}" in a short message to a friend today.`,
    `Learning how to pronounce "${lowerWord}" will make conversations easier.`,
    `Write a new sentence with "${lowerWord}" in your study notebook.`
  ];
};

export const DefinitionScreen = ({ entry, onClose, onToggleFavorite, isFavorite }) => {
  const examples = useMemo(() => buildExampleSentences(entry), [entry]);

  if (!entry) {
    return null;
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Pressable
          onPress={onClose}
          style={({ pressed }) => [styles.backButton, pressed && styles.backButtonPressed]}
        >
          <Text style={styles.backButtonText}>◀ Voltar</Text>
        </Pressable>
        <Pressable
          onPress={() => onToggleFavorite(entry.word)}
          style={({ pressed }) => [
            styles.favoriteButton,
            isFavorite && styles.favoriteButtonActive,
            pressed && styles.favoriteButtonPressed
          ]}
        >
          <Text style={[styles.favoriteButtonText, isFavorite && styles.favoriteButtonTextActive]}>
            {isFavorite ? '★ Favorito' : '☆ Favoritar'}
          </Text>
        </Pressable>
      </View>

      <View style={styles.wordBox}>
        <Text style={styles.word}>{entry.word}</Text>
        <Text style={styles.meaning}>{entry.meaning}</Text>
      </View>

      <View style={styles.examplesBox}>
        <Text style={styles.examplesTitle}>Frases de exemplo</Text>
        {examples.map((sentence, index) => (
          <View key={sentence} style={styles.exampleItem}>
            <Text style={styles.exampleIndex}>{index + 1}.</Text>
            <Text style={styles.exampleSentence}>{sentence}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#EEF2FF'
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 48,
    gap: 24
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  backButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 999,
    backgroundColor: '#E0E7FF'
  },
  backButtonPressed: {
    backgroundColor: '#C7D2FE'
  },
  backButtonText: {
    color: '#1E1B4B',
    fontWeight: '600'
  },
  favoriteButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(76, 110, 245, 0.4)',
    backgroundColor: 'rgba(76, 110, 245, 0.08)'
  },
  favoriteButtonActive: {
    backgroundColor: 'rgba(250, 204, 21, 0.18)',
    borderColor: '#FACC15'
  },
  favoriteButtonPressed: {
    transform: [{ scale: 0.97 }]
  },
  favoriteButtonText: {
    fontSize: 14,
    color: '#1E1B4B',
    fontWeight: '600'
  },
  favoriteButtonTextActive: {
    color: '#92400E'
  },
  wordBox: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    gap: 12,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.25)',
    shadowColor: '#0F172A',
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4
  },
  word: {
    fontSize: 28,
    fontWeight: '700',
    color: '#312E81',
    textTransform: 'capitalize'
  },
  meaning: {
    fontSize: 18,
    color: '#334155',
    lineHeight: 26
  },
  examplesBox: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    gap: 16,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.25)',
    shadowColor: '#0F172A',
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4
  },
  examplesTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B'
  },
  exampleItem: {
    flexDirection: 'row',
    gap: 12
  },
  exampleIndex: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4C1D95'
  },
  exampleSentence: {
    flex: 1,
    fontSize: 16,
    color: '#475569',
    lineHeight: 22
  }
});
