import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export const FavoritesScreen = ({ favorites, onSelectWord, onToggleFavorite, wordMap }) => {
  const favoriteEntries = favorites
    .map((word) => wordMap[word])
    .filter(Boolean);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.heroCard}>
        <Text style={styles.heroTitle}>Seus destaques</Text>
        <Text style={styles.heroSubtitle}>
          Revise rapidamente as palavras que você marcou como favoritas e mantenha o vocabulário
          sempre em dia.
        </Text>
      </View>
      {favoriteEntries.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateTitle}>Lista vazia</Text>
          <Text style={styles.emptyStateText}>
            Você ainda não salvou palavras. Volte ao dicionário e toque em “☆ Favoritar” para
            começar sua coleção pessoal.
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
              <View>
                <Text style={styles.cardTitle}>{entry.word}</Text>
                <Text style={styles.cardCategory}>{entry.category}</Text>
              </View>
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
    backgroundColor: '#f1f5f9',
    padding: 20,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#cbd5f5',
    gap: 8,
    ...surfaceShadow
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e1b4b'
  },
  heroSubtitle: {
    fontSize: 15,
    color: '#475569',
    lineHeight: 22
  },
  emptyState: {
    backgroundColor: '#fff',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    padding: 24,
    gap: 10,
    ...surfaceShadow
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a'
  },
  emptyStateText: {
    fontSize: 15,
    color: '#475569',
    lineHeight: 22
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    padding: 20,
    gap: 10,
    ...surfaceShadow
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#312e81',
    textTransform: 'capitalize'
  },
  cardCategory: {
    marginTop: 4,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: '#eef2ff',
    color: '#4338ca',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize'
  },
  cardMeaning: {
    fontSize: 16,
    color: '#1f2937'
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
    backgroundColor: '#fee2e2'
  },
  removeButtonText: {
    color: '#b91c1c',
    fontWeight: '700'
  }
});
