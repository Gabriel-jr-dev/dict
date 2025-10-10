import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export const FavoritesScreen = ({ favorites, onSelectWord, onToggleFavorite, wordMap }) => {
  const favoriteEntries = favorites
    .map((word) => wordMap[word])
    .filter(Boolean);

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
            style={styles.card}
            onPress={() => onSelectWord(entry.word)}
          >
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{entry.word}</Text>
              <Pressable
                onPress={(event) => {
                  event.stopPropagation?.();
                  onToggleFavorite(entry.word);
                }}
                style={styles.removeButton}
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
  emptyState: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
    padding: 24
  },
  emptyStateText: {
    fontSize: 16,
    color: '#555',
    lineHeight: 22
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
    padding: 16,
    gap: 8
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#222',
    textTransform: 'capitalize'
  },
  cardMeaning: {
    fontSize: 16,
    color: '#444'
  },
  cardExample: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22
  },
  removeButton: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 999,
    backgroundColor: '#f87171'
  },
  removeButtonText: {
    color: '#fff',
    fontWeight: '600'
  }
});
