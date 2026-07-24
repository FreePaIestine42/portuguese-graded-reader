window.SITE_DATA = {
  siteName: 'Portuguese Stories',
  tagline: 'Read. Understand. Practice natural European Portuguese.',
  homeHeroImage: 'https://images.unsplash.com/photo-1735815813700-09c379f5261d?auto=format&fit=crop&fm=jpg&q=92&w=1800',
  levelBlurbs: {
    A2: 'You can understand straightforward texts about daily life, familiar routines, and practical situations.',
    B1: 'You can read connected texts about everyday situations, opinions, and experiences with growing independence.',
    B2: 'You can read more detailed and nuanced texts, including news and more abstract ideas, with solid comprehension.'
  },
  categories: [
    { id: 'everyday', name: 'Everyday Portuguese', icon: '☕' },
    { id: 'formal', name: 'Formal & Professional', icon: '✉️' },
    { id: 'news', name: 'News', icon: '📰' }
  ],
  levels: [
    { id: 'A2', name: 'A2', label: 'Elementary', color: '#7a2e32', softColor: '#f4d6d8' },
    { id: 'B1', name: 'B1', label: 'Intermediate', color: '#0d5e56', softColor: '#d9efec' },
    { id: 'B2', name: 'B2', label: 'Upper Intermediate', color: '#c07b2d', softColor: '#f8ead6' }
  ],
  storyLengthFilters: [
    { id: 'all', label: 'All lengths' },
    { id: 'short', label: 'Short (0–700 words)' },
    { id: 'medium', label: 'Medium (701–1200 words)' },
    { id: 'long', label: 'Long (1201+ words)' }
  ],
  stories: [
    {
      id: 'a2-mercado-bairro',
      title: 'No Mercado do Bairro',
      level: 'A2',
      category: 'everyday',
      wordCount: 620,
      totalTime: '18 min',
      status: 'Not started',
      image: 'https://images.pexels.com/photos/6148830/pexels-photo-6148830.jpeg?auto=compress&cs=tinysrgb&w=1800',
      imageAlt: 'Fruit displayed in baskets at a market.',
      summary: 'A simple everyday story about shopping for fruit at a local market.',
      instructions: 'First read the story, then complete the exercises.',
      paragraphs: [
        'Example placeholder text. This page is still part of the structural foundation only.',
        'The real story, clickable vocabulary, and interactive questions will be added in the next stage.'
      ]
    },
    {
      id: 'a2-rotina-manha',
      title: 'Uma Manhã Normal',
      level: 'A2',
      category: 'everyday',
      wordCount: 540,
      totalTime: '16 min',
      status: 'Not started',
      image: 'https://images.pexels.com/photos/6148830/pexels-photo-6148830.jpeg?auto=compress&cs=tinysrgb&w=1800',
      imageAlt: 'Fruit displayed in baskets at a market.',
      summary: 'Placeholder story card used to test the grid layout.',
      instructions: 'First read the story, then complete the exercises.',
      paragraphs: ['Placeholder content.']
    },
    {
      id: 'b1-email-trabalho',
      title: 'Um Email Importante',
      level: 'B1',
      category: 'formal',
      wordCount: 920,
      totalTime: '24 min',
      status: 'Started',
      image: 'https://images.pexels.com/photos/6148830/pexels-photo-6148830.jpeg?auto=compress&cs=tinysrgb&w=1800',
      imageAlt: 'Fruit displayed in baskets at a market.',
      summary: 'Placeholder formal-reading card.',
      instructions: 'Leia primeiro o texto e depois faça os exercícios.',
      paragraphs: ['Placeholder content.']
    },
    {
      id: 'b2-noticia-cidade',
      title: 'Mudanças na Cidade',
      level: 'B2',
      category: 'news',
      wordCount: 1340,
      totalTime: '31 min',
      status: 'Completed',
      image: 'https://images.pexels.com/photos/6148830/pexels-photo-6148830.jpeg?auto=compress&cs=tinysrgb&w=1800',
      imageAlt: 'Fruit displayed in baskets at a market.',
      summary: 'Placeholder news card.',
      instructions: 'Leia primeiro o texto e depois faça os exercícios.',
      paragraphs: ['Placeholder content.']
    }
  ]
};
