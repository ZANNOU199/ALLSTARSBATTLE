import React, { useState, useEffect, useRef } from 'react';
import Competition from './Competition';
import Dancers from './Dancers';
import Judges from './Judges';
import Media from './Media';
import History from './History';
import Tickets from './Tickets';
import Program from './Program';
import News from './News';
import { 
  Menu, 
  X, 
  ChevronsDown, 
  Calendar, 
  MapPin, 
  ArrowRight, 
  Verified, 
  GlassWater, 
  Megaphone, 
  Globe, 
  Mail, 
  Instagram, 
  Facebook, 
  Twitter, 
  Youtube,
  Trophy,
  User,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const NavLink = ({ href, children, active = false, red = false, onClick }: { href: string, children: React.ReactNode, active?: boolean, red?: boolean, onClick?: (e: React.MouseEvent) => void }) => (
  <a 
    href={href} 
    onClick={onClick}
    className={`text-xs font-bold tracking-widest uppercase transition-colors hover:text-primary cursor-pointer whitespace-nowrap ${active ? 'text-primary' : red ? 'text-accent-red' : 'text-white'}`}
  >
    {children}
  </a>
);

const NavDropdown = ({ label, items, active = false }: { label: string, items: { label: string, onClick: (e: React.MouseEvent) => void, active?: boolean }[], active?: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className="relative group"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button 
        className={`flex items-center gap-1 text-xs font-bold tracking-widest uppercase transition-colors hover:text-primary cursor-pointer whitespace-nowrap ${active ? 'text-primary' : 'text-white'}`}
      >
        {label}
        <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full left-0 mt-2 w-48 bg-background-dark border border-white/10 py-2 shadow-2xl z-50"
          >
            {items.map((item, idx) => (
              <a
                key={idx}
                href="#"
                onClick={item.onClick}
                className={`block px-4 py-2 text-[10px] font-bold tracking-widest uppercase transition-colors hover:bg-white/5 hover:text-primary ${item.active ? 'text-primary' : 'text-slate-400'}`}
              >
                {item.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const CountdownItem = ({ value, label }: { value: number | string, label: string }) => (
  <div className="flex flex-col">
    <span className="text-4xl md:text-6xl font-heading text-primary">{value}</span>
    <span className="text-[10px] uppercase tracking-widest font-bold text-slate-500">{label}</span>
  </div>
);

const DancerCard = ({ name, origin, image }: { name: string, origin: string, image: string }) => (
  <motion.div 
    whileHover={{ scale: 1.05, y: -10 }}
    className="group relative overflow-hidden aspect-[3/4] bg-surface-dark shadow-2xl transition-all duration-500"
  >
    <img 
      src={image} 
      alt={name} 
      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
      referrerPolicy="no-referrer"
      loading="lazy"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity"></div>
    <div className="absolute bottom-0 left-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform">
      <p className="text-primary font-black text-2xl font-heading tracking-widest text-luxury-glow">{name}</p>
      <p className="text-[10px] uppercase text-slate-400 tracking-widest font-bold">{origin}</p>
    </div>
  </motion.div>
);

const ProgramItem = ({ time, title, desc, color = "primary" }: { time: string, title: string, desc: string, color?: "primary" | "accent-red" }) => (
  <div className={`group/item border-l-2 ${color === "primary" ? "border-primary/30 hover:border-primary" : "border-accent-red/30 hover:border-accent-red"} pl-4 py-2 transition-all duration-300 hover:bg-white/5`}>
    <span className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${color === "primary" ? "text-slate-500 group-hover/item:text-primary" : "text-slate-500 group-hover/item:text-accent-red"}`}>{time}</span>
    <h4 className="text-white font-bold text-sm uppercase tracking-tight mt-1">{title}</h4>
    <p className="text-slate-400 text-xs mt-1 font-light leading-relaxed">{desc}</p>
  </div>
);

interface NewsCardProps {
  date: string;
  title: string;
  desc: string;
  tag: string;
  color?: "primary" | "accent-red";
  onClick?: (e: React.MouseEvent) => void;
}

const NewsCard: React.FC<NewsCardProps> = ({ date, title, desc, tag, color = "primary", onClick }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className={`group bg-surface-dark border border-white/5 overflow-hidden transition-all duration-500 hover:border-${color}/50 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]`}
  >
    <div className="aspect-video bg-zinc-800 relative overflow-hidden">
      <img 
        src={`https://picsum.photos/seed/${title}/800/450`} 
        alt={title} 
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-surface-dark to-transparent z-10 opacity-60"></div>
      <div className={`absolute top-4 left-4 z-20 ${color === "primary" ? "bg-primary text-background-dark" : "bg-accent-red text-white"} px-3 py-1 text-[10px] font-black tracking-widest`}>
        {tag}
      </div>
    </div>
    <div className="p-8 relative">
      <span className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em]">{date}</span>
      <h3 className={`text-white font-heading text-2xl mt-3 mb-4 group-hover:text-${color} transition-colors leading-tight`}>{title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed mb-8 font-light">{desc}</p>
      <button 
        onClick={onClick}
        className={`inline-flex items-center gap-3 text-[10px] font-black tracking-[0.3em] uppercase text-white group-hover:text-${color === "primary" ? "primary" : "accent-red"} transition-all`}
      >
        DÉCOUVRIR <ArrowRight className="w-3 h-3 group-hover:translate-x-2 transition-transform" />
      </button>
    </div>
  </motion.div>
);

const BracketMatch = ({ player1, player2, score1 = "--", score2 = "--", country1, country2, countryCode1, countryCode2, side = "left", color = "primary" }: any) => (
  <div className={`flex flex-col gap-1 bg-white/5 p-4 md:p-3 rounded border-${side === "left" ? "l" : "r"}-4 ${color === "primary" ? "border-primary" : "border-accent-red"} relative transition-all hover:bg-white/10`}>
    <div className={`flex justify-between items-center ${side === "right" ? "flex-row-reverse" : ""}`}>
      <span className="font-bold text-4xl md:text-sm uppercase leading-tight flex items-center gap-2">
        {player1} 
        <span className="text-lg md:text-[10px] text-slate-500 flex items-center gap-1">
          <img src={`https://flagcdn.com/w20/${countryCode1}.png`} alt={country1} className="w-4 h-auto rounded-sm" />
          {country1}
        </span>
      </span>
      <span className="text-primary font-mono text-4xl md:text-sm">{score1}</span>
    </div>
    <div className="h-[1px] bg-white/10 my-2 md:my-1"></div>
    <div className={`flex justify-between items-center ${side === "right" ? "flex-row-reverse" : ""}`}>
      <span className="font-bold text-4xl md:text-sm uppercase leading-tight flex items-center gap-2">
        {player2} 
        <span className="text-lg md:text-[10px] text-slate-500 flex items-center gap-1">
          <img src={`https://flagcdn.com/w20/${countryCode2}.png`} alt={country2} className="w-4 h-auto rounded-sm" />
          {country2}
        </span>
      </span>
      <span className="text-primary font-mono text-4xl md:text-sm">{score2}</span>
    </div>
  </div>
);

const BracketContent = () => (
  <div className="grid grid-cols-7 gap-0 items-stretch py-12 min-h-[1600px] md:min-h-[800px]">
    {/* Poule A: Top 16 (Left) */}
    <div className="flex flex-col h-full">
      <h3 className="font-heading text-2xl md:text-xl text-primary mb-8 text-center shrink-0">HUITIÈMES (A)</h3>
      <div className="flex-1 flex flex-col justify-around py-4">
        <BracketMatch player1="VICTOR" country1="USA" countryCode1="us" player2="TBD" country2="--" countryCode2="un" color="accent-red" />
        <BracketMatch player1="PHIL WIZARD" country1="CAN" countryCode1="ca" player2="TBD" country2="--" countryCode2="un" />
        <BracketMatch player1="DANY DANN" country1="FRA" countryCode1="fr" player2="TBD" country2="--" countryCode2="un" color="accent-red" />
        <BracketMatch player1="SHIGEKIX" country1="JPN" countryCode1="jp" player2="TBD" country2="--" countryCode2="un" />
      </div>
    </div>

    {/* Poule A: Quarts (Left) */}
    <div className="flex flex-col h-full pl-8">
      <h3 className="font-heading text-2xl md:text-xl text-slate-400 mb-8 text-center shrink-0">QUARTS</h3>
      <div className="flex-1 flex flex-col justify-around py-4">
        <div className="flex flex-col gap-1 bg-white/5 p-4 rounded border-l-4 border-white/20">
          <div className="text-xs md:text-[10px] uppercase text-slate-500 mb-2">Match A1/A2</div>
          <div className="flex justify-between items-center opacity-50"><span className="text-2xl md:text-sm font-bold">TBD</span> <span className="text-primary text-2xl md:text-sm">--</span></div>
          <div className="h-[1px] bg-white/10 my-2"></div>
          <div className="flex justify-between items-center opacity-50"><span className="text-2xl md:text-sm font-bold">TBD</span> <span className="text-primary text-2xl md:text-sm">--</span></div>
        </div>
        <div className="flex flex-col gap-1 bg-white/5 p-4 rounded border-l-4 border-white/20">
          <div className="text-xs md:text-[10px] uppercase text-slate-500 mb-2">Match A3/A4</div>
          <div className="flex justify-between items-center opacity-50"><span className="text-2xl md:text-sm font-bold">TBD</span> <span className="text-primary text-2xl md:text-sm">--</span></div>
          <div className="h-[1px] bg-white/10 my-2"></div>
          <div className="flex justify-between items-center opacity-50"><span className="text-2xl md:text-sm font-bold">TBD</span> <span className="text-primary text-2xl md:text-sm">--</span></div>
        </div>
      </div>
    </div>

    {/* Poule A: Semis (Left) */}
    <div className="flex flex-col h-full pr-8 pl-8">
      <h3 className="font-heading text-2xl md:text-xl text-accent-red mb-8 text-center uppercase shrink-0">DEMI-FINALE</h3>
      <div className="flex-1 flex flex-col justify-around py-4">
        <div className="flex flex-col gap-1 bg-accent-red/10 p-6 rounded border border-accent-red/30">
          <div className="flex justify-between items-center opacity-30"><span className="text-2xl md:text-sm font-bold uppercase">WINNER A1/2</span></div>
          <div className="h-[1px] bg-white/10 my-4 text-center text-xs text-white/20 font-heading">VS</div>
          <div className="flex justify-between items-center opacity-30"><span className="text-2xl md:text-sm font-bold uppercase">WINNER A3/4</span></div>
        </div>
      </div>
    </div>

    {/* Center: Final */}
    <div className="flex flex-col h-full items-center justify-center px-4">
      <div className="text-center mb-12 shrink-0">
        <Trophy className="text-primary w-16 h-16 mx-auto mb-4" />
        <h2 className="font-heading text-6xl md:text-5xl text-white tracking-widest uppercase">GRANDE FINALE</h2>
      </div>
      <div className="w-full max-w-[260px] md:max-w-[300px] p-1 bg-gradient-to-b from-primary via-accent-red to-primary rounded-xl shadow-[0_0_60px_rgba(244,209,37,0.3)]">
        <div className="bg-background-dark p-6 md:p-8 rounded-lg flex flex-col items-center gap-6 md:gap-8">
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-primary/30 bg-white/5 flex items-center justify-center mb-4 md:mb-6">
              <User className="w-10 h-10 md:w-12 md:h-12 text-slate-700" />
            </div>
            <span className="font-heading text-3xl md:text-3xl text-slate-500 uppercase text-center">CHAMPION 2026</span>
          </div>
          <div className="w-full flex items-center gap-4 md:gap-6">
            <div className="h-px bg-white/10 grow"></div>
            <div className="h-px bg-white/10 grow"></div>
          </div>
        </div>
      </div>
    </div>

    {/* Poule B: Semis (Right) */}
    <div className="flex flex-col h-full pl-8 pr-8">
      <h3 className="font-heading text-2xl md:text-xl text-accent-red mb-8 text-center uppercase shrink-0">DEMI-FINALE</h3>
      <div className="flex-1 flex flex-col justify-around py-4">
        <div className="flex flex-col gap-1 bg-accent-red/10 p-6 rounded border border-accent-red/30">
          <div className="flex justify-between items-center opacity-30"><span className="text-2xl md:text-sm font-bold uppercase">WINNER B1/2</span></div>
          <div className="h-[1px] bg-white/10 my-4 text-center text-xs text-white/20 font-heading">VS</div>
          <div className="flex justify-between items-center opacity-30"><span className="text-2xl md:text-sm font-bold uppercase">WINNER B3/4</span></div>
        </div>
      </div>
    </div>

    {/* Poule B: Quarts (Right) */}
    <div className="flex flex-col h-full pr-8">
      <h3 className="font-heading text-2xl md:text-xl text-slate-400 mb-8 text-center shrink-0">QUARTS</h3>
      <div className="flex-1 flex flex-col justify-around py-4">
        <div className="flex flex-col gap-1 bg-white/5 p-4 rounded border-r-4 border-white/20">
          <div className="text-xs md:text-[10px] uppercase text-slate-500 mb-2 text-right">Match B1/B2</div>
          <div className="flex justify-between items-center opacity-50"><span className="text-primary text-2xl md:text-sm">--</span> <span className="text-2xl md:text-sm font-bold">TBD</span></div>
          <div className="h-[1px] bg-white/10 my-2"></div>
          <div className="flex justify-between items-center opacity-50"><span className="text-primary text-2xl md:text-sm">--</span> <span className="text-2xl md:text-sm font-bold">TBD</span></div>
        </div>
        <div className="flex flex-col gap-1 bg-white/5 p-4 rounded border-r-4 border-white/20">
          <div className="text-xs md:text-[10px] uppercase text-slate-500 mb-2 text-right">Match B3/B4</div>
          <div className="flex justify-between items-center opacity-50"><span className="text-primary text-2xl md:text-sm">--</span> <span className="text-2xl md:text-sm font-bold">TBD</span></div>
          <div className="h-[1px] bg-white/10 my-2"></div>
          <div className="flex justify-between items-center opacity-50"><span className="text-primary text-2xl md:text-sm">--</span> <span className="text-2xl md:text-sm font-bold">TBD</span></div>
        </div>
      </div>
    </div>

    {/* Poule B: Top 16 (Right) */}
    <div className="flex flex-col h-full">
      <h3 className="font-heading text-2xl md:text-xl text-primary mb-8 text-center shrink-0">HUITIÈMES (B)</h3>
      <div className="flex-1 flex flex-col justify-around py-4">
        <BracketMatch player1="LIGEE" country1="CHN" countryCode1="cn" player2="TBD" country2="--" countryCode2="un" side="right" color="accent-red" />
        <BracketMatch player1="KUZYA" country1="UKR" countryCode1="ua" player2="TBD" country2="--" countryCode2="un" side="right" />
        <BracketMatch player1="LEE" country1="NLD" countryCode1="nl" player2="TBD" country2="--" countryCode2="un" side="right" color="accent-red" />
        <BracketMatch player1="QUAKE" country1="TPE" countryCode1="tw" player2="TBD" country2="--" countryCode2="un" side="right" />
      </div>
    </div>
  </div>
);

import ArtisticScene from './ArtisticScene';
import Contact from './Contact';
import Partners from './Partners';
import AdminDashboard from './admin/AdminDashboard';
import { cmsService } from './services/cmsService';
import { GlobalConfig } from './types';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'competition' | 'dancers' | 'judges' | 'media' | 'history' | 'tickets' | 'program' | 'news' | 'artistic' | 'contact' | 'partners' | 'admin'>('home');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [selectedArticleId, setSelectedArticleId] = useState<string | undefined>(undefined);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [config, setConfig] = useState<GlobalConfig | null>(null);
  const [stats, setStats] = useState<any[]>([]);
  const [recentNews, setRecentNews] = useState<any[]>([]);
  const [participants, setParticipants] = useState<any[]>([]);
  const [programData, setProgramData] = useState<any[]>([]);
  const [vipConfig, setVipConfig] = useState({ sectionTitle: 'EXPÉRIENCE VIP', sectionSubtitle: "Plongez au cœur de l'action avec un accès privilégié. Vivez le All Stars Battle International dans les meilleures conditions possibles." });

  useEffect(() => {
    const data = cmsService.getData();
    if (data && data.globalConfig) {
      setConfig(data.globalConfig);
      setStats(data.globalConfig.stats || []);
      if (data.globalConfig.vip) {
        setVipConfig({
          sectionTitle: data.globalConfig.vip.sectionTitle || 'EXPÉRIENCE VIP',
          sectionSubtitle: data.globalConfig.vip.sectionSubtitle || "Plongez au cœur de l'action avec un accès privilégié. Vivez le All Stars Battle International dans les meilleures conditions possibles."
        });
      }
    }
    
    if (data && data.blog && data.blog.articles) {
      setRecentNews(data.blog.articles.slice(0, 3) || []);
    }
    
    if (data) {
      setParticipants(data.participants || []);
      setProgramData(data.program || []);
    }
  }, []);

  // Recharge la config quand on revient de l'admin avec les nouvelles données
  useEffect(() => {
    if (currentPage !== 'admin') {
      const data = cmsService.getData();
      setConfig(data.globalConfig);
    }
  }, [currentPage]);

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = config?.eventDate ? new Date(config.eventDate) : new Date('2026-03-20T00:00:00');
    
    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [config?.eventDate]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const navigateTo = (page: 'home' | 'competition' | 'dancers' | 'judges' | 'media' | 'history' | 'tickets' | 'program' | 'news' | 'artistic' | 'contact' | 'partners' | 'admin', anchor?: string, articleId?: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentPage(page);
    setSelectedArticleId(articleId);
    setIsMenuOpen(false);
    
    if (anchor) {
      setTimeout(() => {
        const element = document.getElementById(anchor.replace('#', ''));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };
  const [scrolled, setScrolled] = useState(false);
  const [bracketScale, setBracketScale] = useState(1);
  const [bracketHeight, setBracketHeight] = useState(1000);
  const bracketContainerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateScale = () => {
      if (bracketContainerRef.current) {
        const containerWidth = window.innerWidth;
        const targetWidth = 1200; 
        // Revert to full fitting scale (no horizontal scroll)
        const scale = Math.min(1, (containerWidth - 24) / targetWidth);
        setBracketScale(scale);
      }
    };

    updateScale();
    const timer = setTimeout(updateScale, 500);
    window.addEventListener('resize', updateScale);
    return () => {
      window.removeEventListener('resize', updateScale);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const updateHeight = () => {
      if (measureRef.current) {
        const height = measureRef.current.offsetHeight;
        if (height > 100) {
          setBracketHeight(height);
        }
      }
    };

    const resizeObserver = new ResizeObserver(updateHeight);
    if (measureRef.current) {
      resizeObserver.observe(measureRef.current);
      updateHeight();
    }

    const interval = setInterval(updateHeight, 1000);
    return () => {
      resizeObserver.disconnect();
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      {/* NAVBAR */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-background-dark/95 backdrop-blur-md border-b border-primary/10 h-16' : 'bg-transparent h-20'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex justify-between items-center h-full">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 bg-primary flex items-center justify-center font-heading text-2xl text-background-dark font-bold">AS</div>
              <span className="hidden sm:block font-heading text-xl tracking-tighter text-white">ALL STARS BATTLE</span>
            </div>
            
            <div className="hidden xl:flex items-center space-x-8">
              <NavLink href="#home" active={currentPage === 'home'} onClick={navigateTo('home')}>Accueil</NavLink>
              
              <NavDropdown 
                label="Le Festival" 
                active={currentPage === 'history' || currentPage === 'program' || currentPage === 'artistic' || currentPage === 'partners'}
                items={[
                  { label: "Histoire", onClick: navigateTo('history'), active: currentPage === 'history' },
                  { label: "Programme", onClick: navigateTo('program'), active: currentPage === 'program' },
                  { label: "Scène Artistique", onClick: navigateTo('artistic'), active: currentPage === 'artistic' },
                  { label: "Partenaires", onClick: navigateTo('partners'), active: currentPage === 'partners' }
                ]} 
              />

              <NavDropdown 
                label="Compétition" 
                active={currentPage === 'competition' || currentPage === 'dancers' || currentPage === 'judges'}
                items={[
                  { label: "Tableau (Brackets)", onClick: navigateTo('home', '#brackets') },
                  { label: "Les Danseurs", onClick: navigateTo('dancers'), active: currentPage === 'dancers' },
                  { label: "Les Juges", onClick: navigateTo('judges'), active: currentPage === 'judges' }
                ]} 
              />

              <NavLink href="#tickets" active={currentPage === 'tickets'} onClick={navigateTo('tickets')}>Billetterie</NavLink>
              <NavLink href="#media" active={currentPage === 'media'} onClick={navigateTo('media')}>Médias</NavLink>
              <NavLink href="#news" active={currentPage === 'news'} onClick={navigateTo('news')}>Blog</NavLink>
              <NavLink href="#vip" red onClick={navigateTo('home', '#vip')}>VIP</NavLink>
              <NavLink href="#contact" active={currentPage === 'contact'} onClick={navigateTo('contact')}>Contact</NavLink>
            </div>

            <div className="flex items-center gap-4">
              <button className="xl:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-background-dark pt-24 px-6 xl:hidden overflow-y-auto"
          >
            <div className="flex flex-col space-y-8 text-left max-w-md mx-auto">
              <a href="#home" onClick={navigateTo('home')} className={`text-3xl font-heading uppercase ${currentPage === 'home' ? 'text-primary' : 'text-white'}`}>Accueil</a>
              
              <div className="space-y-4">
                <p className="text-slate-500 text-[10px] font-bold tracking-[0.3em] uppercase">Le Festival</p>
                <div className="flex flex-col space-y-4 pl-4 border-l border-white/10">
                  <a href="#history" onClick={navigateTo('history')} className={`text-xl font-heading uppercase ${currentPage === 'history' ? 'text-primary' : 'text-white'}`}>Histoire</a>
                  <a href="#program" onClick={navigateTo('program')} className={`text-xl font-heading uppercase ${currentPage === 'program' ? 'text-primary' : 'text-white'}`}>Programme</a>
                  <a href="#artistic" onClick={navigateTo('artistic')} className={`text-xl font-heading uppercase ${currentPage === 'artistic' ? 'text-primary' : 'text-white'}`}>Scène Artistique</a>
                  <a href="#partners" onClick={navigateTo('partners')} className={`text-xl font-heading uppercase ${currentPage === 'partners' ? 'text-primary' : 'text-white'}`}>Partenaires</a>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-slate-500 text-[10px] font-bold tracking-[0.3em] uppercase">Compétition</p>
                <div className="flex flex-col space-y-4 pl-4 border-l border-white/10">
                  <a href="#brackets" onClick={navigateTo('home', '#brackets')} className="text-xl font-heading text-white uppercase">Tableau (Brackets)</a>
                  <a href="#dancers" onClick={navigateTo('dancers')} className={`text-xl font-heading uppercase ${currentPage === 'dancers' ? 'text-primary' : 'text-white'}`}>Danseurs</a>
                  <a href="#judges" onClick={navigateTo('judges')} className={`text-xl font-heading uppercase ${currentPage === 'judges' ? 'text-primary' : 'text-white'}`}>Juges</a>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-slate-500 text-[10px] font-bold tracking-[0.3em] uppercase">Expérience</p>
                <div className="flex flex-col space-y-4 pl-4 border-l border-white/10">
                  <a href="#tickets" onClick={navigateTo('tickets')} className={`text-xl font-heading uppercase ${currentPage === 'tickets' ? 'text-primary' : 'text-white'}`}>Billetterie</a>
                  <a href="#media" onClick={navigateTo('media')} className={`text-xl font-heading uppercase ${currentPage === 'media' ? 'text-primary' : 'text-white'}`}>Médias</a>
                  <a href="#news" onClick={navigateTo('news')} className={`text-xl font-heading uppercase ${currentPage === 'news' ? 'text-primary' : 'text-white'}`}>Blog</a>
                  <a href="#vip" onClick={navigateTo('home', '#vip')} className="text-xl font-heading text-accent-red uppercase">Espace VIP</a>
                </div>
              </div>

              <a href="#contact" onClick={navigateTo('contact')} className={`text-3xl font-heading uppercase ${currentPage === 'contact' ? 'text-primary' : 'text-white'}`}>Contact</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {currentPage === 'home' ? (
        <>
          {/* HERO SECTION */}
          <section id="home" className="relative min-h-screen flex flex-col justify-center items-center pt-20 overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 z-0">
          {/* Video for Tablet & PC */}
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            preload="auto"
            poster="https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&q=80&w=1920"
            className="hidden md:block w-full h-full object-cover opacity-50 scale-105"
          >
            <source src="https://vjs.zencdn.net/v/oceans.mp4" type="video/mp4" />
          </video>
          
          {/* Photo for Mobile */}
          <div 
            className="md:hidden w-full h-full bg-cover bg-center opacity-60 scale-110"
            style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&q=60&w=800")' }}
          ></div>
          
          <div className="absolute inset-0 bg-gradient-to-b from-background-dark/70 via-background-dark/20 to-background-dark/80"></div>
          <div className="absolute inset-0 grainy-bg opacity-20"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 w-full max-w-6xl mx-auto">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-accent-red font-heading text-2xl tracking-[0.3em] block uppercase mb-6"
          >
            {config?.hero.location || "TOGO 2026"}
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="font-heading text-6xl md:text-8xl lg:text-[10rem] leading-none mb-4 tracking-tighter text-white text-luxury-glow"
          >
            {config?.hero.title.split(' ').slice(0, -1).join(' ') || "ALL STARS BATTLE"} <br/>
            <span className="text-primary">{config?.hero.title.split(' ').slice(-1) || "INTERNATIONAL"}</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl font-light tracking-[0.5em] uppercase mb-12 text-slate-400"
          >
            {config?.hero.subtitle || "Le Trône. Le Respect. La Légende."}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-4 gap-4 max-w-2xl mx-auto mb-16 border-y border-white/10 py-8"
          >
            <CountdownItem value={timeLeft.days} label="Jours" />
            <CountdownItem value={timeLeft.hours} label="Heures" />
            <CountdownItem value={timeLeft.minutes} label="Minutes" />
            <CountdownItem value={timeLeft.seconds} label="Secondes" />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center mb-12"
          >
            <button className="btn-luxury-primary shimmer-effect">
              BILLETERIE
            </button>
            <button className="btn-luxury-secondary">
              S'INSCRIRE
            </button>
          </motion.div>

          {/* Social Media Icons */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
            className="flex flex-col items-center gap-4"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500">Suivez-nous :</span>
            <div className="flex gap-8">
              <a href="#" className="text-white hover:text-primary transition-all hover:scale-125"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="text-white hover:text-primary transition-all hover:scale-125"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="text-white hover:text-primary transition-all hover:scale-125"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="text-white hover:text-primary transition-all hover:scale-125"><Youtube className="w-5 h-5" /></a>
            </div>
          </motion.div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronsDown className="text-primary w-8 h-8" />
        </div>
      </section>

      {/* LA COMPÉTITION */}
      <section id="competition" className="py-24 bg-surface-dark relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2 relative">
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-accent-red/20 rounded-full blur-3xl"></div>
            <div className="relative z-10 aspect-video w-full bg-cover bg-center rounded-sm border-l-4 border-primary overflow-hidden">
              <img 
                src="https://picsum.photos/seed/dance/800/450" 
                alt="Competition" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          <div className="lg:w-1/2">
            <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs">Aperçu</span>
            <h2 className="font-heading text-5xl md:text-7xl text-white mb-6 uppercase">LA COMPÉTITION</h2>
            <div className="flex flex-col gap-4 mb-8">
              <div className="flex items-center gap-4 text-slate-300">
                <Calendar className="text-primary w-5 h-5" />
                <span className="text-lg font-bold">14 - 16 AOÛT 2026</span>
              </div>
              <div className="flex items-center gap-4 text-slate-300">
                <MapPin className="text-primary w-5 h-5" />
                <span className="text-lg font-bold">PALAIS DES CONGRÈS DE LOMÉ, TOGO</span>
              </div>
            </div>
            <p className="text-slate-400 leading-relaxed mb-8 text-lg">
              L'élite mondiale du breaking et du hip-hop se réunit sur les terres du Togo pour la plus grande battle d'Afrique. 3 jours de compétition intense, de workshops et de culture urbaine. Le vainqueur n'emporte pas seulement le titre, il entre dans l'histoire.
            </p>
            <a href="#" className="inline-flex items-center gap-2 text-primary font-bold tracking-widest uppercase hover:underline">
              Détails du tournoi <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* LES DANSEURS */}
      <section id="dancers" className="py-24 bg-background-dark overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-accent-red font-bold tracking-[0.3em] uppercase text-xs">Featured</span>
              <h2 className="font-heading text-5xl md:text-7xl text-white uppercase leading-none">LES DANSEURS</h2>
            </div>
            <a href="#" className="text-slate-500 hover:text-white transition-colors uppercase font-bold text-xs tracking-widest pb-2">Voir tous les profils</a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <DancerCard name="B-BOY RYU" origin="Japon | 2024 Champion" image="https://picsum.photos/seed/ryu/400/600" />
            <DancerCard name="B-GIRL STORM" origin="France | Power Move specialist" image="https://picsum.photos/seed/storm/400/600" />
            <DancerCard name="B-BOY KODJO" origin="Togo | Host Nation Hero" image="https://picsum.photos/seed/kodjo/400/600" />
            <DancerCard name="B-BOY ZIP" origin="USA | Footwork King" image="https://picsum.photos/seed/zip/400/600" />
          </div>
        </div>
      </section>

      {/* PROGRAMME */}
      <section id="program" className="py-24 bg-surface-dark border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading text-5xl md:text-7xl text-white uppercase text-center mb-16 tracking-tight">PROGRAMMATION</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Day 1 */}
            <div className="border border-white/10 p-8 hover:border-primary transition-all bg-background-dark/40 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-accent-red/5 blur-2xl group-hover:bg-accent-red/10 transition-colors"></div>
              <div className="flex justify-between items-start mb-8 relative z-10">
                <div className="flex flex-col">
                  <span className="text-4xl font-heading text-primary">JOUR 01</span>
                  <span className="text-xs font-bold tracking-[0.2em] text-accent-red mt-1 uppercase">Workshops & Culture</span>
                </div>
                <span className="text-xs font-bold bg-white/10 px-3 py-1 text-slate-300">14 AOÛT</span>
              </div>
              <div className="space-y-6 relative z-10">
                <ProgramItem time="10:00 - 16:00" title="Masterclasses Internationales" desc="Apprentissage technique avec les légendes du breaking mondial." />
                <ProgramItem time="18:00 - 20:00" title="Pièces Chorégraphiques" desc="Spectacles d'ouverture par des compagnies africaines renommées." color="accent-red" />
                <ProgramItem time="21:00" title="Conférence de Presse & Kick-off" desc="Soirée de lancement officielle au Palais des Congrès." />
              </div>
            </div>

            {/* Day 2 */}
            <div className="border-2 border-primary p-8 bg-primary/5 group relative overflow-hidden shadow-[0_0_30px_rgba(211,95,23,0.1)]">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 blur-2xl"></div>
              <div className="flex justify-between items-start mb-8 relative z-10">
                <div className="flex flex-col">
                  <span className="text-4xl font-heading text-primary">JOUR 02</span>
                  <span className="text-xs font-bold tracking-[0.2em] text-accent-red mt-1 uppercase">The Competition</span>
                </div>
                <span className="text-xs font-bold bg-primary text-background-dark px-3 py-1">15 AOÛT</span>
              </div>
              <div className="space-y-6 relative z-10">
                <div className="border-l-2 border-primary pl-4 py-1 bg-white/5">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-widest">11:00 - 15:00</span>
                  <h4 className="text-white font-bold text-sm uppercase">Preliminary Rounds</h4>
                  <p className="text-slate-400 text-xs mt-1">Sélection drastique des meilleurs breakers du continent.</p>
                </div>
                <ProgramItem time="16:00 - 19:00" title="2vs2 Open Category" desc="Batailles intenses en duo pour une place en finale." color="accent-red" />
                <ProgramItem time="20:00" title="Top 16 Seeding" desc="Annonce des têtes de série pour les phases finales." />
              </div>
            </div>

            {/* Day 3 */}
            <div className="border border-white/10 p-8 hover:border-primary transition-all bg-background-dark/40 group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-accent-red/5 blur-2xl group-hover:bg-accent-red/10 transition-colors"></div>
              <div className="flex justify-between items-start mb-8 relative z-10">
                <div className="flex flex-col">
                  <span className="text-4xl font-heading text-primary">JOUR 03</span>
                  <span className="text-xs font-bold tracking-[0.2em] text-accent-red mt-1 uppercase">The Grand Finale</span>
                </div>
                <span className="text-xs font-bold bg-white/10 px-3 py-1 text-slate-300">16 AOÛT</span>
              </div>
              <div className="space-y-6 relative z-10">
                <ProgramItem time="14:00 - 16:00" title="Workshop All Stars" desc="Session exclusive avec les juges internationaux." color="accent-red" />
                <div className="border-l-2 border-primary pl-4 py-1 bg-primary/10">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-widest">18:00 - 22:00</span>
                  <h4 className="text-white font-bold text-sm uppercase">World Finals - Main Stage</h4>
                  <p className="text-slate-400 text-xs mt-1">Le couronnement du champion All Stars Battle 2026.</p>
                </div>
                <ProgramItem time="23:00 - Late" title="Official After-party" desc="Célébration finale avec DJs internationaux et performers." color="accent-red" />
              </div>
            </div>
          </div>
          <div className="mt-12 text-center">
            <a 
              href="#program" 
              onClick={navigateTo('program')}
              className="inline-block border border-white/20 px-8 py-3 text-xs font-bold tracking-[0.2em] uppercase hover:bg-white hover:text-background-dark transition-all cursor-pointer"
            >
              Consulter le programme complet
            </a>
          </div>
        </div>
      </section>

      {/* BRACKETS SECTION */}
      <section id="brackets" className="py-32 bg-background-dark overflow-hidden relative border-t border-white/10">
        <div className="absolute inset-0 pointer-events-none grain-texture z-0 opacity-5"></div>
        <div className="absolute inset-0 pointer-events-none diagonal-lines z-0 opacity-10"></div>
        
        <div className="max-w-7xl mx-auto px-4 text-center mb-16 relative z-10">
          <div className="inline-block px-4 py-1 border border-primary/30 bg-primary/10 rounded-full mb-6">
            <span className="text-primary text-xs font-bold tracking-[0.2em] uppercase">Phase Finale - Lomé, Togo</span>
          </div>
          <h1 className="font-heading text-6xl md:text-8xl text-white mb-4 tracking-tight uppercase">
            TABLEAU DES BATTLES <span className="text-primary">-</span> TOP 16
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto font-light text-lg">
            Suivez en temps réel l'ascension des meilleurs B-Boys et B-Girls du monde vers le titre suprême de l'All Star Battle International 2026.
          </p>
        </div>

        <div ref={bracketContainerRef} className="w-full relative z-10 overflow-hidden" style={{ height: `${bracketHeight * bracketScale + 40}px`, minHeight: '400px' }}>
          {/* Hidden clone for measurement */}
          <div 
            ref={measureRef} 
            className="absolute top-0 left-0 invisible pointer-events-none" 
            style={{ width: '1200px' }}
          >
            <BracketContent />
          </div>

          {/* Scaled visible content */}
          <div 
            style={{ 
              width: '1200px',
              position: 'absolute',
              left: '50%',
              top: 0,
              transform: `translateX(-50%) scale(${bracketScale})`,
              transformOrigin: 'top center',
              transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              willChange: 'transform'
            }}
          >
            <BracketContent />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 mt-32 grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          {stats.map((stat, idx) => (
            <div key={idx} className={`bg-white/5 p-8 rounded-xl border border-white/10 hover:border-${idx === 0 ? 'primary' : idx === 1 ? 'accent-red' : 'white'}/30 transition-all`}>
              <h4 className={`font-heading text-4xl text-${idx === 0 ? 'primary' : idx === 1 ? 'accent-red' : 'white'} mb-2`}>{stat.value}</h4>
              <p className="text-slate-400 uppercase text-xs font-bold tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* VIP EXPERIENCE */}
      <section id="vip" className="py-24 relative">
        <div className="absolute inset-0 bg-cover bg-fixed opacity-20" style={{ backgroundImage: "url('https://picsum.photos/seed/vip/1920/1080')" }}></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-gradient-to-br from-surface-dark to-black border border-primary/30 p-12 lg:p-20 relative overflow-hidden">
            <div className="absolute -right-20 -top-20 w-64 h-64 border-[1px] border-primary/20 rounded-full"></div>
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-primary font-bold tracking-[0.5em] uppercase text-xs">Exclusif</span>
                <h2 className="font-heading text-6xl md:text-8xl text-white mb-6 uppercase leading-none">
                  {vipConfig.sectionTitle.includes('VIP') ? (
                    <>{vipConfig.sectionTitle.replace('VIP', '')} <span className="text-accent-red">VIP</span></>
                  ) : vipConfig.sectionTitle}
                </h2>
                <p className="text-slate-300 text-lg mb-10 font-light leading-relaxed">
                  {vipConfig.sectionSubtitle}
                </p>
                <div className="space-y-6 mb-12">
                  <div className="flex items-start gap-4">
                    <Verified className="text-primary w-6 h-6 mt-1" />
                    <div>
                      <h4 className="text-white font-bold uppercase tracking-widest text-sm">Platinum Backstage</h4>
                      <p className="text-slate-400 text-sm">Rencontrez les juges et les danseurs dans la zone athlètes.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <GlassWater className="text-primary w-6 h-6 mt-1" />
                    <div>
                      <h4 className="text-white font-bold uppercase tracking-widest text-sm">Lounge Exclusif</h4>
                      <p className="text-slate-400 text-sm">Open bar et buffet gastronomique dans une ambiance premium.</p>
                    </div>
                  </div>
                </div>
                <button className="btn-luxury-vip shimmer-effect">DÉCOUVRIR LES OFFRES</button>
              </div>
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent-red rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-black rounded-lg p-4">
                  <img 
                    src="https://picsum.photos/seed/viplounge/600/400" 
                    alt="VIP Experience" 
                    className="w-full h-auto rounded"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MEDIAS */}
      <section id="media" className="py-24 bg-background-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs">Archives</span>
              <h2 className="font-heading text-5xl md:text-7xl text-white uppercase leading-none">MÉDIAS</h2>
            </div>
            <a href="#" className="text-slate-500 hover:text-white transition-colors uppercase font-bold text-xs tracking-widest pb-2 underline decoration-primary underline-offset-8">Accéder à la galerie</a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="aspect-square bg-surface-dark overflow-hidden group">
              <img src="https://picsum.photos/seed/m1/400/400" alt="Media" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
            </div>
            <div className="aspect-square md:aspect-auto md:row-span-2 bg-surface-dark overflow-hidden group">
              <img src="https://picsum.photos/seed/m2/400/800" alt="Media" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
            </div>
            <div className="aspect-square bg-surface-dark overflow-hidden group">
              <img src="https://picsum.photos/seed/m3/400/400" alt="Media" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
            </div>
            <div className="aspect-square bg-surface-dark overflow-hidden group">
              <img src="https://picsum.photos/seed/m4/400/400" alt="Media" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
            </div>
            <div className="aspect-square bg-surface-dark overflow-hidden group">
              <img src="https://picsum.photos/seed/m5/400/400" alt="Media" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
            </div>
            <div className="aspect-square bg-surface-dark overflow-hidden group">
              <img src="https://picsum.photos/seed/m6/400/400" alt="Media" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
            </div>
          </div>
        </div>
      </section>

      {/* PARTENAIRES */}
      <section className="py-24 bg-background-dark border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full grainy-bg opacity-10 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <span className="text-accent-red font-bold tracking-[0.4em] uppercase text-xs mb-4 block">Réseau Officiel</span>
            <h2 className="font-heading text-6xl md:text-8xl text-white uppercase leading-none">PARTENAIRES & <span className="text-primary">SPONSORS</span></h2>
            <div className="w-24 h-1 bg-gradient-to-r from-accent-red to-primary mx-auto mt-6"></div>
          </div>
          
          <div className="space-y-24">
            <div>
              <h3 className="text-slate-500 font-bold tracking-[0.3em] uppercase text-[10px] text-center mb-12 border-b border-white/5 pb-4">Partenaires Institutionnels</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="bg-surface-dark/40 border border-white/5 p-8 flex items-center justify-center grayscale hover:grayscale-0 hover:border-primary/30 transition-all duration-500">
                    <img src={`https://picsum.photos/seed/logo${i}/200/100`} alt="Partner" className="h-12 w-auto object-contain" referrerPolicy="no-referrer" />
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-slate-500 font-bold tracking-[0.3em] uppercase text-[10px] text-center mb-12 border-b border-white/5 pb-4">Sponsors Majeurs</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                {[5, 6, 7].map(i => (
                  <div key={i} className="bg-gradient-to-b from-primary/5 to-transparent border border-primary/20 p-12 flex items-center justify-center hover:border-primary transition-all duration-500 group">
                    <img src={`https://picsum.photos/seed/sponsor${i}/300/150`} alt="Sponsor" className="h-16 w-auto object-contain grayscale hover:grayscale-0 group-hover:scale-110 transition-all" referrerPolicy="no-referrer" />
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-20 text-center">
            <a 
              href="#partners" 
              onClick={navigateTo('partners')}
              className="btn-luxury-primary inline-block shimmer-effect"
            >
              DEVENIR PARTENAIRE
            </a>
            <p className="text-slate-500 text-[10px] uppercase font-bold tracking-[0.3em] mt-6">Rejoignez l'élite de la culture urbaine africaine</p>
          </div>
        </div>
      </section>

      {/* ACTUALITÉS */}
      <section className="py-24 bg-background-dark border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-accent-red font-bold tracking-[0.3em] uppercase text-xs">Blog Officiel</span>
              <h2 className="font-heading text-5xl md:text-7xl text-white uppercase leading-none">ACTUALITÉS & NEWS</h2>
            </div>
            <a 
              href="#news" 
              onClick={navigateTo('news')}
              className="text-slate-500 hover:text-white transition-colors uppercase font-bold text-xs tracking-widest pb-2 border-b border-primary/30"
            >
              Voir toutes les actualités
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentNews.map((article, idx) => (
              <NewsCard 
                key={article.id}
                date={article.date} 
                title={article.title} 
                desc={article.content} 
                tag={article.category} 
                color={idx === 1 ? "accent-red" : "primary"}
                onClick={navigateTo('news', undefined, article.id)}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  ) : currentPage === 'competition' ? (
    <Competition />
  ) : currentPage === 'dancers' ? (
    <Dancers onViewPerformances={() => setCurrentPage('media')} />
  ) : currentPage === 'judges' ? (
    <Judges />
  ) : currentPage === 'history' ? (
    <History />
  ) : currentPage === 'tickets' ? (
    <Tickets />
  ) : currentPage === 'program' ? (
    <Program onReserveTickets={() => setCurrentPage('tickets')} />
  ) : currentPage === 'news' ? (
    <News onBack={() => setCurrentPage('home')} initialArticleId={selectedArticleId} />
  ) : currentPage === 'artistic' ? (
    <ArtisticScene 
      onNavigateToProgram={() => setCurrentPage('program')} 
      onNavigateToTickets={() => setCurrentPage('tickets')} 
    />
  ) : currentPage === 'contact' ? (
    <Contact onNavigateToFAQ={() => {
      setCurrentPage('home');
      setTimeout(() => {
        const element = document.getElementById('faq');
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }} />
  ) : currentPage === 'partners' ? (
    <Partners onContactClick={navigateTo('contact')} />
  ) : currentPage === 'admin' ? (
    <AdminDashboard onLogout={() => {
      setIsAdminLoggedIn(false);
      setCurrentPage('home');
    }} />
  ) : (
    <Media />
  )}

  {/* FOOTER */}
      <footer id="footer" className="bg-background-dark pt-24 pb-12 border-t border-primary/20 grainy-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
            <div className="col-span-1 md:col-span-1">
              <div className="h-16 w-16 bg-primary flex items-center justify-center font-heading text-4xl text-background-dark font-bold mb-8">AS</div>
              <p className="text-slate-400 text-sm leading-relaxed mb-8">
                L'événement de breakdance ultime qui définit le trône de la culture urbaine en Afrique. Vivez l'excellence du mouvement, du rythme et de la compétition internationale au cœur du Togo.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 border border-white/10 flex items-center justify-center rounded-sm hover:bg-primary hover:text-background-dark transition-all duration-300">
                  <Globe className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 border border-white/10 flex items-center justify-center rounded-sm hover:bg-primary hover:text-background-dark transition-all duration-300">
                  <Mail className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 border border-white/10 flex items-center justify-center rounded-sm hover:bg-primary hover:text-background-dark transition-all duration-300">
                  <Megaphone className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            <div className="col-span-1">
              <h4 className="text-white font-heading text-xl uppercase tracking-widest mb-8 border-b border-primary/30 pb-2 inline-block">Le Festival</h4>
              <ul className="space-y-4">
                <li><a href="#home" onClick={navigateTo('home')} className="text-slate-400 hover:text-primary transition-colors text-[10px] font-bold tracking-widest uppercase">Accueil</a></li>
                <li><a href="#history" onClick={navigateTo('history')} className="text-slate-400 hover:text-primary transition-colors text-[10px] font-bold tracking-widest uppercase">Histoire</a></li>
                <li><a href="#program" onClick={navigateTo('program')} className="text-slate-400 hover:text-primary transition-colors text-[10px] font-bold tracking-widest uppercase">Programme</a></li>
                <li><a href="#artistic" onClick={navigateTo('artistic')} className="text-slate-400 hover:text-primary transition-colors text-[10px] font-bold tracking-widest uppercase">Scène Artistique</a></li>
              </ul>
            </div>

            <div className="col-span-1">
              <h4 className="text-white font-heading text-xl uppercase tracking-widest mb-8 border-b border-primary/30 pb-2 inline-block">Compétition</h4>
              <ul className="space-y-4">
                <li><a href="#brackets" onClick={navigateTo('home', '#brackets')} className="text-slate-400 hover:text-primary transition-colors text-[10px] font-bold tracking-widest uppercase">Tableau (Brackets)</a></li>
                <li><a href="#dancers" onClick={navigateTo('dancers')} className="text-slate-400 hover:text-primary transition-colors text-[10px] font-bold tracking-widest uppercase">Les Danseurs</a></li>
                <li><a href="#judges" onClick={navigateTo('judges')} className="text-slate-400 hover:text-primary transition-colors text-[10px] font-bold tracking-widest uppercase">Les Juges</a></li>
              </ul>
            </div>

            <div className="col-span-1">
              <h4 className="text-white font-heading text-xl uppercase tracking-widest mb-8 border-b border-primary/30 pb-2 inline-block">Expérience</h4>
              <ul className="space-y-4">
                <li><a href="#tickets" onClick={navigateTo('tickets')} className="text-slate-400 hover:text-primary transition-colors text-[10px] font-bold tracking-widest uppercase">Billetterie</a></li>
                <li><a href="#media" onClick={navigateTo('media')} className="text-slate-400 hover:text-primary transition-colors text-[10px] font-bold tracking-widest uppercase">Médias</a></li>
                <li><a href="#vip" onClick={navigateTo('home', '#vip')} className="text-slate-400 hover:text-primary transition-colors text-[10px] font-bold tracking-widest uppercase">Espace VIP</a></li>
              </ul>
            </div>

            <div className="col-span-1 md:col-span-2 lg:col-span-1">
              <h4 className="text-white font-heading text-xl uppercase tracking-widest mb-8 border-b border-primary/30 pb-2 inline-block">Contact</h4>
              <ul className="space-y-4">
                <li><a href="#contact" onClick={navigateTo('contact')} className="text-slate-400 hover:text-primary transition-colors text-[10px] font-bold tracking-widest uppercase">Nous Contacter</a></li>
                <li><a href="#" className="text-slate-400 hover:text-primary transition-colors text-[10px] font-bold tracking-widest uppercase">FAQ</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-10 flex flex-col md:flex-row gap-8 items-center border-t border-white/5 pt-8">
            <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Suivez l'actualité :</span>
            <div className="flex gap-8">
              <a href="#" className="text-white hover:text-primary transition-all hover:scale-125"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="text-white hover:text-primary transition-all hover:scale-125"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="text-white hover:text-primary transition-all hover:scale-125"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="text-white hover:text-primary transition-all hover:scale-125"><Youtube className="w-5 h-5" /></a>
            </div>
          </div>
          
          <div className="pt-12 border-t border-white/10 flex flex-col lg:flex-row justify-between items-center gap-8">
            <p className="text-slate-500 text-[10px] uppercase font-black tracking-[0.3em]">
              © 2026 ALL STARS BATTLE INTERNATIONAL. TOUS DROITS RÉSERVÉS.
            </p>
            <div className="flex space-x-12 text-[10px] uppercase font-black tracking-[0.3em] text-slate-500">
              <a href="#" onClick={navigateTo('admin')} className="hover:text-primary transition-colors">Administration</a>
              <a href="#" className="hover:text-primary transition-colors">Mentions Légales</a>
              <a href="#" className="hover:text-primary transition-colors">Confidentialité</a>
              <a href="#" className="hover:text-primary transition-colors">Presse</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
