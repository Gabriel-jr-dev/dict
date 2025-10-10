import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

const createQuiz = (dictionary) => {
  if (!dictionary || dictionary.length < 2) {
    return undefined;
  }

  const randomIndex = Math.floor(Math.random() * dictionary.length);
  const correct = dictionary[randomIndex];
  const otherOptions = dictionary
    .filter((entry) => entry.word !== correct.word)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

  const optionWords = [...otherOptions, correct]
    .map((entry) => entry.word)
    .sort(() => Math.random() - 0.5);

  return {
    definition: correct.meaning,
    answer: correct.word,
    options: optionWords
  };
};

const StudyScreen = ({ favorites, onChipPress, categories, dictionary }) => {
  const [quizCard, setQuizCard] = useState(() => createQuiz(dictionary));
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelectOption = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuiz = () => {
    setQuizCard(createQuiz(dictionary));
    setSelectedOption(null);
  };

  const quizFeedback = useMemo(() => {
    if (!quizCard || !selectedOption) {
      return undefined;
    }

    const isCorrect = selectedOption === quizCard.answer;

    return isCorrect ? 'Resposta correta! Ótimo trabalho.' : `A resposta certa é "${quizCard.answer}".`;
  }, [quizCard, selectedOption]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Trilha de Estudos</Text>
      <Text style={styles.subtitle}>
        Organize seus estudos com favoritos, categorias e desafios rápidos.
      </Text>

      {favorites.length > 0 && (
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Favoritos</Text>
          <Text style={styles.description}>Clique para revisar rapidamente.</Text>
          <View style={styles.chipList}>
            {favorites.map((entry) => (
              <Pressable
                key={entry.word}
                onPress={() => onChipPress(entry.word)}
                style={styles.favoriteChip}
              >
                <Text style={styles.favoriteChipTitle}>{entry.word}</Text>
                <Text style={styles.favoriteChipMeaning}>{entry.meaning}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      )}

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Categorias</Text>
        <Text style={styles.description}>Estude por tema e descubra novas palavras.</Text>
        <View style={styles.categoryList}>
          {Object.entries(categories).map(([category, entries]) => (
            <View key={category} style={styles.categoryCard}>
              <Text style={styles.categoryTitle}>{category}</Text>
              <View style={styles.chipList}>
                {entries.map((entry) => (
                  <Pressable
                    key={entry.word}
                    onPress={() => onChipPress(entry.word)}
                    style={styles.categoryChip}
                  >
                    <Text style={styles.categoryChipText}>{entry.word}</Text>
                  </Pressable>
                ))}
              </View>
            </View>
          ))}
        </View>
      </View>

      {quizCard && (
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Quiz relâmpago</Text>
          <Text style={styles.description}>Qual palavra corresponde a esta definição?</Text>
          <Text style={styles.quizDefinition}>{quizCard.definition}</Text>
          <View style={styles.quizOptions}>
            {quizCard.options.map((option) => {
              const isSelected = option === selectedOption;
              const isCorrect = option === quizCard.answer;
              const optionStyle = [styles.quizOption];

              if (selectedOption) {
                if (isCorrect) {
                  optionStyle.push(styles.quizOptionCorrect);
                } else if (isSelected && !isCorrect) {
                  optionStyle.push(styles.quizOptionIncorrect);
                }
              } else if (isSelected) {
                optionStyle.push(styles.quizOptionSelected);
              }

              return (
                <Pressable
                  key={option}
                  onPress={() => handleSelectOption(option)}
                  disabled={Boolean(selectedOption)}
                  style={optionStyle}
                >
                  <Text style={styles.quizOptionText}>{option}</Text>
                </Pressable>
              );
            })}
          </View>
          {quizFeedback && <Text style={styles.quizFeedback}>{quizFeedback}</Text>}
          <Pressable onPress={handleNextQuiz} style={styles.nextQuizButton}>
            <Text style={styles.nextQuizButtonText}>Nova pergunta</Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
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
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#eee',
    gap: 12
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333'
  },
  description: {
    fontSize: 14,
    color: '#666'
  },
  chipList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12
  },
  favoriteChip: {
    flexBasis: '48%',
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#fff8e1',
    borderWidth: 1,
    borderColor: '#ffe082',
    gap: 4
  },
  favoriteChipTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#5d3b00'
  },
  favoriteChipMeaning: {
    fontSize: 14,
    color: '#6d5430'
  },
  categoryList: {
    gap: 16
  },
  categoryCard: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    padding: 12,
    gap: 8
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d4b7c'
  },
  categoryChip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: '#e8f0ff'
  },
  categoryChipText: {
    fontSize: 14,
    color: '#2d4b7c'
  },
  quizDefinition: {
    fontSize: 16,
    color: '#333'
  },
  quizOptions: {
    gap: 10
  },
  quizOption: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f9f9f9'
  },
  quizOptionSelected: {
    borderColor: '#4a90e2'
  },
  quizOptionCorrect: {
    borderColor: '#2e7d32',
    backgroundColor: '#e8f5e9'
  },
  quizOptionIncorrect: {
    borderColor: '#c62828',
    backgroundColor: '#ffebee'
  },
  quizOptionText: {
    fontSize: 16,
    color: '#333'
  },
  quizFeedback: {
    fontSize: 14,
    color: '#2e7d32'
  },
  nextQuizButton: {
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 999,
    backgroundColor: '#222'
  },
  nextQuizButtonText: {
    color: '#fff',
    fontWeight: '600'
  }
});

export default StudyScreen;
