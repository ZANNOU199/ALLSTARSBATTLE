
import React, { useState } from 'react';
import { useCMSStore } from '../../store/useStore';
import { Trophy, Save, Plus, Trash2, Edit2, ChevronRight } from 'lucide-react';
import { BracketMatch } from '../../types';

export default function Competition() {
  const { state, updateState } = useCMSStore();
  const [activeTab, setActiveTab] = useState<'rules' | 'brackets'>('rules');
  const [isEditingMatch, setIsEditingMatch] = useState(false);
  const [currentMatch, setCurrentMatch] = useState<Partial<BracketMatch>>({});

  const handleSaveRules = (e: React.FormEvent) => {
    e.preventDefault();
    // Rules are part of config
    updateState(prev => ({
      ...prev,
      config: {
        ...prev.config,
        competitionRules: (e.target as any).rules.value,
        judgingCriteria: (e.target as any).criteria.value,
      }
    }));
  };

  const handleSaveMatch = (e: React.FormEvent) => {
    e.preventDefault();
    const match = currentMatch as BracketMatch;
    updateState(prev => {
      const exists = prev.brackets.find(m => m.id === match.id);
      if (exists) {
        return { ...prev, brackets: prev.brackets.map(m => m.id === match.id ? match : m) };
      } else {
        return { ...prev, brackets: [...prev.brackets, { ...match, id: Date.now().toString() }] };
      }
    });
    setIsEditingMatch(false);
    setCurrentMatch({});
  };

  const handleDeleteMatch = (id: string) => {
    updateState(prev => ({
      ...prev,
      brackets: prev.brackets.filter(m => m.id !== id)
    }));
  };

  return (
    <div className="space-y-10">
      <header>
        <h2 className="text-3xl font-black tracking-tighter">Compétition & Brackets</h2>
        <p className="text-zinc-500 mt-1">Gérez le règlement et les tableaux de tournois en temps réel.</p>
      </header>

      <div className="flex gap-4 border-b border-white/5 pb-4">
        <button
          onClick={() => setActiveTab('rules')}
          className={`px-8 py-3 rounded-xl text-sm font-bold transition-all ${
            activeTab === 'rules' ? 'bg-white text-black' : 'text-zinc-500 hover:text-white'
          }`}
        >
          RÈGLEMENT & PRIX
        </button>
        <button
          onClick={() => setActiveTab('brackets')}
          className={`px-8 py-3 rounded-xl text-sm font-bold transition-all ${
            activeTab === 'brackets' ? 'bg-white text-black' : 'text-zinc-500 hover:text-white'
          }`}
        >
          BRACKETS DYNAMIQUES
        </button>
      </div>

      {activeTab === 'rules' ? (
        <form onSubmit={handleSaveRules} className="glass p-8 rounded-3xl space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Règlement Officiel</label>
              <textarea 
                name="rules"
                defaultValue={state.config.competitionRules}
                rows={10}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:border-primary outline-none transition-colors resize-none leading-relaxed"
              />
            </div>
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Critères de Jugement</label>
              <textarea 
                name="criteria"
                defaultValue={state.config.judgingCriteria}
                rows={10}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 focus:border-primary outline-none transition-colors resize-none leading-relaxed"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button type="submit" className="flex items-center gap-2 px-10 py-4 bg-primary rounded-xl font-bold text-sm">
              <Save size={18} />
              Enregistrer les modifications
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-black tracking-widest uppercase text-zinc-400">Matchs du tournoi</h3>
            <button 
              onClick={() => { setIsEditingMatch(true); setCurrentMatch({}); }}
              className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-xs font-bold hover:bg-white hover:text-black transition-all"
            >
              Ajouter un match
            </button>
          </div>

          {isEditingMatch && (
            <form onSubmit={handleSaveMatch} className="glass p-6 rounded-2xl grid grid-cols-1 md:grid-cols-3 gap-4 animate-in fade-in zoom-in-95">
              <input 
                placeholder="Participant 1"
                value={currentMatch.participant1 || ''}
                onChange={e => setCurrentMatch({...currentMatch, participant1: e.target.value})}
                className="bg-zinc-900 border border-white/10 rounded-lg px-4 py-2 outline-none focus:border-primary"
              />
              <input 
                placeholder="Participant 2"
                value={currentMatch.participant2 || ''}
                onChange={e => setCurrentMatch({...currentMatch, participant2: e.target.value})}
                className="bg-zinc-900 border border-white/10 rounded-lg px-4 py-2 outline-none focus:border-primary"
              />
              <select 
                value={currentMatch.round || ''}
                onChange={e => setCurrentMatch({...currentMatch, round: e.target.value})}
                className="bg-zinc-900 border border-white/10 rounded-lg px-4 py-2 outline-none focus:border-primary"
              >
                <option value="">Tour</option>
                <option value="1/8">1/8 de Finale</option>
                <option value="1/4">1/4 de Finale</option>
                <option value="1/2">Demi-Finale</option>
                <option value="Final">Finale</option>
              </select>
              <div className="md:col-span-3 flex justify-end gap-2">
                <button type="button" onClick={() => setIsEditingMatch(false)} className="px-4 py-2 text-xs font-bold">Annuler</button>
                <button type="submit" className="px-6 py-2 bg-primary rounded-lg text-xs font-bold">Enregistrer</button>
              </div>
            </form>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {state.brackets.map(match => (
              <div key={match.id} className="glass p-4 rounded-2xl border-l-4 border-primary">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">{match.round}</span>
                  <div className="flex gap-1">
                    <button onClick={() => { setCurrentMatch(match); setIsEditingMatch(true); }} className="p-1.5 hover:bg-white/10 rounded"><Edit2 size={12} /></button>
                    <button onClick={() => handleDeleteMatch(match.id)} className="p-1.5 hover:bg-red-500/20 text-zinc-500 hover:text-red-500 rounded"><Trash2 size={12} /></button>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className={`flex justify-between p-2 rounded-lg ${match.winnerId === '1' ? 'bg-primary/20 border border-primary/30' : 'bg-white/5'}`}>
                    <span className="text-sm font-bold">{match.participant1}</span>
                    <input 
                      type="checkbox" 
                      checked={match.winnerId === '1'} 
                      onChange={() => updateState(prev => ({ ...prev, brackets: prev.brackets.map(m => m.id === match.id ? { ...m, winnerId: m.winnerId === '1' ? undefined : '1' } : m) }))}
                    />
                  </div>
                  <div className={`flex justify-between p-2 rounded-lg ${match.winnerId === '2' ? 'bg-primary/20 border border-primary/30' : 'bg-white/5'}`}>
                    <span className="text-sm font-bold">{match.participant2}</span>
                    <input 
                      type="checkbox" 
                      checked={match.winnerId === '2'} 
                      onChange={() => updateState(prev => ({ ...prev, brackets: prev.brackets.map(m => m.id === match.id ? { ...m, winnerId: m.winnerId === '2' ? undefined : '2' } : m) }))}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
