import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { studyIdeaGroups } from '../data/ideas';

export const AboutScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.heroCard}>
        <Text style={styles.title}>Sobre o Mini Dicionário</Text>
        <Text style={styles.paragraph}>
          Este aplicativo foi pensado para estudantes brasileiros que estão começando no inglês.
          Pesquise palavras, veja exemplos em frases e organize uma lista personalizada de
          favoritos para revisar sempre que quiser.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Como aproveitar melhor</Text>
        <Text style={styles.paragraph}>• Busque palavras novas todos os dias.</Text>
        <Text style={styles.paragraph}>• Use o quiz relâmpago para testar sua memória.</Text>
        <Text style={styles.paragraph}>• Revise os favoritos antes de provas e apresentações.</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Próximos passos</Text>
        <Text style={styles.paragraph}>
          Estamos trabalhando em novas coleções temáticas, exercícios de áudio e desafios semanais.
          Envie sugestões de palavras ou funcionalidades para ajudar outros estudantes!
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Mais ideias para praticar</Text>
        <Text style={styles.paragraph}>
          Use as sugestões abaixo como ponto de partida para variar seu estudo e manter a motivação.
          Escolha um bloco por semana e adapte para a sua realidade.
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
    backgroundColor: '#eef2ff',
    borderRadius: 18,
    padding: 24,
    borderWidth: 1,
    borderColor: '#c7d2fe',
    gap: 12,
    ...surfaceShadow
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1e1b4b'
  },
  paragraph: {
    fontSize: 15,
    color: '#475569',
    lineHeight: 24
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    gap: 10,
    ...surfaceShadow
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a'
  },
  ideaList: {
    gap: 16
  },
  ideaGroup: {
    gap: 8
  },
  ideaTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#312e81'
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
    backgroundColor: '#4338ca'
  },
  ideaText: {
    flex: 1,
    fontSize: 14,
    color: '#1f2937',
    lineHeight: 20
  }
});
