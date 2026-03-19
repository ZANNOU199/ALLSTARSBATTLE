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
  featuredPiece: {
    id: '1',
    title: "L'ÉVEIL DES OMBRES",
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFFVjlS0aV2aTZ_NOUWSPOLFwvZDL53_dHLHupDNuVMhBZlkX7CnONhZG-SOJnA70FigEjAj6fHlw1dX_QNjvlouaXTV7FpZAXArqfjERLDvl6Cy48tFNGGL6rFGW1y4K1v_8gLWpXw9U-t6RhMPGVxdPc9kfXz5lgGmOZsIdsyqxJ8XtocNNGz91LRaDnMusjC2cud0R5XhBaE_0Ifh_vQJNugwvgwOBYr3hxh492ZauvzD8RKjUl3QeOwy71EzcXE5PeEQ3CspOm',
    duration: '45 MIN',
    choreographer: 'K. AFRIKA',
    music: 'LIVE DJ SET',
    description: 'Une exploration viscérale du lien entre le corps et son environnement numérique. Cette pièce fusionne le breakdance académique avec des projections interactives en temps réel, créant une illusion de mouvement où l\'ombre devient l\'acteur principal.',
    fullSynopsis: '"L\'Éveil des Ombres" est une œuvre chorégraphique révolutionnaire qui explore la dualité entre l\'existence physique et l\'identité numérique. Dans ce monde contemporain où la projection surpasse souvent la réalité, cette création reimagine ce que signifie vraiment être présent. Le corps devient le médium d\'une conversation silencieuse entre l\'ombre et la lumière, entre le connu et l\'invisible. Chaque mouvement raconte une histoire de transformation, de renaissance, et de l\'acceptation de nos multiples identités dans la ère digitale.',
    intentionQuote: 'Je voulais créer un espace où la technologie ne se contente pas d\'illustrer la danse, mais devient un partenaire de jeu imprévisible. L\'ombre n\'est plus une absence de lumière, mais une présence numérique qui nous force à redéfinir notre propre réalité physique.',
    intentionAuthor: 'K. Afrika, Chorégraphe',
    performers: '8 B-Boys & B-Girls',
    technology: 'Motion Capture Live'
  },
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
          { id: 'm1', player1: 'VICTOR', player2: 'TBD', score1: '--', score2: '--', country1: 'USA', country2: '--', countryCode1: 'us', countryCode2: 'un' },
          { id: 'm2', player1: 'PHIL WIZARD', player2: 'TBD', score1: '--', score2: '--', country1: 'CAN', country2: '--', countryCode1: 'ca', countryCode2: 'un' },
          { id: 'm3', player1: 'DANY DANN', player2: 'TBD', score1: '--', score2: '--', country1: 'FRA', country2: '--', countryCode1: 'fr', countryCode2: 'un' },
          { id: 'm4', player1: 'SHIGEKIX', player2: 'TBD', score1: '--', score2: '--', country1: 'JPN', country2: '--', countryCode1: 'jp', countryCode2: 'un' }
        ],
        quarts: [
          { id: 'qa1', player1: 'TBD', player2: 'TBD', score1: '--', score2: '--', country1: '--', country2: '--', countryCode1: 'un', countryCode2: 'un' },
          { id: 'qa2', player1: 'TBD', player2: 'TBD', score1: '--', score2: '--', country1: '--', country2: '--', countryCode1: 'un', countryCode2: 'un' }
        ],
        semis: [
          { id: 'sa1', player1: 'TBD', player2: 'TBD', score1: '--', score2: '--', country1: '--', country2: '--', countryCode1: 'un', countryCode2: 'un' }
        ]
      },
      pouleB: {
        huitiemes: [
          { id: 'm5', player1: 'LIGEE', player2: 'TBD', score1: '--', score2: '--', country1: 'CHN', country2: '--', countryCode1: 'cn', countryCode2: 'un' },
          { id: 'm6', player1: 'KUZYA', player2: 'TBD', score1: '--', score2: '--', country1: 'UKR', country2: '--', countryCode1: 'ua', countryCode2: 'un' },
          { id: 'm7', player1: 'LEE', player2: 'TBD', score1: '--', score2: '--', country1: 'NLD', country2: '--', countryCode1: 'nl', countryCode2: 'un' },
          { id: 'm8', player1: 'QUAKE', player2: 'TBD', score1: '--', score2: '--', country1: 'TPE', country2: '--', countryCode1: 'tw', countryCode2: 'un' }
        ],
        quarts: [
          { id: 'qb1', player1: 'TBD', player2: 'TBD', score1: '--', score2: '--', country1: '--', country2: '--', countryCode1: 'un', countryCode2: 'un' },
          { id: 'qb2', player1: 'TBD', player2: 'TBD', score1: '--', score2: '--', country1: '--', country2: '--', countryCode1: 'un', countryCode2: 'un' }
        ],
        semis: [
          { id: 'sb1', player1: 'TBD', player2: 'TBD', score1: '--', score2: '--', country1: '--', country2: '--', countryCode1: 'un', countryCode2: 'un' }
        ]
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
  contact: {
    hero: {
      title: 'Besoin ',
      titleHighlight: 'd\'aide ?',
      description: 'L\'équipe All Stars Battle International est là pour vous accompagner. Retrouvez nos réponses ou contactez-nous directement.'
    },
    sections: {
      coordinatesTitle: 'Coordonnées',
      hoursLabel: 'Horaires',
      hoursValue: 'Lun-Ven, 09h00 - 18h00',
      responseTime: 'Réponse sous 24h',
      socialLabel: 'Suivez le mouvement',
      faqTitle: 'Foire Aux Questions'
    }
  },
  partners: {
    logos: [
      { id: '1', name: 'Partenaire Institutionnel 1', logo: 'https://picsum.photos/seed/instit1/200/200', category: 'Institutional' },
      { id: '2', name: 'Partenaire Institutionnel 2', logo: 'https://picsum.photos/seed/instit2/200/200', category: 'Institutional' },
      { id: '3', name: 'Partenaire Institutionnel 3', logo: 'https://picsum.photos/seed/instit3/200/200', category: 'Institutional' },
      { id: '4', name: 'Partenaire Institutionnel 4', logo: 'https://picsum.photos/seed/instit4/200/200', category: 'Institutional' },
      { id: '5', name: 'Sponsor Majeur 1', logo: 'https://picsum.photos/seed/sponsor1/200/200', category: 'Main', tier: 'Sponsor Platine' },
      { id: '6', name: 'Sponsor Majeur 2', logo: 'https://picsum.photos/seed/sponsor2/200/200', category: 'Main', tier: 'Sponsor Or' },
      { id: '7', name: 'Sponsor Majeur 3', logo: 'https://picsum.photos/seed/sponsor3/200/200', category: 'Main', tier: 'Sponsor Argent' },
      { id: '8', name: 'Média Partenaire 1', logo: 'https://picsum.photos/seed/media1/200/200', category: 'Media' },
      { id: '9', name: 'Média Partenaire 2', logo: 'https://picsum.photos/seed/media2/200/200', category: 'Media' }
    ],
    sponsoringPdfUrl: '#',
    cta: {
      title: 'Devenez un Acteur de l\'Histoire',
      subtitle: 'Rejoignez l\'élite de la culture urbaine africaine',
      buttonText: 'Devenir Partenaire'
    }
  },
  media: [
    {
      id: '1',
      year: 2026,
      type: 'photo',
      title: 'Finale ASBI 2026 - Junior vs Flash',
      description: 'Moment épique de la finale avec l\'énergie maximale du public',
      url: 'https://picsum.photos/seed/asbi26_1/800/600',
      tag: 'archive',
      thumbnail: ''
    },
    {
      id: '2',
      year: 2026,
      type: 'photo',
      title: 'Demi-finale Poule A',
      description: 'Action intense lors de la demi-finale de la poule A',
      url: 'https://picsum.photos/seed/asbi26_2/800/600',
      tag: 'archive',
      thumbnail: ''
    },
    {
      id: '3',
      year: 2026,
      type: 'photo',
      title: 'Huitième de finale - Round 1',
      description: 'Premier round des huitièmes de finale',
      url: 'https://picsum.photos/seed/asbi26_3/800/600',
      tag: 'archive',
      thumbnail: ''
    },
    {
      id: '4',
      year: 2026,
      type: 'video',
      title: 'Grande Finale : Junior vs Flash | Edition 2026',
      description: 'Une bataille épique pour le titre de champion d\'Afrique. Intensité maximum au Palais des Congrès.',
      url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      thumbnail: 'https://picsum.photos/seed/asbi26_video1/800/600',
      duration: '12:45',
      tag: 'Replay'
    },
    {
      id: '5',
      year: 2026,
      type: 'video',
      title: 'Aftermovie Officiel : L\'énergie de Lomé',
      description: 'Plongez dans les coulisses et l\'ambiance électrique de l\'ASBI Togo 2026.',
      url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      thumbnail: 'https://picsum.photos/seed/asbi26_video2/800/600',
      duration: '04:20',
      tag: 'Exclusif'
    },
    {
      id: '6',
      year: 2024,
      type: 'photo',
      title: 'Moments forts ASBI 2024',
      description: 'Archives de la compétition 2024',
      url: 'https://picsum.photos/seed/asbi24_1/800/600',
      tag: 'archive',
      thumbnail: ''
    }
  ],
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
      sectionDescription: 'Plongez au cœur de l\'action avec un accès privilégié. Vivez le All Stars Battle International dans les meilleures conditions possibles.',
      features: [
        {
          icon: 'Verified',
          title: 'Platinum Backstage',
          description: 'Rencontrez les juges et les danseurs dans la zone athlètes.'
        },
        {
          icon: 'GlassWater',
          title: 'Lounge Exclusif',
          description: 'Open bar et buffet gastronomique dans une ambiance premium.'
        }
      ]
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
  },
  theme: {
    primary: '#d35f17',
    accent: '#f4d125',
    accentRed: '#dc2626',
    background: '#0a0807',
    surface: '#1a1a1a',
    text: '#ffffff',
    mutedText: '#94a3b8'
  },
  participate: {
    hero: {
      title: 'Rejoignez l\'expérience',
      titleHighlight: 'All Star Battle International',
      subtitle: 'Participez à l\'événement qui célèbre le Breaking et les danses Hip-Hop en Afrique'
    },
    sections: {
      dancers: {
        title: '🎤 POUR LES DANSEURS',
        description: 'La direction artistique du festival sélectionne et invite des danseurs chaque année. Les danseurs internationaux pouvant prendre en charge leur mobilité peuvent également candidater pour participer au festival.'
      },
      professionals: {
        title: '💼 POUR LES PROFESSIONNELS',
        description: 'Programmateurs, directeurs de compagnies, producteurs : rejoignez un espace d\'échange, de collaboration et de découverte. Le festival développe un réseau de professionnels internationaux autour de la danse Hip-Hop.'
      },
      volunteers: {
        title: '❤️ POUR LES VOLONTAIRES',
        description: 'Vivez le festival de l\'intérieur et contribuez activement à son organisation. Rejoignez notre équipe de bénévoles passionnés et faites partie de l\'aventure !'
      }
    },
    formFields: {
      nameLabel: 'Nom Complet',
      emailLabel: 'Adresse Email',
      phoneLabel: 'Numéro de Téléphone',
      countryLabel: 'Pays',
      messageLabel: 'Message Additionnel'
    },
    successMessage: {
      title: '✨ Inscription Réussie !',
      subtitle: 'Merci de votre intérêt pour l\'All Star Battle International ! Notre équipe vous contactera bientôt pour confirmer votre participation.'
    }
  },
  pageBackgrounds: {
    hero: {
      imageUrl: 'https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&q=80&w=1920',
      videoUrl: 'https://vjs.zencdn.net/v/oceans.mp4',
      width: 1920,
      height: 1080,
      lastModified: new Date().toISOString()
    },
    artisticScene: {
      imageUrl: 'https://picsum.photos/seed/artistic-bg/1920/1080',
      width: 1920,
      height: 1080,
      lastModified: new Date().toISOString()
    },
    dancers: {
      imageUrl: 'https://picsum.photos/seed/dancers-bg/1920/1080',
      width: 1920,
      height: 1080,
      lastModified: new Date().toISOString()
    },
    media: {
      imageUrl: 'https://picsum.photos/seed/media-bg/1920/1080',
      width: 1920,
      height: 1080,
      lastModified: new Date().toISOString()
    },
    contact: {
      imageUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=2000',
      width: 1920,
      height: 1080,
      lastModified: new Date().toISOString()
    }
  },
  siteAssets: {
    backgrounds: {
      'hero-bg': {
        url: 'https://picsum.photos/seed/hero-background/1920/1080',
        size: '2.3 MB',
        width: 1920,
        height: 1080,
        type: 'image'
      },
      'competition-bg': {
        url: 'https://picsum.photos/seed/competition-bg/1920/1080',
        size: '1.8 MB',
        width: 1920,
        height: 1080,
        type: 'image'
      },
      'dancers-bg': {
        url: 'https://picsum.photos/seed/dancers-background/1920/1080',
        size: '2.1 MB',
        width: 1920,
        height: 1080,
        type: 'image'
      },
      'partners-bg': {
        url: 'https://picsum.photos/seed/partners-bg/1920/1080',
        size: '1.9 MB',
        width: 1920,
        height: 1080,
        type: 'image'
      }
    },
    illustrations: {
      'about-section': {
        url: 'https://picsum.photos/seed/about-illustration/800/600',
        size: '0.8 MB',
        width: 800,
        height: 600,
        type: 'image'
      },
      'vip-section': {
        url: 'https://picsum.photos/seed/vip-illustration/800/600',
        size: '0.9 MB',
        width: 800,
        height: 600,
        type: 'image'
      },
      'press-section': {
        url: 'https://picsum.photos/seed/press-illustration/800/600',
        size: '0.7 MB',
        width: 800,
        height: 600,
        type: 'image'
      }
    },
    videos: {
      'hero-video': {
        url: 'https://videos.pexels.com/video-files/3209828/3209828-sd_960_540_25fps.mp4',
        size: '5.2 MB',
        duration: '30s',
        type: 'video'
      },
      'promo-video': {
        url: 'https://videos.pexels.com/video-files/3209828/3209828-sd_960_540_25fps.mp4',
        size: '3.8 MB',
        duration: '15s',
        type: 'video'
      },
      'archive-video': {
        url: 'https://videos.pexels.com/video-files/3209828/3209828-sd_960_540_25fps.mp4',
        size: '4.5 MB',
        duration: '45s',
        type: 'video'
      }
    }
  },
  organizers: [
    {
      id: '1',
      name: 'Elom Kodjo',
      role: 'Directeur Fondateur & Producteur',
      bio: 'Visionnaire et activiste culturel, Elom a fondé l\'ASBI pour propulser le breaking africain sur la scène mondiale.',
      photo: 'https://picsum.photos/seed/elom/400/500',
      socialLinks: {
        instagram: '@elomkodjo',
        facebook: 'elomkodjo',
        twitter: '@elomkodjo'
      }
    },
    {
      id: '2',
      name: 'Sena Ayivi',
      role: 'Coordinatrice Artistique',
      bio: 'Experte en production artistique, Sena orchestre chaque détail pour créer une expérience inoubliable.',
      photo: 'https://picsum.photos/seed/sena/400/500',
      socialLinks: {
        instagram: '@senaayivi',
        facebook: 'senaayivi'
      }
    }
  ],
  organizersConfig: {
    sectionTitle: 'L\'EQUIPE ORGANISATION',
    sectionDescription: 'Derrière le plus grand événement de breaking d\'Afrique de l\'Ouest, se trouve une équipe passionnée d\'activistes culturels et d\'experts en événementiel.',
    organizationName: 'ASBI Togo 2026'
  }
};

export const cmsService = {
  getData: (): CMSData => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      try {
        const parsed = JSON.parse(data);
        // Merge with initialData to ensure all properties exist
        const merged = {
          ...initialData,
          ...parsed,
          companies: parsed.companies || initialData.companies,
          featuredPiece: {
            ...initialData.featuredPiece,
            ...parsed.featuredPiece
          },
          globalConfig: {
            ...initialData.globalConfig,
            ...parsed.globalConfig,
            vip: {
              ...initialData.globalConfig.vip,
              ...parsed.globalConfig?.vip,
              features: parsed.globalConfig?.vip?.features || initialData.globalConfig.vip.features
            }
          },
          partners: {
            logos: parsed.partners?.logos || initialData.partners.logos,
            sponsoringPdfUrl: parsed.partners?.sponsoringPdfUrl || initialData.partners.sponsoringPdfUrl,
            cta: {
              ...initialData.partners.cta,
              ...parsed.partners?.cta
            }
          },
          contact: {
            hero: {
              ...initialData.contact.hero,
              ...parsed.contact?.hero
            },
            sections: {
              ...initialData.contact.sections,
              ...parsed.contact?.sections
            }
          },
          theme: {
            ...initialData.theme,
            ...parsed.theme
          },
          pageBackgrounds: {
            ...initialData.pageBackgrounds,
            ...parsed.pageBackgrounds
          },
          organizers: parsed.organizers || initialData.organizers,
          organizersConfig: {
            ...initialData.organizersConfig,
            ...parsed.organizersConfig
          },
          siteAssets: {
            backgrounds: { ...initialData.siteAssets.backgrounds, ...parsed.siteAssets?.backgrounds },
            illustrations: { ...initialData.siteAssets.illustrations, ...parsed.siteAssets?.illustrations },
            videos: { ...initialData.siteAssets.videos, ...parsed.siteAssets?.videos }
          }
        };
        
        // Ensure program has at least one day with activities
        if (!merged.program || merged.program.length === 0) {
          merged.program = initialData.program;
        }
        
        return merged;
      } catch (e) {
        console.error('Failed to parse CMS data', e);
        return initialData;
      }
    }
    return initialData;
  },

  saveData: (data: CMSData) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    // Emit custom event for real-time updates (same-tab)
    window.dispatchEvent(new CustomEvent('cmsDataChanged', { detail: data }));
  },

  resetData: () => {
    localStorage.removeItem(STORAGE_KEY);
    window.location.reload();
  }
};
