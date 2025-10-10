import React from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native';
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

  const definition = words[query.trim().toLowerCase()];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.container}>
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
  }
});
