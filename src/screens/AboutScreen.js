import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { studyIdeaGroups } from '../data/ideas';

export const AboutScreen = () => {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.container}>
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

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Mais ideias para praticar</Text>
        <Text style={styles.paragraph}>
          Use as sugestões abaixo como ponto de partida para variar seu estudo e manter a
          motivação. Escolha um bloco por semana e adapte para a sua realidade.
        </Text>
        <View style={styles.ideaList}>
          {studyIdeaGroups.map((group) => (
            <View key={group.title} style={styles.ideaGroup}>
              <Text style={styles.ideaTitle}>{group.title}</Text>
              <Text style={styles.ideaDescription}>{group.description}</Text>
              {group.ideas.map((idea) => (
                <View key={idea} style={styles.ideaItem}>
                  <View style={styles.ideaBullet} />
                  <Text style={styles.ideaText}>{idea}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>
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
    paddingTop: 12,
    paddingBottom: 48,
    gap: 20
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#1E1B4B'
  },
  paragraph: {
    fontSize: 16,
    color: '#475569',
    lineHeight: 24
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.25)',
    padding: 22,
    gap: 10,
    shadowColor: '#0F172A',
    shadowOpacity: 0.05,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E1B4B'
  },
  ideaList: {
    gap: 16
  },
  ideaGroup: {
    gap: 6
  },
  ideaTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B'
  },
  ideaDescription: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 20
  },
  ideaItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8
  },
  ideaBullet: {
    width: 6,
    height: 6,
    marginTop: 8,
    borderRadius: 999,
    backgroundColor: '#4C6EF5'
  },
  ideaText: {
    flex: 1,
    fontSize: 14,
    color: '#475569',
    lineHeight: 20
  }
});
