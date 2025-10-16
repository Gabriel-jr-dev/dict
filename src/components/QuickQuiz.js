import React, { useEffect, useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const getRandomOptions = (entries, answerWord) => {
  if (entries.length <= 3) {
    return entries.map((entry) => entry.word);
  }

  const options = new Set([answerWord]);
  while (options.size < 3) {
    const random = entries[Math.floor(Math.random() * entries.length)].word;
    options.add(random);
  }

  return Array.from(options).sort(() => Math.random() - 0.5);
};

export const QuickQuiz = ({ entries, onSelectWord }) => {
  const [feedback, setFeedback] = useState(null);
  const [answer, setAnswer] = useState(() =>
    entries.length > 0 ? entries[Math.floor(Math.random() * entries.length)] : null
  );

  const options = useMemo(() => {
    if (!answer) {
      return [];
    }

    return getRandomOptions(entries, answer.word);
  }, [answer, entries]);

  useEffect(() => {
    if (entries.length === 0) {
      setAnswer(null);
      setFeedback(null);
      return;
    }

    if (!answer || !entries.some((entry) => entry.word === answer.word)) {
      setAnswer(entries[Math.floor(Math.random() * entries.length)]);
      setFeedback(null);
    }
  }, [entries, answer]);

  const handleAnswer = (option) => {
    if (!answer) {
      return;
    }

    const isCorrect = option === answer.word;
    setFeedback(isCorrect ? 'Acertou! Continue praticando.' : 'Ops! Tente novamente.');

    if (isCorrect) {
      onSelectWord(option);
    }
  };

  const handleNext = () => {
    if (entries.length === 0) {
      return;
    }

    setFeedback(null);
    setAnswer(entries[Math.floor(Math.random() * entries.length)]);
  };

  if (!answer) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Quiz relâmpago</Text>
        <Text style={styles.subtitle}>Qual palavra combina com o significado abaixo?</Text>
      </View>
      <Text style={styles.meaning}>{answer.meaning}</Text>
      <View style={styles.options}>
        {options.map((option) => (
          <Pressable
            key={option}
            style={({ pressed }) => [styles.optionButton, pressed && styles.optionButtonPressed]}
            onPress={() => handleAnswer(option)}
          >
            <Text style={styles.optionText}>{option}</Text>
          </Pressable>
        ))}
      </View>
      {feedback && <Text style={styles.feedback}>{feedback}</Text>}
      <Pressable onPress={handleNext} style={styles.secondaryButton}>
        <Text style={styles.secondaryButtonText}>Nova pergunta</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    gap: 14,
    shadowColor: '#0f172a',
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
    marginBottom: 24
  },
  header: {
    gap: 6
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a'
  },
  subtitle: {
    fontSize: 14,
    color: '#475569'
  },
  meaning: {
    fontSize: 16,
    color: '#1e293b',
    lineHeight: 22
  },
  options: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10
  },
  optionButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 999,
    backgroundColor: '#eef2ff'
  },
  optionButtonPressed: {
    backgroundColor: '#c7d2fe'
  },
  optionText: {
    fontSize: 14,
    color: '#312e81'
  },
  feedback: {
    fontSize: 14,
    color: '#16a34a',
    fontWeight: '600'
  },
  secondaryButton: {
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 999,
    backgroundColor: '#4338ca'
  },
  secondaryButtonText: {
    color: '#f8fafc',
    fontWeight: '600'
  }
});
