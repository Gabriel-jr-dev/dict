import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

const AboutScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Sobre o Mini Dicionário</Text>
      <Text style={styles.paragraph}>
        O Mini Dicionário ajuda estudantes brasileiros a praticarem vocabulário
        essencial em inglês. Buscamos significados diretos, exemplos práticos e
        recursos extras para lembrar das palavras com facilidade.
      </Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Como aproveitar melhor:</Text>
        <Text style={styles.paragraph}>• Pesquise palavras do dia a dia.</Text>
        <Text style={styles.paragraph}>• Salve termos favoritos para revisar depois.</Text>
        <Text style={styles.paragraph}>• Explore as categorias para aprender em blocos.</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Próximos passos</Text>
        <Text style={styles.paragraph}>
          Estamos trabalhando em listas temáticas, atividades interativas e
          desafios semanais para transformar o estudo em uma rotina leve e
          divertida.
        </Text>
      </View>
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
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444'
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#eee',
    gap: 8
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333'
  }
});

export default AboutScreen;
