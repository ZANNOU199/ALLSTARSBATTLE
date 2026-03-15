
import { useState, useEffect } from 'react';
import { CMSState } from '../types';

const INITIAL_STATE: CMSState = {
  companies: [
    {
      id: '1',
      name: 'Pockemon Crew',
      choreographer: 'Riyad Fghani',
      pieceTitle: 'Silence on tourne',
      description: 'Une pièce qui rend hommage au cinéma.',
      bio: 'Compagnie légendaire de Lyon.',
      mainImage: 'https://picsum.photos/seed/pockemon/800/600',
      gallery: [],
      performanceDate: '2026-08-15',
      performanceTime: '20:00'
    }
  ],
  participants: [
    {
      id: '1',
      name: 'B-Boy Lilou',
      country: 'France',
      specialty: 'Breaking',
      bio: 'Double champion du Red Bull BC One.',
      photo: 'https://picsum.photos/seed/lilou/400/400',
      socials: { instagram: '@lilou_officiel' },
      category: 'Judge'
    }
  ],
  program: [
    {
      id: '1',
      time: '10:00',
      title: 'Workshop Breaking',
      location: 'Studio A',
      description: 'Cours intensif avec Lilou.',
      category: 'Workshop',
      day: 1
    }
  ],
  articles: [
    {
      id: '1',
      title: 'Lancement de l\'édition 2026',
      content: 'Le plus grand événement de danse urbaine revient au Togo...',
      category: 'News',
      coverImage: 'https://picsum.photos/seed/news1/800/400',
      date: '2026-03-15'
    }
  ],
  brackets: [],
  tickets: [
    {
      id: '1',
      name: 'Pass Standard',
      price: '5000 FCFA',
      benefits: ['Accès 2 jours', 'Placement libre'],
      paymentLink: '#'
    }
  ],
  faq: [
    {
      id: '1',
      question: 'Où se déroule l\'événement ?',
      answer: 'Au Palais des Congrès de Lomé.'
    }
  ],
  timeline: [
    {
      id: '1',
      year: '2024',
      champion: 'B-Boy Dany Dann',
      description: 'Une finale mémorable.',
      image: 'https://picsum.photos/seed/hist1/400/300'
    }
  ],
  legends: [
    {
      id: '1',
      name: 'Storm',
      description: 'Pionnier du breaking européen.',
      photo: 'https://picsum.photos/seed/storm/400/400'
    }
  ],
  partners: [
    {
      id: '1',
      name: 'Institut Français',
      logo: 'https://picsum.photos/seed/if/200/100',
      category: 'Institutional'
    }
  ],
  config: {
    contact: {
      email: 'contact@asbi-togo.com',
      phone: '+228 90 00 00 00',
      address: 'Lomé, Togo',
      socials: {
        instagram: 'https://instagram.com/asbi_togo',
        facebook: 'https://facebook.com/asbi_togo',
        youtube: 'https://youtube.com/asbi_togo'
      }
    },
    seo: {
      title: 'ASBI 2026 | All Stars Battle International',
      description: 'Le plus grand événement de culture urbaine en Afrique.',
      keywords: 'dance, battle, breaking, togo, africa'
    },
    hero: {
      title: 'ALL STARS BATTLE INTERNATIONAL',
      subtitle: 'LOMÉ, TOGO | AOÛT 2026',
      backgroundImage: 'https://picsum.photos/seed/hero/1920/1080'
    },
    stats: {
      spectators: '5000+',
      countries: '15+',
      prizes: '10M FCFA'
    },
    sponsoringPdfUrl: '#',
    competitionRules: 'Règlement officiel de la compétition...',
    judgingCriteria: 'Critères de jugement basés sur la technique, l\'originalité...',
    prizePool: [
      { category: 'Breaking 1vs1', amount: '2.000.000 FCFA' }
    ]
  }
};

export function useCMSStore() {
  const [state, setState] = useState<CMSState>(() => {
    const saved = localStorage.getItem('asbi_cms_state');
    return saved ? JSON.parse(saved) : INITIAL_STATE;
  });

  useEffect(() => {
    localStorage.setItem('asbi_cms_state', JSON.stringify(state));
  }, [state]);

  const updateState = (updater: (prev: CMSState) => CMSState) => {
    setState(prev => updater(prev));
  };

  return { state, updateState };
}
