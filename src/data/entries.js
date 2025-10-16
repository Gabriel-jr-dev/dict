export const dictionaryEntries = [
  {
    word: 'hello',
    meaning: 'um cumprimento amigável',
    example: 'Say hello to your classmates when you arrive.',
    category: 'expressões',
    image:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80'
  },
  {
    word: 'world',
    meaning: 'o planeta que habitamos',
    example: 'The world is full of different cultures.',
    category: 'natureza',
    image:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80'
  },
  {
    word: 'react',
    meaning: 'biblioteca para construir interfaces',
    example: 'We use React to build interactive screens.',
    category: 'tecnologia',
    image:
      'https://images.unsplash.com/photo-1517433456452-f9633a875f6f?auto=format&fit=crop&w=800&q=80'
  },
  {
    word: 'expo',
    meaning: 'ferramentas para apps React Native',
    example: 'Expo facilita testar o aplicativo no celular.',
    category: 'tecnologia',
    image:
      'https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=800&q=80'
  },
  {
    word: 'dictionary',
    meaning: 'coleção de palavras e significados',
    example: 'Keep a pocket dictionary with you to learn new words.',
    category: 'estudo',
    image:
      'https://images.unsplash.com/photo-1473181488821-2d23949a045a?auto=format&fit=crop&w=800&q=80'
  },
  {
    word: 'student',
    meaning: 'pessoa que estuda ou está em processo de aprendizagem',
    example: 'The student reviewed the lesson after class.',
    category: 'pessoas',
    image:
      'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=800&q=80'
  },
  {
    word: 'teacher',
    meaning: 'profissional responsável por orientar e ensinar alunos',
    example: 'The teacher explained the activity step by step.',
    category: 'pessoas',
    image:
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80'
  },
  {
    word: 'learn',
    meaning: 'adquirir conhecimento ou habilidade nova',
    example: 'You can learn English by practicing every day.',
    category: 'estudo',
    image:
      'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=800&q=80'
  },
  {
    word: 'practice',
    meaning: 'repetir uma atividade para ganhar confiança e domínio',
    example: 'Practice your pronunciation in front of a mirror.',
    category: 'estudo',
    image:
      'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80'
  },
  {
    word: 'homework',
    meaning: 'tarefas escolares para realizar fora da sala de aula',
    example: 'Finish your homework before watching TV.',
    category: 'escola',
    image:
      'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=800&q=80'
  },
  {
    word: 'notebook',
    meaning: 'caderno utilizado para anotar conteúdos ou tarefas',
    example: 'Write new vocabulary in your notebook.',
    category: 'escola',
    image:
      'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80'
  },
  {
    word: 'breakfast',
    meaning: 'a primeira refeição do dia',
    example: 'Have breakfast to start your day with energy.',
    category: 'rotina',
    image:
      'https://images.unsplash.com/photo-1493770348161-369560ae357d?auto=format&fit=crop&w=800&q=80'
  },
  {
    word: 'friendship',
    meaning: 'relação de afeto e confiança entre amigos',
    example: 'Friendship makes school more fun.',
    category: 'pessoas',
    image:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80'
  },
  {
    word: 'focus',
    meaning: 'concentrar atenção em algo específico',
    example: 'Take a deep breath and focus on the task.',
    category: 'estudo',
    image:
      'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80'
  },
  {
    word: 'journey',
    meaning: 'viagem ou caminho percorrido',
    example: 'Learning English is a long but exciting journey.',
    category: 'viagem',
    image:
      'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=800&q=80'
  }
];

export const wordMap = dictionaryEntries.reduce((acc, entry) => {
  acc[entry.word] = entry;
  return acc;
}, {});

export const categories = Array.from(
  new Set(dictionaryEntries.map((entry) => entry.category))
).sort();
