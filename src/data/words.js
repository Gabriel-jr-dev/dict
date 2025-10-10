export const dictionary = [
  {
    word: 'hello',
    meaning: 'um cumprimento amigável usado ao encontrar alguém',
    category: 'Saudações',
    example: 'Hello! Nice to meet you.'
  },
  {
    word: 'goodbye',
    meaning: 'expressão utilizada ao se despedir',
    category: 'Saudações',
    example: 'Goodbye! See you tomorrow.'
  },
  {
    word: 'please',
    meaning: 'palavra educada para fazer um pedido',
    category: 'Cortesia',
    example: 'Please, pass me the notebook.'
  },
  {
    word: 'thank you',
    meaning: 'forma educada de mostrar gratidão',
    category: 'Cortesia',
    example: 'Thank you for your help!'
  },
  {
    word: 'teacher',
    meaning: 'profissional responsável por orientar estudantes',
    category: 'Escola',
    example: 'The teacher explained the exercise very well.'
  },
  {
    word: 'student',
    meaning: 'pessoa que estuda em uma escola ou curso',
    category: 'Escola',
    example: 'The student finished the homework early.'
  },
  {
    word: 'homework',
    meaning: 'tarefas escolares para fazer em casa',
    category: 'Escola',
    example: 'I will do my homework after dinner.'
  },
  {
    word: 'learn',
    meaning: 'adquirir conhecimento ou habilidade nova',
    category: 'Estudos',
    example: 'We can learn new words every day.'
  },
  {
    word: 'practice',
    meaning: 'repetir uma atividade para ganhar confiança e domínio',
    category: 'Estudos',
    example: 'Practice the verbs to speak faster.'
  },
  {
    word: 'breakfast',
    meaning: 'primeira refeição do dia',
    category: 'Rotina',
    example: 'She eats fruit for breakfast.'
  },
  {
    word: 'lunch',
    meaning: 'refeição realizada no meio do dia',
    category: 'Rotina',
    example: 'Let\'s have lunch at noon.'
  },
  {
    word: 'dinner',
    meaning: 'refeição realizada à noite',
    category: 'Rotina',
    example: 'We cook dinner together on Fridays.'
  },
  {
    word: 'water',
    meaning: 'líquido essencial para a vida',
    category: 'Natureza',
    example: 'Drink water every day.'
  },
  {
    word: 'sun',
    meaning: 'estrela que ilumina a Terra',
    category: 'Natureza',
    example: 'The sun is very bright today.'
  },
  {
    word: 'computer',
    meaning: 'máquina usada para acessar informações digitais',
    category: 'Tecnologia',
    example: 'The computer is on the desk.'
  },
  {
    word: 'keyboard',
    meaning: 'dispositivo com teclas para digitar',
    category: 'Tecnologia',
    example: 'Use the keyboard to type your password.'
  },
  {
    word: 'music',
    meaning: 'arte de combinar sons de forma agradável',
    category: 'Arte',
    example: 'They listen to music while studying.'
  },
  {
    word: 'friend',
    meaning: 'pessoa com quem se tem uma relação de afeto',
    category: 'Relacionamentos',
    example: 'My friend helps me with English.'
  },
  {
    word: 'family',
    meaning: 'grupo de pessoas relacionadas por laços afetivos ou sanguíneos',
    category: 'Relacionamentos',
    example: 'My family lives in Brazil.'
  },
  {
    word: 'travel',
    meaning: 'ação de ir para outro lugar',
    category: 'Viagem',
    example: 'We want to travel on vacation.'
  }
];

export const dictionaryIndex = dictionary.reduce((accumulator, entry) => {
  accumulator[entry.word] = entry;
  return accumulator;
}, {});

export const categories = dictionary.reduce((accumulator, entry) => {
  if (!accumulator[entry.category]) {
    accumulator[entry.category] = [];
  }

  accumulator[entry.category].push(entry);

  return accumulator;
}, {});
