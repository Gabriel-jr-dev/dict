import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export const AboutScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Sobre o Mini Dicionário</Text>
      <Text style={styles.paragraph}>
        Este aplicativo foi pensado para estudantes brasileiros que estão dando os
        primeiros passos no inglês. Pesquise palavras, veja exemplos em frases e
        organize uma lista personalizada de favoritos para revisar sempre que quiser.
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Como aproveitar melhor</Text>
        <Text style={styles.paragraph}>• Busque palavras novas todos os dias.</Text>
        <Text style={styles.paragraph}>• Use o quiz relâmpago para testar sua memória.</Text>
        <Text style={styles.paragraph}>• Revise os favoritos antes de provas e apresentações.</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Próximos passos</Text>
        <Text style={styles.paragraph}>
          Estamos trabalhando em novas coleções temáticas, exercícios de áudio e desafios
          semanais. Envie sugestões de palavras ou funcionalidades para ajudar outros
          estudantes!
        </Text>
      </View>
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
  paragraph: {
    fontSize: 16,
    color: '#444',
    lineHeight: 24
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
    padding: 16,
    gap: 8
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222'
  }
});
