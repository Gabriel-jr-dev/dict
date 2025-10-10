export const dictionaryEntries = [
  {
    word: 'hello',
    meaning: 'um cumprimento amigável',
    example: 'Say hello to your classmates when you arrive.',
    category: 'expressões'
  },
  {
    word: 'world',
    meaning: 'o planeta que habitamos',
    example: 'The world is full of different cultures.',
    category: 'natureza'
  },
  {
    word: 'react',
    meaning: 'biblioteca para construir interfaces',
    example: 'We use React to build interactive screens.',
    category: 'tecnologia'
  },
  {
    word: 'expo',
    meaning: 'ferramentas para apps React Native',
    example: 'Expo facilita testar o aplicativo no celular.',
    category: 'tecnologia'
  },
  {
    word: 'dictionary',
    meaning: 'coleção de palavras e significados',
    example: 'Keep a pocket dictionary with you to learn new words.',
    category: 'estudo'
  },
  {
    word: 'student',
    meaning: 'pessoa que estuda ou está em processo de aprendizagem',
    example: 'The student reviewed the lesson after class.',
    category: 'pessoas'
  },
  {
    word: 'teacher',
    meaning: 'profissional responsável por orientar e ensinar alunos',
    example: 'The teacher explained the activity step by step.',
    category: 'pessoas'
  },
  {
    word: 'learn',
    meaning: 'adquirir conhecimento ou habilidade nova',
    example: 'You can learn English by practicing every day.',
    category: 'estudo'
  },
  {
    word: 'practice',
    meaning: 'repetir uma atividade para ganhar confiança e domínio',
    example: 'Practice your pronunciation in front of a mirror.',
    category: 'estudo'
  },
  {
    word: 'homework',
    meaning: 'tarefas escolares para realizar fora da sala de aula',
    example: 'Finish your homework before watching TV.',
    category: 'escola'
  },
  {
    word: 'notebook',
    meaning: 'caderno utilizado para anotar conteúdos ou tarefas',
    example: 'Write new vocabulary in your notebook.',
    category: 'escola'
  },
  {
    word: 'breakfast',
    meaning: 'a primeira refeição do dia',
    example: 'Have breakfast to start your day with energy.',
    category: 'rotina'
  },
  {
    word: 'friendship',
    meaning: 'relação de afeto e confiança entre amigos',
    example: 'Friendship makes school more fun.',
    category: 'pessoas'
  },
  {
    word: 'focus',
    meaning: 'concentrar atenção em algo específico',
    example: 'Take a deep breath and focus on the task.',
    category: 'estudo'
  },
  {
    word: 'journey',
    meaning: 'viagem ou caminho percorrido',
    example: 'Learning English is a long but exciting journey.',
    category: 'viagem'
  }
];

export const wordMap = dictionaryEntries.reduce((acc, entry) => {
  acc[entry.word] = entry;
  return acc;
}, {});

export const categories = Array.from(
  new Set(dictionaryEntries.map((entry) => entry.category))
).sort();
