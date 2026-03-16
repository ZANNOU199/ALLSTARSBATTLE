import React from 'react';
import { CMSData } from '../../types';
import { Globe, Mail, Phone, MapPin, TrendingUp, Layout } from 'lucide-react';

export default function GlobalConfigSEO({ data, setData }: { data: CMSData, setData: React.Dispatch<React.SetStateAction<CMSData>> }) {
  const updateContact = (field: string, value: string) => {
    setData(prev => ({
      ...prev,
      globalConfig: {
        ...prev.globalConfig,
        contact: { ...prev.globalConfig.contact, [field]: value }
      }
    }));
  };

  const updateSEO = (field: string, value: string) => {
    setData(prev => ({
      ...prev,
      globalConfig: {
        ...prev.globalConfig,
        seo: { ...prev.globalConfig.seo, [field]: value }
      }
    }));
  };

  const updateHero = (field: string, value: string) => {
    setData(prev => ({
      ...prev,
      globalConfig: {
        ...prev.globalConfig,
        hero: { ...prev.globalConfig.hero, [field]: value }
      }
    }));
  };

  const updateStat = (index: number, field: 'label' | 'value', value: string) => {
    const newStats = [...data.globalConfig.homepageStats];
    newStats[index] = { ...newStats[index], [field]: value };
    setData(prev => ({
      ...prev,
      globalConfig: {
        ...prev.globalConfig,
        homepageStats: newStats
      }
    }));
  };

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="bg-[#111] border border-white/10 p-8 rounded-2xl space-y-6">
        <h4 className="font-heading text-lg flex items-center gap-2"><Layout size={20} className="text-primary" /> Hero Section (Accueil)</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Titre Principal</label>
            <input 
              type="text" 
              value={data.globalConfig.hero.title} 
              onChange={e => updateHero('title', e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-primary outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Sous-titre / Accroche</label>
            <input 
              type="text" 
              value={data.globalConfig.hero.subtitle} 
              onChange={e => updateHero('subtitle', e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-primary outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Image de Fond (URL)</label>
            <input 
              type="text" 
              value={data.globalConfig.hero.backgroundImage} 
              onChange={e => updateHero('backgroundImage', e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-primary outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Vidéo de Fond (URL)</label>
            <input 
              type="text" 
              value={data.globalConfig.hero.videoUrl} 
              onChange={e => updateHero('videoUrl', e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-primary outline-none transition-all"
            />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-[#111] border border-white/10 p-8 rounded-2xl space-y-6">
        <h4 className="font-heading text-lg flex items-center gap-2"><TrendingUp size={20} className="text-primary" /> Statistiques Clés</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.globalConfig.homepageStats.map((stat, idx) => (
            <div key={idx} className="space-y-4 p-4 bg-white/5 rounded-xl border border-white/5">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Libellé</label>
                <input 
                  type="text" 
                  value={stat.label} 
                  onChange={e => updateStat(idx, 'label', e.target.value)}
                  className="w-full bg-background-dark border border-white/10 rounded-lg p-2 text-xs outline-none focus:border-primary transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Valeur</label>
                <input 
                  type="text" 
                  value={stat.value} 
                  onChange={e => updateStat(idx, 'value', e.target.value)}
                  className="w-full bg-background-dark border border-white/10 rounded-lg p-2 text-xl font-heading text-primary outline-none focus:border-primary transition-all"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Info */}
        <div className="bg-[#111] border border-white/10 p-8 rounded-2xl space-y-6">
          <h4 className="font-heading text-lg flex items-center gap-2"><Mail size={20} className="text-primary" /> Informations de Contact</h4>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Email</label>
              <input 
                type="email" 
                value={data.globalConfig.contact.email} 
                onChange={e => updateContact('email', e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-primary outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Téléphone</label>
              <input 
                type="text" 
                value={data.globalConfig.contact.phone} 
                onChange={e => updateContact('phone', e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-primary outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Adresse</label>
              <input 
                type="text" 
                value={data.globalConfig.contact.address} 
                onChange={e => updateContact('address', e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-primary outline-none transition-all"
              />
            </div>
          </div>
        </div>

        {/* SEO Config */}
        <div className="bg-[#111] border border-white/10 p-8 rounded-2xl space-y-6">
          <h4 className="font-heading text-lg flex items-center gap-2"><Globe size={20} className="text-primary" /> SEO & Référencement</h4>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Titre du Site (Google)</label>
              <input 
                type="text" 
                value={data.globalConfig.seo.title} 
                onChange={e => updateSEO('title', e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-primary outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Description Meta</label>
              <textarea 
                rows={3}
                value={data.globalConfig.seo.description} 
                onChange={e => updateSEO('description', e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-primary outline-none transition-all resize-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Mots-clés (séparés par des virgules)</label>
              <input 
                type="text" 
                value={data.globalConfig.seo.keywords} 
                onChange={e => updateSEO('keywords', e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-primary outline-none transition-all"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
