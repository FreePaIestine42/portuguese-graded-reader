window.SITE_DATA = {
  siteName: 'Portuguese Stories',
  tagline: 'Read. Understand. Practise natural European Portuguese.',
  homeHeroImage: 'https://images.unsplash.com/photo-1735815813700-09c379f5261d?auto=format&fit=crop&fm=jpg&q=92&w=1800',
  levelBlurbs: {
    A2: 'You can understand common words and expressions about everyday topics such as family, shopping, local places and work. You can read short, simple texts and find useful information in things like notices, menus, advertisements, schedules and brief personal messages. You can also handle routine conversations and describe your background, surroundings and immediate needs in simple terms.',
    B1: 'You can understand the main points of clear language about familiar topics such as work, school, leisure and travel. You can read texts written mainly in common everyday or work-related language and follow descriptions of events, feelings and wishes. You can manage most situations while travelling, describe experiences, dreams and plans, and briefly explain your opinions.',
    B2: 'You can understand the main ideas of more complex texts on both concrete and abstract topics. You can read articles and reports about current issues, understand different viewpoints and follow contemporary fiction with reasonable independence. You can communicate fairly fluently and spontaneously, discuss a wide range of subjects in detail and explain or defend your opinions.'
  },
  categories: [
    { id: 'everyday', name: 'Everyday & Casual', icon: '☕' },
    { id: 'formal', name: 'Formal & Professional', icon: '✉️' },
    { id: 'news', name: 'News', icon: '📰' }
  ],
  levels: [
    { id: 'A2', name: 'A2', label: 'Elementary', color: '#397757', softColor: '#DFEBE4' },
    { id: 'B1', name: 'B1', label: 'Intermediate', color: '#D45257', softColor: '#F7DEDF' },
    { id: 'B2', name: 'B2', label: 'Upper Intermediate', color: '#DED153', softColor: '#F7F1C7' }
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