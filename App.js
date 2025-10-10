import React from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import { useState } from 'react';

const words = {
  hello: 'um cumprimento amigável',
  world: 'o planeta que habitamos',
  react: 'biblioteca para construir interfaces',
  expo: 'ferramentas para apps React Native',
  dictionary: 'coleção de palavras e significados'
};

export default function App() {
  const [query, setQuery] = useState('');
  const [activePage, setActivePage] = useState('dictionary');

  const definition = words[query.trim().toLowerCase()];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.navBar}>
        <Pressable
          style={[styles.navButton, activePage === 'dictionary' && styles.navButtonActive]}
          onPress={() => setActivePage('dictionary')}
        >
          <Text
            style={[styles.navButtonText, activePage === 'dictionary' && styles.navButtonTextActive]}
          >
            Dicionário
          </Text>
        </Pressable>
        <Pressable
          style={[styles.navButton, activePage === 'about' && styles.navButtonActive]}
          onPress={() => setActivePage('about')}
        >
          <Text style={[styles.navButtonText, activePage === 'about' && styles.navButtonTextActive]}>
            Sobre
          </Text>
        </Pressable>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        {activePage === 'dictionary' ? (
          <>
            <Text style={styles.title}>Mini Dicionário</Text>
            <Text style={styles.subtitle}>
              Digite uma palavra em inglês para ver a tradução livre.
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Digite aqui..."
              value={query}
              onChangeText={setQuery}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <View style={styles.resultBox}>
              {definition ? (
                <Text style={styles.definition}>{definition}</Text>
              ) : (
                <Text style={styles.placeholder}>Nenhum resultado encontrado.</Text>
              )}
            </View>
          </>
        ) : (
          <View style={styles.aboutContainer}>
            <Text style={styles.title}>Sobre o Mini Dicionário</Text>
            <Text style={styles.aboutText}>
              Este aplicativo foi criado para ajudar estudantes brasileiros a
              praticarem vocabulário em inglês. Digite uma palavra simples e
              veja uma explicação rápida em português.
            </Text>
            <Text style={styles.aboutText}>
              A lista de palavras cresce com o tempo e prioriza termos comuns
              do dia a dia. Se sentir falta de algum termo, compartilhe a ideia
              com a comunidade para incluirmos na próxima atualização!
            </Text>
            <Text style={styles.aboutText}>
              Construído com React Native e Expo, o Mini Dicionário é leve e
              ideal para revisões rápidas no celular ou durante os estudos.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f2f2f2'
  },
  container: {
    flexGrow: 1,
    padding: 24,
    alignItems: 'stretch',
    gap: 16
  },
  navBar: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 12,
    gap: 12,
    backgroundColor: '#f2f2f2'
  },
  navButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: '#e0e0e0',
    alignItems: 'center'
  },
  navButtonActive: {
    backgroundColor: '#222'
  },
  navButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#444'
  },
  navButtonTextActive: {
    color: '#fff'
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
  input: {
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    fontSize: 18
  },
  resultBox: {
    minHeight: 120,
    borderRadius: 12,
    backgroundColor: '#fff',
    padding: 16,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#eee'
  },
  definition: {
    fontSize: 20,
    color: '#333'
  },
  placeholder: {
    fontSize: 16,
    color: '#999'
  },
  aboutContainer: {
    gap: 16
  },
  aboutText: {
    fontSize: 16,
    color: '#444',
    lineHeight: 24
  }
});
