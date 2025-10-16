export const dictionaryEntries = [
  {
    word: 'hello',
    meaning: 'um cumprimento amigável',
    example: 'Say hello to your classmates when you arrive.',
    category: 'expressões',
    image:
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Dois colegas se cumprimentando com um toque de mãos na escola.'
  },
  {
    word: 'world',
    meaning: 'o planeta que habitamos',
    example: 'The world is full of different cultures.',
    category: 'natureza',
    image:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Vista do planeta Terra iluminado pelo sol no espaço.'
  },
  {
    word: 'react',
    meaning: 'biblioteca para construir interfaces',
    example: 'We use React to build interactive screens.',
    category: 'tecnologia',
    image:
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Código JavaScript com destaque para componentes React em um monitor.'
  },
  {
    word: 'expo',
    meaning: 'ferramentas para apps React Native',
    example: 'Expo facilita testar o aplicativo no celular.',
    category: 'tecnologia',
    image:
      'https://images.unsplash.com/photo-1558655146-364adaf1fcc9?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Desenvolvedor testando um aplicativo mobile em um smartphone conectado ao notebook.'
  },
  {
    word: 'dictionary',
    meaning: 'coleção de palavras e significados',
    example: 'Keep a pocket dictionary with you to learn new words.',
    category: 'estudo',
    image:
      'https://images.unsplash.com/photo-1473181488821-2d23949a045a?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Dicionário aberto com páginas repletas de definições.'
  },
  {
    word: 'student',
    meaning: 'pessoa que estuda ou está em processo de aprendizagem',
    example: 'The student reviewed the lesson after class.',
    category: 'pessoas',
    image:
      'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Estudante concentrada revisando anotações em uma biblioteca.'
  },
  {
    word: 'teacher',
    meaning: 'profissional responsável por orientar e ensinar alunos',
    example: 'The teacher explained the activity step by step.',
    category: 'pessoas',
    image:
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Professora escrevendo em um quadro enquanto explica a matéria para a turma.'
  },
  {
    word: 'learn',
    meaning: 'adquirir conhecimento ou habilidade nova',
    example: 'You can learn English by practicing every day.',
    category: 'estudo',
    image:
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Pessoa assistindo aula online com caderno de anotações ao lado.'
  },
  {
    word: 'practice',
    meaning: 'repetir uma atividade para ganhar confiança e domínio',
    example: 'Practice your pronunciation in front of a mirror.',
    category: 'estudo',
    image:
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Cantora praticando diante do microfone em uma sala de ensaio.'
  },
  {
    word: 'homework',
    meaning: 'tarefas escolares para realizar fora da sala de aula',
    example: 'Finish your homework before watching TV.',
    category: 'escola',
    image:
      'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Caderno com tarefa de matemática sendo resolvida em casa.'
  },
  {
    word: 'notebook',
    meaning: 'caderno utilizado para anotar conteúdos ou tarefas',
    example: 'Write new vocabulary in your notebook.',
    category: 'escola',
    image:
      'https://images.unsplash.com/photo-1510557880182-3b5aeea59d81?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Caderno aberto com caneta e anotações organizadas.'
  },
  {
    word: 'breakfast',
    meaning: 'a primeira refeição do dia',
    example: 'Have breakfast to start your day with energy.',
    category: 'rotina',
    image:
      'https://images.unsplash.com/photo-1493770348161-369560ae357d?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Mesa de café da manhã com frutas, waffles e café recém servido.'
  },
  {
    word: 'friendship',
    meaning: 'relação de afeto e confiança entre amigos',
    example: 'Friendship makes school more fun.',
    category: 'pessoas',
    image:
      'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Grupo de amigos rindo juntos ao ar livre.'
  },
  {
    word: 'focus',
    meaning: 'concentrar atenção em algo específico',
    example: 'Take a deep breath and focus on the task.',
    category: 'estudo',
    image:
      'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Mulher concentrada estudando com o notebook e anotações.'
  },
  {
    word: 'journey',
    meaning: 'viagem ou caminho percorrido',
    example: 'Learning English is a long but exciting journey.',
    category: 'viagem',
    image:
      'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Estrada sinuosa atravessando montanhas ao pôr do sol.'
  }
];

export const wordMap = dictionaryEntries.reduce((acc, entry) => {
  acc[entry.word] = entry;
  return acc;
}, {});

export const categories = Array.from(
  new Set(dictionaryEntries.map((entry) => entry.category))
).sort();
