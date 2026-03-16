import React from 'react';
import { CMSData } from '../../types';
import { Layout, Users, Calendar, Star } from 'lucide-react';

export default function HomepageContent({ data, setData }: { data: CMSData, setData: React.Dispatch<React.SetStateAction<CMSData>> }) {
  const updateCompetition = (field: string, value: string) => {
    setData(prev => ({
      ...prev,
      globalConfig: {
        ...prev.globalConfig,
        competition: { ...prev.globalConfig.competition, [field]: value }
      }
    }));
  };

  const updateDancers = (field: string, value: string) => {
    setData(prev => ({
      ...prev,
      globalConfig: {
        ...prev.globalConfig,
        dancers: { ...prev.globalConfig.dancers, [field]: value }
      }
    }));
  };

  const updateProgrammation = (field: string, value: string) => {
    setData(prev => ({
      ...prev,
      globalConfig: {
        ...prev.globalConfig,
        programmation: { ...prev.globalConfig.programmation, [field]: value }
      }
    }));
  };

  const updateVip = (field: string, value: string) => {
    setData(prev => ({
      ...prev,
      globalConfig: {
        ...prev.globalConfig,
        vip: { ...prev.globalConfig.vip, [field]: value }
      }
    }));
  };

  return (
    <div className="space-y-12">
      {/* Competition Section */}
      <div className="bg-[#111] border border-white/10 p-8 rounded-2xl space-y-6">
        <h4 className="font-heading text-lg flex items-center gap-2"><Layout size={20} className="text-primary" /> Section Compétition</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Dates (ex: 14 - 16 AOÛT 2026)</label>
            <input 
              type="text" 
              value={data.globalConfig.competition.dateStart} 
              onChange={e => updateCompetition('dateStart', e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-primary outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Lieu</label>
            <input 
              type="text" 
              value={data.globalConfig.competition.location} 
              onChange={e => updateCompetition('location', e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-primary outline-none transition-all"
            />
          </div>
          <div className="md:col-span-2 space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Description</label>
            <textarea 
              rows={4}
              value={data.globalConfig.competition.description} 
              onChange={e => updateCompetition('description', e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-primary outline-none transition-all resize-none"
            />
          </div>
        </div>
      </div>

      {/* Dancers Section */}
      <div className="bg-[#111] border border-white/10 p-8 rounded-2xl space-y-6">
        <h4 className="font-heading text-lg flex items-center gap-2"><Users size={20} className="text-primary" /> Section Danseurs</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Titre de la Section</label>
            <input 
              type="text" 
              value={data.globalConfig.dancers.sectionTitle} 
              onChange={e => updateDancers('sectionTitle', e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-primary outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Sous-titre (Tag)</label>
            <input 
              type="text" 
              value={data.globalConfig.dancers.sectionSubtitle} 
              onChange={e => updateDancers('sectionSubtitle', e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-primary outline-none transition-all"
            />
          </div>
        </div>
      </div>

      {/* Programmation Section */}
      <div className="bg-[#111] border border-white/10 p-8 rounded-2xl space-y-6">
        <h4 className="font-heading text-lg flex items-center gap-2"><Calendar size={20} className="text-primary" /> Section Programmation</h4>
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Titre de la Section</label>
          <input 
            type="text" 
            value={data.globalConfig.programmation.sectionTitle} 
            onChange={e => updateProgrammation('sectionTitle', e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-primary outline-none transition-all"
          />
        </div>
      </div>

      {/* VIP Section */}
      <div className="bg-[#111] border border-white/10 p-8 rounded-2xl space-y-6">
        <h4 className="font-heading text-lg flex items-center gap-2"><Star size={20} className="text-primary" /> Section VIP</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Titre de la Section</label>
            <input 
              type="text" 
              value={data.globalConfig.vip.sectionTitle} 
              onChange={e => updateVip('sectionTitle', e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-primary outline-none transition-all"
            />
          </div>
          <div className="md:col-span-2 space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Description VIP</label>
            <textarea 
              rows={3}
              value={data.globalConfig.vip.sectionSubtitle} 
              onChange={e => updateVip('sectionSubtitle', e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-primary outline-none transition-all resize-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
