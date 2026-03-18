import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  FileText, 
  Trophy, 
  Ticket, 
  History, 
  Handshake, 
  Settings, 
  LogOut,
  Plus,
  Trash2,
  Edit,
  Save,
  Image as ImageIcon,
  Search,
  ChevronRight,
  Menu,
  X,
  Palette
} from 'lucide-react';
import { cmsService } from '../services/cmsService';
import { CMSData } from '../types';
import { motion, AnimatePresence } from 'motion/react';

// Modules
import DashboardOverview from './modules/DashboardOverview';
import SceneArtistique from './modules/SceneArtistique';
import ParticipantsJury from './modules/ParticipantsJury';
import ProgramPlanning from './modules/ProgramPlanning';
import BlogNews from './modules/BlogNews';
import CompetitionBrackets from './modules/CompetitionBrackets';
import TicketingFAQ from './modules/TicketingFAQ';
import HistoryLegends from './modules/HistoryLegends';
import PartnersMedia from './modules/PartnersMedia';
import MediaArchives from './modules/MediaArchives';
import GlobalConfigSEO from './modules/GlobalConfigSEO';
import HomepageContent from './modules/HomepageContent';
import ThemeSettings from './modules/ThemeSettings';

type ModuleId = 
  | 'dashboard' 
  | 'scene' 
  | 'participants' 
  | 'program' 
  | 'blog' 
  | 'competition' 
  | 'ticketing' 
  | 'history' 
  | 'partners' 
  | 'media'
  | 'config'
  | 'homepage'
  | 'theme';

export default function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [activeModule, setActiveModule] = useState<ModuleId>('dashboard');
  const [data, setData] = useState<CMSData>(cmsService.getData());
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    cmsService.saveData(data);
  }, [data]);

  const menuItems = [
    { id: 'dashboard', label: 'Tableau de Bord', icon: LayoutDashboard },
    { id: 'homepage', label: 'Contenu Accueil (Page)', icon: Palette },
    { id: 'scene', label: 'Scène Artistique', icon: Palette },
    { id: 'participants', label: 'Participants & Jury', icon: Users },
    { id: 'program', label: 'Programme & Planning', icon: Calendar },
    { id: 'blog', label: 'Blog & Actualités', icon: FileText },
    { id: 'competition', label: 'Compétition & Brackets', icon: Trophy },
    { id: 'ticketing', label: 'Billetterie & FAQ', icon: Ticket },
    { id: 'history', label: 'Histoire & Légendes', icon: History },
    { id: 'media', label: 'Galerie & Archives Média', icon: ImageIcon },
    { id: 'partners', label: 'Partenaires', icon: Handshake },
    { id: 'config', label: 'Configuration & SEO', icon: Settings },
    { id: 'theme', label: 'Paramètres du Thème', icon: Palette },
  ];

  const renderModule = () => {
    switch (activeModule) {
      case 'dashboard': return <DashboardOverview data={data} />;
      case 'homepage': return <HomepageContent data={data} setData={setData} />;
      case 'scene': return <SceneArtistique data={data} setData={setData} />;
      case 'participants': return <ParticipantsJury data={data} setData={setData} />;
      case 'program': return <ProgramPlanning data={data} setData={setData} />;
      case 'blog': return <BlogNews data={data} setData={setData} />;
      case 'competition': return <CompetitionBrackets data={data} setData={setData} />;
      case 'ticketing': return <TicketingFAQ data={data} setData={setData} />;
      case 'history': return <HistoryLegends data={data} setData={setData} />;
      case 'media': return <MediaArchives data={data} setData={setData} />;
      case 'partners': return <PartnersMedia data={data} setData={setData} />;
      case 'config': return <GlobalConfigSEO data={data} setData={setData} />;
      case 'theme': return <ThemeSettings data={data} setData={setData} />;
      default: return <DashboardOverview data={data} />;
    }
  };

  return (
    <div className="flex h-screen bg-[#0a0a0a] text-white font-sans overflow-hidden">
      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 80 }}
        className="bg-[#111] border-r border-white/5 flex flex-col z-50"
      >
        <div className="p-6 flex items-center justify-between">
          {isSidebarOpen && (
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-primary flex items-center justify-center font-heading text-xl text-background-dark font-bold">AS</div>
              <span className="font-heading text-lg tracking-tighter text-white">ADMIN</span>
            </div>
          )}
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-white/5 rounded-lg transition-colors"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto custom-scrollbar">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveModule(item.id as ModuleId)}
              className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all duration-300 ${
                activeModule === item.id 
                  ? 'bg-primary text-background-dark font-bold shadow-[0_0_20px_rgba(211,95,23,0.3)]' 
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon size={20} className={activeModule === item.id ? 'text-background-dark' : ''} />
              {isSidebarOpen && <span className="text-sm truncate">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5">
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-4 p-3 rounded-xl text-accent-red hover:bg-accent-red/10 transition-all"
          >
            <LogOut size={20} />
            {isSidebarOpen && <span className="text-sm font-bold">Déconnexion</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Header */}
        <header className="h-16 border-b border-white/5 flex items-center justify-between px-8 bg-[#111]/50 backdrop-blur-md">
          <h2 className="text-lg font-heading tracking-widest uppercase">
            {menuItems.find(m => m.id === activeModule)?.label}
          </h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Live Sync</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center text-primary font-bold text-xs">
              ZH
            </div>
          </div>
        </header>

        {/* Module Content */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeModule}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderModule()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
