import React, { useState } from 'react';
import { CMSData, BracketMatch } from '../../types';
import { Save, Trophy, Users, Info } from 'lucide-react';

export default function CompetitionBrackets({ data, setData }: { data: CMSData, setData: React.Dispatch<React.SetStateAction<CMSData>> }) {
  const [activeTab, setActiveTab] = useState<'rules' | 'prize' | 'brackets'>('brackets');

  const updateMatch = (poule: 'pouleA' | 'pouleB', round: 'huitiemes' | 'quarts' | 'semis', matchId: string, field: keyof BracketMatch, value: string) => {
    setData(prev => ({
      ...prev,
      competition: {
        ...prev.competition,
        brackets: {
          ...prev.competition.brackets,
          [poule]: {
            ...prev.competition.brackets[poule],
            [round]: prev.competition.brackets[poule][round].map(m => m.id === matchId ? { ...m, [field]: value } : m)
          }
        }
      }
    }));
  };

  const updateFinal = (field: keyof BracketMatch, value: string) => {
    setData(prev => ({
      ...prev,
      competition: {
        ...prev.competition,
        brackets: {
          ...prev.competition.brackets,
          final: { ...prev.competition.brackets.final, [field]: value }
        }
      }
    }));
  };

  return (
    <div className="space-y-8">
      <div className="flex gap-4 border-b border-white/5 pb-4">
        <button 
          onClick={() => setActiveTab('rules')}
          className={`px-6 py-2 text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'rules' ? 'text-primary border-b-2 border-primary' : 'text-slate-500 hover:text-white'}`}
        >
          Règlement
        </button>
        <button 
          onClick={() => setActiveTab('prize')}
          className={`px-6 py-2 text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'prize' ? 'text-primary border-b-2 border-primary' : 'text-slate-500 hover:text-white'}`}
        >
          Prize Pool
        </button>
        <button 
          onClick={() => setActiveTab('brackets')}
          className={`px-6 py-2 text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'brackets' ? 'text-primary border-b-2 border-primary' : 'text-slate-500 hover:text-white'}`}
        >
          Brackets Dynamiques
        </button>
      </div>

      {activeTab === 'rules' && (
        <div className="bg-[#111] border border-white/10 p-8 rounded-2xl space-y-6">
          <h4 className="font-heading text-lg flex items-center gap-2"><Info size={20} className="text-primary" /> Règlement Officiel</h4>
          <textarea 
            rows={15}
            value={data.competition.rules}
            onChange={e => setData(prev => ({ ...prev, competition: { ...prev.competition, rules: e.target.value } }))}
            className="w-full bg-white/5 border border-white/10 rounded-xl p-6 focus:border-primary outline-none transition-all resize-none font-sans leading-relaxed"
          />
        </div>
      )}

      {activeTab === 'prize' && (
        <div className="bg-[#111] border border-white/10 p-8 rounded-2xl space-y-6">
          <h4 className="font-heading text-lg flex items-center gap-2"><Trophy size={20} className="text-primary" /> Récompenses par Catégorie</h4>
          <div className="space-y-4">
            {data.competition.prizePool.map((prize, idx) => (
              <div key={idx} className="flex gap-4 items-end">
                <div className="flex-1 space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Catégorie</label>
                  <input 
                    type="text" 
                    value={prize.category} 
                    onChange={e => {
                      const newPrizePool = [...data.competition.prizePool];
                      newPrizePool[idx].category = e.target.value;
                      setData(prev => ({ ...prev, competition: { ...prev.competition, prizePool: newPrizePool } }));
                    }}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-primary outline-none transition-all"
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Prix</label>
                  <input 
                    type="text" 
                    value={prize.prize} 
                    onChange={e => {
                      const newPrizePool = [...data.competition.prizePool];
                      newPrizePool[idx].prize = e.target.value;
                      setData(prev => ({ ...prev, competition: { ...prev.competition, prizePool: newPrizePool } }));
                    }}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-primary outline-none transition-all font-mono text-primary"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'brackets' && (
        <div className="space-y-12">
          {/* Poule A */}
          <div className="space-y-6">
            <h4 className="font-heading text-2xl text-primary border-l-4 border-primary pl-4">POULE A</h4>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Huitiemes A */}
              <div className="space-y-4">
                <h5 className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-4">Huitièmes de Finale</h5>
                {data.competition.brackets.pouleA.huitiemes.map(match => (
                  <div key={match.id} className="bg-[#111] border border-white/5 p-4 rounded-xl space-y-3">
                    <div className="flex gap-2 items-center">
                      <input 
                        type="text" 
                        value={match.player1} 
                        onChange={e => updateMatch('pouleA', 'huitiemes', match.id, 'player1', e.target.value)}
                        className="flex-1 bg-white/5 border border-white/10 rounded p-2 text-xs font-bold uppercase"
                      />
                      <input 
                        type="text" 
                        value={match.score1} 
                        onChange={e => updateMatch('pouleA', 'huitiemes', match.id, 'score1', e.target.value)}
                        className="w-12 bg-white/5 border border-white/10 rounded p-2 text-xs font-mono text-primary text-center"
                      />
                    </div>
                    <div className="flex gap-2 items-center">
                      <input 
                        type="text" 
                        value={match.player2} 
                        onChange={e => updateMatch('pouleA', 'huitiemes', match.id, 'player2', e.target.value)}
                        className="flex-1 bg-white/5 border border-white/10 rounded p-2 text-xs font-bold uppercase"
                      />
                      <input 
                        type="text" 
                        value={match.score2} 
                        onChange={e => updateMatch('pouleA', 'huitiemes', match.id, 'score2', e.target.value)}
                        className="w-12 bg-white/5 border border-white/10 rounded p-2 text-xs font-mono text-primary text-center"
                      />
                    </div>
                  </div>
                ))}
              </div>
              {/* Add Quarts and Semis similarly if needed, or just show the structure */}
              <div className="bg-white/5 rounded-2xl p-6 border border-dashed border-white/10 flex items-center justify-center text-slate-500 text-xs italic">
                Quarts de Finale (A) - Auto-généré ou manuel
              </div>
              <div className="bg-white/5 rounded-2xl p-6 border border-dashed border-white/10 flex items-center justify-center text-slate-500 text-xs italic">
                Demi-Finale (A) - Auto-généré ou manuel
              </div>
            </div>
          </div>

          {/* Final */}
          <div className="bg-primary/5 border border-primary/20 p-8 rounded-3xl text-center space-y-6">
            <Trophy className="text-primary w-12 h-12 mx-auto" />
            <h4 className="font-heading text-3xl">GRANDE FINALE</h4>
            <div className="max-w-md mx-auto space-y-4">
              <div className="flex gap-4 items-center">
                <input 
                  type="text" 
                  value={data.competition.brackets.final.player1} 
                  onChange={e => updateFinal('player1', e.target.value)}
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl p-4 text-xl font-heading text-center uppercase"
                />
                <span className="text-primary font-heading text-2xl">VS</span>
                <input 
                  type="text" 
                  value={data.competition.brackets.final.player2} 
                  onChange={e => updateFinal('player2', e.target.value)}
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl p-4 text-xl font-heading text-center uppercase"
                />
              </div>
              <div className="flex gap-4 items-center justify-center">
                <input 
                  type="text" 
                  value={data.competition.brackets.final.score1} 
                  onChange={e => updateFinal('score1', e.target.value)}
                  className="w-20 bg-white/5 border border-white/10 rounded-xl p-3 text-2xl font-mono text-primary text-center"
                />
                <div className="w-8"></div>
                <input 
                  type="text" 
                  value={data.competition.brackets.final.score2} 
                  onChange={e => updateFinal('score2', e.target.value)}
                  className="w-20 bg-white/5 border border-white/10 rounded-xl p-3 text-2xl font-mono text-primary text-center"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
