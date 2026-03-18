import React, { useState } from 'react';
import { CMSData, TimelineEvent, Legend } from '../../types';
import { Plus, Trash2, Edit, Save, X, History, User } from 'lucide-react';

export default function HistoryLegends({ data, setData }: { data: CMSData, setData: React.Dispatch<React.SetStateAction<CMSData>> }) {
  const [activeTab, setActiveTab] = useState<'timeline' | 'legends' | 'config'>('timeline');
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [timelineFormData, setTimelineFormData] = useState<Partial<TimelineEvent>>({});
  const [legendFormData, setLegendFormData] = useState<Partial<Legend>>({});
  const [configFormData, setConfigFormData] = useState({
    hero: data.history.hero || {
      sinceYear: '2013',
      totalEditions: '12',
      title: 'L\'HISTOIRE',
      titleHighlight: 'DE ALLSTARBATTLE',
      description: 'Tracing the evolution of urban-luxury breakdance from Genesis to the Global Stage.'
    },
    stats: data.history.stats || {
      years: '13',
      editions: '12',
      countries: '45+',
      participants: '500+',
      prize: '10M'
    },
    wallOfFame: data.history.wallOfFame || {
      title: 'WALL OF FAME',
      subtitle: 'The Legends Who Defined ASBI'
    }
  });

  const handleAddTimeline = () => {
    const newEvent: TimelineEvent = {
      id: Date.now().toString(),
      year: timelineFormData.year || '',
      title: timelineFormData.title || '',
      champion: timelineFormData.champion || '',
      description: timelineFormData.description || '',
      image: timelineFormData.image || 'https://picsum.photos/seed/hist/800/600'
    };
    setData(prev => ({ ...prev, history: { ...prev.history, timeline: [...prev.history.timeline, newEvent] } }));
    setIsAdding(false);
    setTimelineFormData({});
  };

  const handleAddLegend = () => {
    const newLegend: Legend = {
      id: Date.now().toString(),
      name: legendFormData.name || '',
      bio: legendFormData.bio || '',
      photo: legendFormData.photo || 'https://picsum.photos/seed/legend/400/600',
      title: legendFormData.title || '',
      category: legendFormData.category as 'bboy' | 'bgirl' | 'crew' | undefined || 'bboy',
      year: legendFormData.year || new Date().getFullYear(),
      type: legendFormData.type as 'champion-1v1' | 'footwork' | 'powermoves' | 'last-chance' | 'crew-vs-crew' | '2v2' | undefined
    };
    setData(prev => ({ ...prev, history: { ...prev.history, legends: [...prev.history.legends, newLegend] } }));
    setIsAdding(false);
    setLegendFormData({});
  };

  const handleEditLegend = () => {
    if (!editingId) return;
    setData(prev => ({
      ...prev,
      history: {
        ...prev.history,
        legends: prev.history.legends.map(l =>
          l.id === editingId ? { ...l, ...legendFormData } : l
        )
      }
    }));
    setEditingId(null);
    setLegendFormData({});
  };

  const startEdit = (legend: Legend) => {
    setEditingId(legend.id);
    setLegendFormData(legend);
    setIsAdding(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex gap-4 border-b border-white/5 pb-4">
        <button 
          onClick={() => { setActiveTab('timeline'); setIsAdding(false); setEditingId(null); }}
          className={`px-6 py-2 text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'timeline' ? 'text-primary border-b-2 border-primary' : 'text-slate-500 hover:text-white'}`}
        >
          Timeline Historique
        </button>
        <button 
          onClick={() => { setActiveTab('legends'); setIsAdding(false); setEditingId(null); }}
          className={`px-6 py-2 text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'legends' ? 'text-primary border-b-2 border-primary' : 'text-slate-500 hover:text-white'}`}
        >
          Légendes de la Danse
        </button>
        <button 
          onClick={() => { setActiveTab('config'); setIsAdding(false); setEditingId(null); }}
          className={`px-6 py-2 text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'config' ? 'text-primary border-b-2 border-primary' : 'text-slate-500 hover:text-white'}`}
        >
          Configuration Histoire
        </button>
      </div>

      {activeTab === 'timeline' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h4 className="font-heading text-lg flex items-center gap-2"><History size={20} className="text-primary" /> Événements Historiques</h4>
            <button onClick={() => setIsAdding(true)} className="flex items-center gap-2 px-4 py-2 bg-primary text-background-dark font-bold rounded-xl"><Plus size={18} /> Ajouter une Année</button>
          </div>

          {isAdding && (
            <div className="bg-[#111] border border-white/10 p-8 rounded-2xl space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Année</label>
                  <input 
                    type="text" 
                    value={timelineFormData.year || ''} 
                    onChange={e => setTimelineFormData({ ...timelineFormData, year: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-primary outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Champion</label>
                  <input 
                    type="text" 
                    value={timelineFormData.champion || ''} 
                    onChange={e => setTimelineFormData({ ...timelineFormData, champion: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-primary outline-none transition-all"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Description</label>
                  <textarea 
                    rows={3}
                    value={timelineFormData.description || ''} 
                    onChange={e => setTimelineFormData({ ...timelineFormData, description: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-primary outline-none transition-all resize-none"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-4">
                <button onClick={() => setIsAdding(false)} className="px-6 py-2 text-xs font-bold uppercase tracking-widest text-slate-500">Annuler</button>
                <button onClick={handleAddTimeline} className="px-6 py-2 bg-primary text-background-dark rounded-xl font-bold text-xs uppercase tracking-widest">Enregistrer</button>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {data.history.timeline.map(event => (
              <div key={event.id} className="bg-[#111] border border-white/5 p-6 rounded-2xl flex items-center gap-6 group hover:border-white/10 transition-all">
                <div className="text-4xl font-heading text-primary w-24 shrink-0">{event.year}</div>
                <div className="flex-1">
                  <h5 className="font-bold text-white text-lg">{event.champion}</h5>
                  <p className="text-sm text-slate-400 mt-1">{event.description}</p>
                </div>
                <button 
                  onClick={() => setData(prev => ({ ...prev, history: { ...prev.history, timeline: prev.history.timeline.filter(e => e.id !== event.id) } }))}
                  className="p-2 text-slate-500 hover:text-accent-red transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'legends' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h4 className="font-heading text-lg flex items-center gap-2"><User size={20} className="text-primary" /> Icônes de la Danse</h4>
            {!editingId && <button onClick={() => { setIsAdding(true); setLegendFormData({}); }} className="flex items-center gap-2 px-4 py-2 bg-primary text-background-dark font-bold rounded-xl"><Plus size={18} /> Ajouter une Légende</button>}
          </div>

          {(isAdding || editingId) && (
            <div className="bg-[#111] border border-white/10 p-8 rounded-2xl space-y-6">
              <div className="flex justify-between items-center mb-4">
                <h5 className="font-bold text-white">{editingId ? 'Modifier la Légende' : 'Ajouter une Nouvelle Légende'}</h5>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Nom</label>
                  <input 
                    type="text" 
                    value={legendFormData.name || ''} 
                    onChange={e => setLegendFormData({ ...legendFormData, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-primary outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Année</label>
                  <select 
                    value={legendFormData.year || new Date().getFullYear()} 
                    onChange={e => setLegendFormData({ ...legendFormData, year: parseInt(e.target.value) })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-primary outline-none transition-all text-white"
                  >
                    {Array.from({ length: new Date().getFullYear() - 2013 }, (_, i) => 2014 + i).reverse().map(year => (
                      <option key={year} value={year} className="bg-background-dark">{year}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Type de Compétition</label>
                  <select 
                    value={legendFormData.type || 'champion-1v1'} 
                    onChange={e => setLegendFormData({ ...legendFormData, type: e.target.value as any })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-primary outline-none transition-all text-white"
                  >
                    <option value="champion-1v1" className="bg-background-dark">CHAMPION 1VS1</option>
                    <option value="footwork" className="bg-background-dark">Footwork</option>
                    <option value="powermoves" className="bg-background-dark">Powermoves</option>
                    <option value="last-chance" className="bg-background-dark">Last Chance</option>
                    <option value="crew-vs-crew" className="bg-background-dark">CREW VS CREW</option>
                    <option value="2v2" className="bg-background-dark">2 VS 2</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Catégorie</label>
                  <select 
                    value={legendFormData.category || 'bboy'} 
                    onChange={e => setLegendFormData({ ...legendFormData, category: e.target.value as 'bboy' | 'bgirl' | 'crew' })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-primary outline-none transition-all text-white"
                  >
                    <option value="bboy" className="bg-background-dark">B-Boy</option>
                    <option value="bgirl" className="bg-background-dark">B-Girl</option>
                    <option value="crew" className="bg-background-dark">Crew</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Photo (URL)</label>
                  <input 
                    type="text" 
                    value={legendFormData.photo || ''} 
                    onChange={e => setLegendFormData({ ...legendFormData, photo: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-primary outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Titre (Champion)</label>
                  <input 
                    type="text" 
                    placeholder="ex: B-Boy Champion 2023"
                    value={legendFormData.title || ''} 
                    onChange={e => setLegendFormData({ ...legendFormData, title: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-primary outline-none transition-all"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Bio</label>
                  <textarea 
                    rows={3}
                    value={legendFormData.bio || ''} 
                    onChange={e => setLegendFormData({ ...legendFormData, bio: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-primary outline-none transition-all resize-none"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-4">
                <button onClick={() => { setIsAdding(false); setEditingId(null); setLegendFormData({}); }} className="px-6 py-2 text-xs font-bold uppercase tracking-widest text-slate-500">Annuler</button>
                <button onClick={editingId ? handleEditLegend : handleAddLegend} className="px-6 py-2 bg-primary text-background-dark rounded-xl font-bold text-xs uppercase tracking-widest">{editingId ? 'Mettre à Jour' : 'Enregistrer'}</button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.history.legends.map(legend => (
              <div key={legend.id} className="bg-[#111] border border-white/5 p-6 rounded-2xl group hover:border-white/10 transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-zinc-800 border-2 border-primary/20">
                    <img src={legend.photo} alt={legend.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => startEdit(legend)}
                      className="p-2 text-slate-500 hover:text-primary transition-colors"
                    >
                      <Edit size={16} />
                    </button>
                    <button 
                      onClick={() => setData(prev => ({ ...prev, history: { ...prev.history, legends: prev.history.legends.filter(l => l.id !== legend.id) } }))}
                      className="p-2 text-slate-500 hover:text-accent-red transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <h5 className="font-bold text-white">{legend.name}</h5>
                <p className="text-xs text-slate-400 mt-2 line-clamp-3">{legend.bio}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'config' && (
        <div className="space-y-6">
          <div>
            <h4 className="font-heading text-lg mb-6">Section Héro de la Page Histoire</h4>
            <div className="bg-[#111] border border-white/10 p-8 rounded-2xl space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Depuis Année</label>
                  <input 
                    type="text" 
                    value={configFormData.hero.sinceYear} 
                    onChange={e => setConfigFormData({ ...configFormData, hero: { ...configFormData.hero, sinceYear: e.target.value } })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-primary outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Total Éditions</label>
                  <input 
                    type="text" 
                    value={configFormData.hero.totalEditions} 
                    onChange={e => setConfigFormData({ ...configFormData, hero: { ...configFormData.hero, totalEditions: e.target.value } })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-primary outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Titre Principal</label>
                  <input 
                    type="text" 
                    value={configFormData.hero.title} 
                    onChange={e => setConfigFormData({ ...configFormData, hero: { ...configFormData.hero, title: e.target.value } })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-primary outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Titre Surligne</label>
                  <input 
                    type="text" 
                    value={configFormData.hero.titleHighlight} 
                    onChange={e => setConfigFormData({ ...configFormData, hero: { ...configFormData.hero, titleHighlight: e.target.value } })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-primary outline-none transition-all"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Description</label>
                  <textarea 
                    rows={2}
                    value={configFormData.hero.description} 
                    onChange={e => setConfigFormData({ ...configFormData, hero: { ...configFormData.hero, description: e.target.value } })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-primary outline-none transition-all resize-none"
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-heading text-lg mb-6">Statistiques Globales</h4>
            <div className="bg-[#111] border border-white/10 p-8 rounded-2xl space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Années</label>
                  <input 
                    type="text" 
                    value={configFormData.stats.years} 
                    onChange={e => setConfigFormData({ ...configFormData, stats: { ...configFormData.stats, years: e.target.value } })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-primary outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Éditions</label>
                  <input 
                    type="text" 
                    value={configFormData.stats.editions} 
                    onChange={e => setConfigFormData({ ...configFormData, stats: { ...configFormData.stats, editions: e.target.value } })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-primary outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Pays</label>
                  <input 
                    type="text" 
                    value={configFormData.stats.countries} 
                    onChange={e => setConfigFormData({ ...configFormData, stats: { ...configFormData.stats, countries: e.target.value } })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-primary outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Participants</label>
                  <input 
                    type="text" 
                    value={configFormData.stats.participants} 
                    onChange={e => setConfigFormData({ ...configFormData, stats: { ...configFormData.stats, participants: e.target.value } })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-primary outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Prix</label>
                  <input 
                    type="text" 
                    value={configFormData.stats.prize} 
                    onChange={e => setConfigFormData({ ...configFormData, stats: { ...configFormData.stats, prize: e.target.value } })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-primary outline-none transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-heading text-lg mb-6">Configuration Wall of Fame</h4>
            <div className="bg-[#111] border border-white/10 p-8 rounded-2xl space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Titre</label>
                  <input 
                    type="text" 
                    value={configFormData.wallOfFame.title} 
                    onChange={e => setConfigFormData({ ...configFormData, wallOfFame: { ...configFormData.wallOfFame, title: e.target.value } })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-primary outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Sous-titre</label>
                  <input 
                    type="text" 
                    value={configFormData.wallOfFame.subtitle} 
                    onChange={e => setConfigFormData({ ...configFormData, wallOfFame: { ...configFormData.wallOfFame, subtitle: e.target.value } })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-primary outline-none transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button 
              onClick={() => setData(prev => ({ ...prev, history: { ...prev.history, hero: configFormData.hero, stats: configFormData.stats, wallOfFame: configFormData.wallOfFame } }))}
              className="flex items-center gap-2 px-8 py-3 bg-primary text-background-dark font-bold rounded-xl"
            >
              <Save size={18} /> Enregistrer la Configuration
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
