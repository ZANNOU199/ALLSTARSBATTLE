import React, { useState } from 'react';
import { CMSData, TimelineEvent, Legend } from '../../types';
import { Plus, Trash2, Edit, Save, X, History, User } from 'lucide-react';

export default function HistoryLegends({ data, setData }: { data: CMSData, setData: React.Dispatch<React.SetStateAction<CMSData>> }) {
  const [activeTab, setActiveTab] = useState<'timeline' | 'legends'>('timeline');
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [timelineFormData, setTimelineFormData] = useState<Partial<TimelineEvent>>({});
  const [legendFormData, setLegendFormData] = useState<Partial<Legend>>({});

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
      photo: legendFormData.photo || 'https://picsum.photos/seed/legend/400/600'
    };
    setData(prev => ({ ...prev, history: { ...prev.history, legends: [...prev.history.legends, newLegend] } }));
    setIsAdding(false);
    setLegendFormData({});
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
            <button onClick={() => setIsAdding(true)} className="flex items-center gap-2 px-4 py-2 bg-primary text-background-dark font-bold rounded-xl"><Plus size={18} /> Ajouter une Légende</button>
          </div>

          {isAdding && (
            <div className="bg-[#111] border border-white/10 p-8 rounded-2xl space-y-6">
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
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Photo (URL)</label>
                  <input 
                    type="text" 
                    value={legendFormData.photo || ''} 
                    onChange={e => setLegendFormData({ ...legendFormData, photo: e.target.value })}
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
                <button onClick={() => setIsAdding(false)} className="px-6 py-2 text-xs font-bold uppercase tracking-widest text-slate-500">Annuler</button>
                <button onClick={handleAddLegend} className="px-6 py-2 bg-primary text-background-dark rounded-xl font-bold text-xs uppercase tracking-widest">Enregistrer</button>
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
                  <button 
                    onClick={() => setData(prev => ({ ...prev, history: { ...prev.history, legends: prev.history.legends.filter(l => l.id !== legend.id) } }))}
                    className="p-2 text-slate-500 hover:text-accent-red transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <h5 className="font-bold text-white">{legend.name}</h5>
                <p className="text-xs text-slate-400 mt-2 line-clamp-3">{legend.bio}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
