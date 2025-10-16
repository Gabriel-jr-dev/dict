import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export const FavoritesScreen = ({ favorites, onSelectWord, onToggleFavorite, wordMap }) => {
  const favoriteEntries = favorites
    .map((word) => wordMap[word])
    .filter(Boolean);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.container}>
      <Text style={styles.title}>Favoritos</Text>
      <Text style={styles.subtitle}>
        Guarde aqui as palavras que você quer revisar com frequência.
      </Text>
      {favoriteEntries.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>
            Você ainda não salvou palavras. Volte ao dicionário e toque em “☆ Favoritar”.
          </Text>
        </View>
      ) : (
        favoriteEntries.map((entry) => (
          <Pressable
            key={entry.word}
            style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
            onPress={() => onSelectWord(entry.word)}
          >
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{entry.word}</Text>
              <Pressable
                onPress={(event) => {
                  event.stopPropagation?.();
                  onToggleFavorite(entry.word);
                }}
                style={({ pressed }) => [styles.removeButton, pressed && styles.removeButtonPressed]}
              >
                <Text style={styles.removeButtonText}>Remover</Text>
              </Pressable>
            </View>
            <Text style={styles.cardMeaning}>{entry.meaning}</Text>
            <Text style={styles.cardExample}>{entry.example}</Text>
          </Pressable>
        ))
      )}
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
  emptyState: {
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.25)',
    padding: 28,
    shadowColor: '#0F172A',
    shadowOpacity: 0.06,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
    elevation: 4
  },
  emptyStateText: {
    fontSize: 16,
    color: '#475569',
    lineHeight: 24
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.25)',
    padding: 20,
    gap: 10,
    shadowColor: '#0F172A',
    shadowOpacity: 0.05,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E1B4B',
    textTransform: 'capitalize'
  },
  cardMeaning: {
    fontSize: 16,
    color: '#334155',
    lineHeight: 24
  },
  cardExample: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 22
  },
  removeButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: '#F87171'
  },
  removeButtonText: {
    color: '#fff',
    fontWeight: '600'
  },
  cardPressed: {
    transform: [{ scale: 0.98 }]
  },
  removeButtonPressed: {
    opacity: 0.85
  }
});
