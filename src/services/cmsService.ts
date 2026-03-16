import { CMSData } from '../types';

const STORAGE_KEY = 'asbi_cms_data';

const initialData: CMSData = {
  companies: [
    {
      id: '1',
      name: 'Compagnie Danse Élite',
      choreographer: 'Jean Dupont',
      pieceTitle: 'Éveil Urbain',
      description: 'Une exploration des mouvements urbains dans un contexte contemporain.',
      bio: 'Fondée en 2010, cette compagnie repousse les limites du hip-hop.',
      mainImage: 'https://picsum.photos/seed/dance1/800/600',
      gallery: ['https://picsum.photos/seed/dance2/800/600', 'https://picsum.photos/seed/dance3/800/600'],
      performanceDate: '2026-08-14',
      performanceTime: '18:00'
    }
  ],
  participants: [
    {
      id: '1',
      name: 'B-BOY RYU',
      country: 'Japon',
      countryCode: 'jp',
      specialty: 'Power Moves',
      bio: 'Champion du monde 2024, connu pour sa vitesse incroyable.',
      photo: 'https://picsum.photos/seed/ryu/400/600',
      socialLinks: { instagram: '@bboyryu' },
      category: 'dancer'
    }
  ],
  program: [
    {
      id: '1',
      date: '2026-08-14',
      label: 'JOUR 01',
      activities: [
        {
          id: '11',
          time: '10:00 - 16:00',
          title: 'Masterclasses Internationales',
          location: 'Studio A',
          description: 'Apprentissage technique avec les légendes.',
          category: 'Workshop'
        }
      ]
    }
  ],
  categories: ['Competition', 'Workshop', 'Show', 'Talk', 'Social'],
  blog: {
    articles: [
      {
        id: '1',
        title: 'LANCEMENT OFFICIEL DU TOGO 2026',
        content: 'Découvrez les coulisses de la préparation de l\'événement le plus attendu de l\'année à Lomé.',
        category: 'OFFICIEL',
        coverImage: 'https://picsum.photos/seed/news1/800/450',
        date: '12 Janvier 2026',
        tag: 'EVENT'
      },
      {
        id: '2',
        title: 'LINEUP DES ARTISTES DÉVOILÉ',
        content: 'Les plus grands noms de la scène Hip-Hop internationale confirment leur présence pour le festival.',
        category: 'TALENTS',
        coverImage: 'https://picsum.photos/seed/news2/800/450',
        date: '05 Février 2026',
        tag: 'TALENTS'
      },
      {
        id: '3',
        title: 'DISPONIBILITÉ DES TICKETS',
        content: 'La billetterie en ligne est désormais ouverte. Réservez vos pass Early Bird avant épuisement.',
        category: 'BILLETTERIE',
        coverImage: 'https://picsum.photos/seed/news3/800/450',
        date: '20 Mars 2026',
        tag: 'BILLETTERIE'
      }
    ]
  },
  competition: {
    rules: 'Le jugement est basé sur la technique, l\'originalité et la musicalité.',
    prizePool: [
      { category: '1vs1 Breaking', prize: '5000 €' },
      { category: '2vs2 Hip-Hop', prize: '3000 €' }
    ],
    brackets: {
      pouleA: {
        huitiemes: [
          { id: 'm1', player1: 'VICTOR', player2: 'TBD', score1: '--', score2: '--', country1: 'USA', country2: '--', countryCode1: 'us', countryCode2: 'un' }
        ],
        quarts: [],
        semis: []
      },
      pouleB: {
        huitiemes: [],
        quarts: [],
        semis: []
      },
      final: { id: 'final', player1: 'TBD', player2: 'TBD', score1: '--', score2: '--', country1: '--', country2: '--', countryCode1: 'un', countryCode2: 'un' }
    }
  },
  ticketing: {
    tickets: [
      { 
        id: '1', 
        name: 'Pass Journée', 
        price: '5 000', 
        period: 'CFA', 
        tag: 'Accès Standard', 
        features: ['Accès à toutes les masterclasses', 'Place en tribune standard', 'Accès au village ASBI'], 
        buttonText: 'Réserver mon pass',
        color: 'primary',
        recommended: false,
        paymentLink: '#' 
      },
      { 
        id: '2', 
        name: 'Pass Premium', 
        price: '15 000', 
        period: 'CFA', 
        tag: 'Expérience Totale', 
        features: ['Accès VIP Front-Row', 'Cocktail de bienvenue', 'Rencontre avec les juges', 'Goodies pack inclus'], 
        buttonText: 'Devenir VIP',
        color: 'accent-red',
        recommended: true,
        paymentLink: '#' 
      }
    ],
    faqs: [
      { id: '1', question: 'Où se déroule l\'événement ?', answer: 'Au Palais des Congrès de Lomé.' }
    ]
  },
  history: {
    timeline: [
      { id: '1', year: '2024', title: 'L\'Éveil de Lomé', champion: 'B-BOY RYU', description: 'Une édition mémorable au Japon.', image: 'https://picsum.photos/seed/hist1/800/600' }
    ],
    legends: [
      { id: '1', name: 'Storm', bio: 'Légende du breaking européen.', photo: 'https://picsum.photos/seed/legend1/400/600' }
    ]
  },
  partners: {
    logos: [
      { id: '1', name: 'Sponsor 1', logo: 'https://picsum.photos/seed/logo1/200/200', category: 'Main', tier: 'Partenaire Officiel' }
    ],
    sponsoringPdfUrl: '#'
  },
  media: [],
  globalConfig: {
    contact: {
      email: 'contact@asbi.com',
      phone: '+228 90 00 00 00',
      address: 'Lomé, Togo'
    },
    socials: {
      instagram: '#',
      facebook: '#',
      twitter: '#',
      youtube: '#'
    },
    seo: {
      title: 'All Stars Battle International 2026',
      description: 'La plus grande compétition de danse urbaine en Afrique.',
      keywords: 'danse, battle, hip-hop, breaking, togo, lomé'
    },
    hero: {
      title: 'ALL STARS BATTLE INTERNATIONAL',
      subtitle: 'Le Trône. Le Respect. La Légende.',
      location: 'TOGO 2026',
      backgroundImage: 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&q=80&w=1920',
      videoUrl: 'https://vjs.zencdn.net/v/oceans.mp4'
    },
    competition: {
      dateStart: '14 - 16 AOÛT 2026',
      location: 'PALAIS DES CONGRÈS DE LOMÉ, TOGO',
      description: 'L\'élite mondiale du breaking et du hip-hop se réunit sur les terres du Togo pour la plus grande battle d\'Afrique. 3 jours de compétition intense, de workshops et de culture urbaine. Le vainqueur n\'emporte pas seulement le titre, il entre dans l\'histoire.'
    },
    dancers: {
      sectionTitle: 'LES DANSEURS',
      sectionSubtitle: 'Featured'
    },
    programmation: {
      sectionTitle: 'PROGRAMMATION'
    },
    vip: {
      sectionTitle: 'EXPÉRIENCE VIP',
      sectionDescription: 'Plongez au cœur de l\'action avec un accès privilégié. Vivez le All Stars Battle International dans les meilleures conditions possibles.'
    },
    stats: [
      { label: 'Danseurs Qualifiés', value: '16' },
      { label: 'Nations Représentées', value: '12' },
      { label: 'Juges Internationaux', value: '8' }
    ],
    partners: {
      sectionTitle: 'PARTENAIRES & SPONSORS'
    },
    blog: {
      sectionTitle: 'ACTUALITÉS & NEWS'
    },
    footer: {
      description: 'L\'événement de breakdance ultime qui définit le trône de la culture urbaine en Afrique. Vivez l\'excellence du mouvement, du rythme et de la compétition internationale au cœur du Togo.',
      copyright: '© 2026 ALL STARS BATTLE INTERNATIONAL. TOUS DROITS RÉSERVÉS.'
    },
    homepageStats: [
      { label: 'Danseurs Qualifiés', value: '16' },
      { label: 'Nations Représentées', value: '12' },
      { label: 'Juges Internationaux', value: '8' }
    ],
    eventDate: '2026-03-20T00:00:00'
  }
};

export const cmsService = {
  getData: (): CMSData => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      try {
        const parsed = JSON.parse(data);
        // Merge with initialData to ensure all properties exist
        return {
          ...initialData,
          ...parsed,
          globalConfig: {
            ...initialData.globalConfig,
            ...parsed.globalConfig
          }
        };
      } catch (e) {
        console.error('Failed to parse CMS data', e);
        return initialData;
      }
    }
    return initialData;
  },

  saveData: (data: CMSData) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  },

  resetData: () => {
    localStorage.removeItem(STORAGE_KEY);
    window.location.reload();
  }
};
