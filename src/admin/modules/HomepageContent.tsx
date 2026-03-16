import React from 'react';
import { CMSData, ProgramDay, Activity } from '../../types';
import { Layout, Users, Music, Crown, Image, Newspaper, BookOpen, Trash2, Plus } from 'lucide-react';



export default function HomepageContent({ data, setData }: { data: CMSData, setData: React.Dispatch<React.SetStateAction<CMSData>> }) {
  
  const updateSection = (section: string, field: string, value: string) => {
    setData(prev => ({
      ...prev,
      globalConfig: {
        ...prev.globalConfig,
        [section]: { ...prev.globalConfig[section as keyof typeof prev.globalConfig], [field]: value }
      }
    }));
  };

  const updateStat = (index: number, field: 'label' | 'value', value: string) => {
    const newStats = [...data.globalConfig.stats];
    newStats[index] = { ...newStats[index], [field]: value };
    setData(prev => ({
      ...prev,
      globalConfig: {
        ...prev.globalConfig,
        stats: newStats
      }
    }));
  };

  const updateProgramDay = (dayIndex: number, field: 'label' | 'date', value: string) => {
    const newProgram = [...data.program];
    newProgram[dayIndex] = { ...newProgram[dayIndex], [field]: value };
    setData(prev => ({
      ...prev,
      program: newProgram
    }));
  };

  const updateActivity = (dayIndex: number, activityIndex: number, field: string, value: string) => {
    const newProgram = [...data.program];
    newProgram[dayIndex].activities[activityIndex] = {
      ...newProgram[dayIndex].activities[activityIndex],
      [field]: value
    } as Activity;
    setData(prev => ({
      ...prev,
      program: newProgram
    }));
  };

  const addActivity = (dayIndex: number) => {
    const newProgram = [...data.program];
    const newActivity: Activity = {
      id: Date.now().toString(),
      time: '00:00 - 00:00',
      title: 'Nouvelle Activité',
      location: 'Location',
      description: 'Description',
      category: 'other'
    };
    newProgram[dayIndex].activities.push(newActivity);
    setData(prev => ({
      ...prev,
      program: newProgram
    }));
  };

  const removeActivity = (dayIndex: number, activityIndex: number) => {
    const newProgram = [...data.program];
    newProgram[dayIndex].activities.splice(activityIndex, 1);
    setData(prev => ({
      ...prev,
      program: newProgram
    }));
  };

  return (
    <div className="space-y-12">
      {/* Dancers Section */}
      <div className="bg-[#111] border border-white/10 p-8 rounded-2xl space-y-6">
        <h4 className="font-heading text-lg flex items-center gap-2"><Users size={20} className="text-primary" /> Section LES DANSEURS</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Sous-titre</label>
            <input 
              type="text" 
              value={data.globalConfig.dancers.sectionSubtitle} 
              onChange={e => updateSection('dancers', 'sectionSubtitle', e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-primary outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Titre de la Section</label>
            <input 
              type="text" 
              value={data.globalConfig.dancers.sectionTitle} 
              onChange={e => updateSection('dancers', 'sectionTitle', e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-primary outline-none transition-all"
            />
          </div>
        </div>
      </div>

      {/* Programmation Section */}
      <div className="bg-[#111] border border-white/10 p-8 rounded-2xl space-y-6">
        <h4 className="font-heading text-lg flex items-center gap-2"><Music size={20} className="text-primary" /> Section PROGRAMMATION</h4>
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Titre de la Section</label>
          <input 
            type="text" 
            value={data.globalConfig.programmation.sectionTitle} 
            onChange={e => updateSection('programmation', 'sectionTitle', e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-primary outline-none transition-all"
          />
        </div>
      </div>

      {/* Program Details */}
      <div className="bg-[#111] border border-white/10 p-8 rounded-2xl space-y-8">
        <h4 className="font-heading text-lg flex items-center gap-2"><Music size={20} className="text-primary" /> DÉTAILS DU PROGRAMME COMPLET</h4>
        
        {data.program.map((day, dayIndex) => (
          <div key={day.id} className="bg-white/5 border border-white/10 p-6 rounded-xl space-y-6">
            {/* Day Header */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4 border-b border-white/10">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Libellé du Jour (ex: JOUR 01)</label>
                <input 
                  type="text" 
                  value={day.label} 
                  onChange={e => updateProgramDay(dayIndex, 'label', e.target.value)}
                  className="w-full bg-background-dark border border-white/10 rounded-lg p-2 text-sm outline-none focus:border-primary transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Date (AAAA-MM-JJ)</label>
                <input 
                  type="date" 
                  value={day.date} 
                  onChange={e => updateProgramDay(dayIndex, 'date', e.target.value)}
                  className="w-full bg-background-dark border border-white/10 rounded-lg p-2 text-sm outline-none focus:border-primary transition-all"
                />
              </div>
            </div>

            {/* Activities */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h5 className="text-sm font-bold text-white">Activités du {day.label}</h5>
                <button 
                  onClick={() => addActivity(dayIndex)}
                  className="flex items-center gap-1 text-xs bg-primary/20 hover:bg-primary/40 text-primary rounded-lg px-3 py-1 transition-all"
                >
                  <Plus size={14} /> Ajouter Activité
                </button>
              </div>

              {/* Bloc spécial si plus de 3 activités */}
              {day.activities.length > 3 && (
                <div className="bg-primary/10 border border-primary/30 rounded-xl p-6 mb-4 flex flex-col gap-4">
                  <div>
                    <div className="font-bold text-lg text-primary">10:00 - 16:00 Masterclasses Internationales</div>
                    <div className="text-white/80 text-sm mb-2">Apprentissage technique avec les légendes.</div>
                  </div>
                  <div>
                    <div className="font-bold text-lg text-primary">16:00 - 19:00 Maonales YAFFOY</div>
                    <div className="text-white/80 text-sm mb-2">1890329399 EJKZEJK FFF</div>
                  </div>
                  <a
                    href={`/admin/Program#jour${dayIndex + 1}`}
                    className="inline-flex items-center gap-2 self-end px-4 py-2 bg-primary text-white rounded-lg font-bold hover:bg-primary/80 transition-colors"
                    title="Voir le programme détaillé de ce jour"
                  >
                    Détail du jour
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                  </a>
                </div>
              )}
              {/* Liste des activités */}
              {day.activities.map((activity, actIdx) => (
                <div key={activity.id} className="bg-background-dark p-4 rounded-lg space-y-3 border border-white/5">
                  <div className="flex justify-between items-start">
                    <div className="flex-1 space-y-3">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        <div className="space-y-1">
                          <label className="text-[8px] font-bold uppercase tracking-widest text-slate-600">Heure</label>
                          <input 
                            type="text" 
                            value={activity.time} 
                            onChange={e => updateActivity(dayIndex, actIdx, 'time', e.target.value)}
                            placeholder="10:00 - 16:00"
                            className="w-full bg-white/5 border border-white/10 rounded p-2 text-xs outline-none focus:border-primary transition-all"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[8px] font-bold uppercase tracking-widest text-slate-600">Catégorie</label>
                          <select 
                            value={activity.category} 
                            onChange={e => updateActivity(dayIndex, actIdx, 'category', e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded p-2 text-xs outline-none focus:border-primary transition-all"
                          >
                            <option value="workshop">Workshop</option>
                            <option value="battle">Battle</option>
                            <option value="after-party">After-Party</option>
                            <option value="other">Autre</option>
                          </select>
                        </div>
                        <div className="space-y-1">
                          <label className="text-[8px] font-bold uppercase tracking-widest text-slate-600">Lieu</label>
                          <input 
                            type="text" 
                            value={activity.location} 
                            onChange={e => updateActivity(dayIndex, actIdx, 'location', e.target.value)}
                            placeholder="Studio A"
                            className="w-full bg-white/5 border border-white/10 rounded p-2 text-xs outline-none focus:border-primary transition-all"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[8px] font-bold uppercase tracking-widest text-slate-600">Titre de l'Activité</label>
                        <input 
                          type="text" 
                          value={activity.title} 
                          onChange={e => updateActivity(dayIndex, actIdx, 'title', e.target.value)}
                          placeholder="Masterclasses Internationales"
                          className="w-full bg-white/5 border border-white/10 rounded p-2 text-xs outline-none focus:border-primary transition-all"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[8px] font-bold uppercase tracking-widest text-slate-600">Description</label>
                        <textarea 
                          rows={2}
                          value={activity.description} 
                          onChange={e => updateActivity(dayIndex, actIdx, 'description', e.target.value)}
                          placeholder="Description détaillée..."
                          className="w-full bg-white/5 border border-white/10 rounded p-2 text-xs outline-none focus:border-primary transition-all resize-none"
                        />
                      </div>
                    </div>
                    <button 
                      onClick={() => removeActivity(dayIndex, actIdx)}
                      className="ml-3 text-accent-red hover:text-accent-red/80 transition-colors flex-shrink-0 p-2 hover:bg-accent-red/10 rounded"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* VIP Section */}
      <div className="bg-[#111] border border-white/10 p-8 rounded-2xl space-y-6">
        <h4 className="font-heading text-lg flex items-center gap-2"><Crown size={20} className="text-primary" /> Section EXPERIENCE VIP</h4>
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Titre de la Section</label>
          <input 
            type="text" 
            value={data.globalConfig.vip.sectionTitle} 
            onChange={e => updateSection('vip', 'sectionTitle', e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-primary outline-none transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Description</label>
          <textarea 
            rows={3}
            value={data.globalConfig.vip.sectionDescription} 
            onChange={e => updateSection('vip', 'sectionDescription', e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-primary outline-none transition-all resize-none"
          />
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-[#111] border border-white/10 p-8 rounded-2xl space-y-6">
        <h4 className="font-heading text-lg flex items-center gap-2"><Image size={20} className="text-primary" /> Statistiques Clés (Section Compétition)</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.globalConfig.stats.map((stat, idx) => (
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

      {/* Partners Section */}
      <div className="bg-[#111] border border-white/10 p-8 rounded-2xl space-y-6">
        <h4 className="font-heading text-lg flex items-center gap-2"><Layout size={20} className="text-primary" /> Section PARTENAIRES & SPONSORS</h4>
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Titre de la Section</label>
          <input 
            type="text" 
            value={data.globalConfig.partners.sectionTitle} 
            onChange={e => updateSection('partners', 'sectionTitle', e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-primary outline-none transition-all"
          />
        </div>
      </div>

      {/* Blog Section */}
      <div className="bg-[#111] border border-white/10 p-8 rounded-2xl space-y-6">
        <h4 className="font-heading text-lg flex items-center gap-2"><Newspaper size={20} className="text-primary" /> Section ACTUALITÉS & NEWS</h4>
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Titre de la Section</label>
          <input 
            type="text" 
            value={data.globalConfig.blog.sectionTitle} 
            onChange={e => updateSection('blog', 'sectionTitle', e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-primary outline-none transition-all"
          />
        </div>
      </div>

      {/* Footer Section */}
      <div className="bg-[#111] border border-white/10 p-8 rounded-2xl space-y-6">
        <h4 className="font-heading text-lg flex items-center gap-2"><BookOpen size={20} className="text-primary" /> FOOTER</h4>
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Description Footer</label>
          <textarea 
            rows={3}
            value={data.globalConfig.footer.description} 
            onChange={e => updateSection('footer', 'description', e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-primary outline-none transition-all resize-none"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Texte Copyright</label>
          <input 
            type="text" 
            value={data.globalConfig.footer.copyright} 
            onChange={e => updateSection('footer', 'copyright', e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-primary outline-none transition-all"
          />
        </div>
      </div>
    </div>
  );
}
