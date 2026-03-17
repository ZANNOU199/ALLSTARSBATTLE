
export interface Company {
  id: string;
  name: string;
  choreographer: string;
  pieceTitle: string;
  description: string;
  bio: string;
  mainImage: string;
  gallery: string[];
  performanceDate: string;
  performanceTime: string;
}

export interface Participant {
  id: string;
  name: string;
  country: string;
  countryCode: string;
  specialty: string;
  bio: string;
  photo: string;
  socialLinks: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
    youtube?: string;
  };
  category: 'dancer' | 'judge' | 'dj' | 'mc';
}

export interface Activity {
  id: string;
  time: string;
  title: string;
  location: string;
  description: string;
  category: string;
}

export interface ProgramDay {
  id: string;
  date: string;
  label: string;
  activities: Activity[];
}

export interface Article {
  id: string;
  title: string;
  content: string;
  category: string;
  coverImage: string;
  date: string;
  tag: string;
}

export interface BracketMatch {
  id: string;
  player1: string;
  player2: string;
  score1: string;
  score2: string;
  country1: string;
  country2: string;
  countryCode1: string;
  countryCode2: string;
}

export interface BracketRound {
  id: string;
  title: string;
  matches: BracketMatch[];
}

export interface Ticket {
  id: string;
  name: string;
  price: string;
  period: string;
  tag: string;
  features: string[];
  buttonText: string;
  color: 'primary' | 'accent-red';
  recommended: boolean;
  paymentLink: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  champion: string;
  description: string;
  image: string;
}

export interface Legend {
  id: string;
  name: string;
  bio: string;
  photo: string;
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
  category: 'Institutional' | 'Main' | 'Media';
  tier?: string;
}

export interface GlobalConfig {
  contact: {
    email: string;
    phone: string;
    address: string;
  };
  socials: {
    instagram: string;
    facebook: string;
    twitter: string;
    youtube: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
  hero: {
    title: string;
    subtitle: string;
    location: string;
    backgroundImage: string;
    videoUrl: string;
  };
  competition: {
    dateStart: string;
    location: string;
    description: string;
  };
  dancers: {
    sectionTitle: string;
    sectionSubtitle: string;
  };
  programmation: {
    sectionTitle: string;
  };
  vip: {
    sectionTitle: string;
    sectionDescription: string;
    features: {
      icon: string;
      title: string;
      description: string;
    }[];
  };
  stats: {
    label: string;
    value: string;
  }[];
  partners: {
    sectionTitle: string;
  };
  blog: {
    sectionTitle: string;
  };
  footer: {
    description: string;
    copyright: string;
  };
  homepageStats: {
    label: string;
    value: string;
  }[];
  eventDate: string;
}

export interface MediaItem {
  id: string;
  year: number;
  type: 'photo' | 'video';
  url: string;
  title?: string;
  description?: string;
  thumbnail?: string;
  duration?: string;
  tag?: string;
}

export interface CMSData {
  companies: Company[];
  participants: Participant[];
  program: ProgramDay[];
  categories: string[];
  blog: {
    articles: Article[];
  };
  competition: {
    rules: string;
    prizePool: { category: string; prize: string }[];
    brackets: {
      pouleA: {
        huitiemes: BracketMatch[];
        quarts: BracketMatch[];
        semis: BracketMatch[];
      };
      pouleB: {
        huitiemes: BracketMatch[];
        quarts: BracketMatch[];
        semis: BracketMatch[];
      };
      final: BracketMatch;
    };
  };
  ticketing: {
    tickets: Ticket[];
    faqs: FAQItem[];
  };
  history: {
    timeline: TimelineEvent[];
    legends: Legend[];
  };
  partners: {
    logos: Partner[];
    sponsoringPdfUrl: string;
    cta: {
      title: string;
      subtitle: string;
      buttonText: string;
    };
  };
  media: MediaItem[];
  globalConfig: GlobalConfig;
}
