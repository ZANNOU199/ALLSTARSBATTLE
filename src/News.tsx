import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, User, Tag, Share2 } from 'lucide-react';

interface Article {
  id: string;
  date: string;
  title: string;
  desc: string;
  tag: string;
  content: string;
  image: string;
  author: string;
  category: string;
}

const articles: Article[] = [
  {
    id: '1',
    date: "12 Janvier 2026",
    title: "LANCEMENT OFFICIEL DU TOGO 2026",
    desc: "Découvrez les coulisses de la préparation de l'événement le plus attendu de l'année à Lomé.",
    tag: "OFFICIEL",
    author: "Admin All Stars",
    category: "Organisation",
    image: "https://picsum.photos/seed/news1/1200/600",
    content: `
      Le All Stars Battle International 2026 s'annonce comme l'édition la plus ambitieuse de l'histoire du festival. 
      Réunissant plus de 50 nations à Lomé, le Togo devient pour 10 jours la capitale mondiale de la culture urbaine.
      
      Les préparatifs avancent à grands pas. Le stade de Lomé est en cours de transformation pour accueillir une scène 
      à la pointe de la technologie, capable de supporter des performances athlétiques de haut niveau tout en offrant 
      un spectacle visuel époustouflant.
      
      "Nous voulons que chaque danseur, chaque spectateur, ressente l'énergie unique du Togo," déclare le comité d'organisation.
    `
  },
  {
    id: '2',
    date: "05 Février 2026",
    title: "LINEUP DES ARTISTES DÉVOILÉ",
    desc: "Les plus grands noms de la scène Hip-Hop internationale confirment leur présence pour le festival.",
    tag: "TALENTS",
    author: "Music Dept",
    category: "Concerts",
    image: "https://picsum.photos/seed/news2/1200/600",
    content: `
      La musique est l'âme du All Stars Battle. Cette année, nous avons concocté un lineup qui mélange légendes du Hip-Hop 
      et nouvelles pépites de l'Afrobeat.
      
      Parmi les têtes d'affiche, nous confirmons la présence de stars internationales qui se produiront lors du concert 
      de clôture le 23 août. Les DJs officiels du tournoi ont également été sélectionnés pour garantir des beats 
      percutants lors des battles.
    `
  },
  {
    id: '3',
    date: "20 Mars 2026",
    title: "DISPONIBILITÉ DES TICKETS",
    desc: "La billetterie en ligne est désormais ouverte. Réservez vos pass Early Bird avant épuisement.",
    tag: "BILLETTERIE",
    author: "Sales Team",
    category: "Billetterie",
    image: "https://picsum.photos/seed/news3/1200/600",
    content: `
      C'est officiel : les tickets pour le All Stars Battle 2026 sont en vente ! 
      Trois catégories de pass sont disponibles : Standard, Premium et VIP.
      
      Les pass "Early Bird" offrent une réduction de 20% pour les 500 premiers acheteurs. 
      Ne manquez pas votre chance de vivre l'expérience ultime du breakdance en Afrique.
    `
  }
];

interface NewsProps {
  onBack: () => void;
  initialArticleId?: string;
}

export default function News({ onBack, initialArticleId }: NewsProps) {
  const [selectedArticle, setSelectedArticle] = React.useState<Article | null>(
    initialArticleId ? articles.find(a => a.id === initialArticleId) || null : null
  );

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedArticle]);

  if (selectedArticle) {
    return (
      <div className="bg-background-dark min-h-screen text-slate-100 font-display pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          <button 
            onClick={() => setSelectedArticle(null)}
            className="flex items-center gap-2 text-primary hover:text-white transition-colors mb-12 uppercase font-black tracking-widest text-xs"
          >
            <ArrowLeft className="w-4 h-4" /> Retour aux actualités
          </button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="relative aspect-video mb-12 overflow-hidden rounded-lg border border-white/10">
              <img 
                src={selectedArticle.image} 
                alt={selectedArticle.title} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-6 left-6 bg-primary text-background-dark px-4 py-1 font-black tracking-widest text-xs uppercase">
                {selectedArticle.tag}
              </div>
            </div>

            <div className="flex flex-wrap gap-6 mb-8 text-slate-500 text-[10px] font-bold uppercase tracking-widest border-b border-white/5 pb-8">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" /> {selectedArticle.date}
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-primary" /> {selectedArticle.author}
              </div>
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-primary" /> {selectedArticle.category}
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-heading text-white mb-10 leading-none uppercase">
              {selectedArticle.title}
            </h1>

            <div className="prose prose-invert max-w-none">
              {selectedArticle.content.split('\n').map((paragraph, idx) => (
                <p key={idx} className="text-slate-300 text-lg leading-relaxed mb-6 font-light">
                  {paragraph.trim()}
                </p>
              ))}
            </div>

            <div className="mt-20 pt-10 border-t border-white/10 flex justify-between items-center">
              <div className="flex gap-4">
                <button className="p-3 border border-white/10 hover:bg-primary hover:text-background-dark transition-all">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
              <button 
                onClick={onBack}
                className="btn-luxury-primary"
              >
                RETOUR AU SITE
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background-dark min-h-screen text-slate-100 font-display pt-32 pb-20 grainy-bg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20 text-center">
          <span className="text-accent-red font-bold tracking-[0.5em] uppercase text-xs block mb-4">Le Blog Officiel</span>
          <h1 className="text-7xl md:text-9xl font-heading text-white leading-none uppercase tracking-tighter">
            ACTUALITÉS <br/> <span className="text-primary italic">& NEWS</span>
          </h1>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {articles.map((article) => (
            <motion.div
              key={article.id}
              whileHover={{ y: -10 }}
              className="group bg-surface-dark border border-white/5 overflow-hidden transition-all duration-500 hover:border-primary/50"
            >
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 z-20 bg-primary text-background-dark px-3 py-1 text-[10px] font-black tracking-widest">
                  {article.tag}
                </div>
              </div>
              <div className="p-8">
                <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">{article.date}</span>
                <h3 className="text-white font-heading text-2xl mt-3 mb-4 group-hover:text-primary transition-colors leading-tight uppercase">
                  {article.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-8 font-light line-clamp-3">
                  {article.desc}
                </p>
                <button 
                  onClick={() => setSelectedArticle(article)}
                  className="inline-flex items-center gap-3 text-[10px] font-black tracking-[0.3em] uppercase text-white hover:text-primary transition-all"
                >
                  LIRE LA SUITE
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
