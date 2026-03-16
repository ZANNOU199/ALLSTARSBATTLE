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

  const updateGlobalConfig = (field: string, value: string) => {
    setData(prev => ({
      ...prev,
      globalConfig: {
        ...prev.globalConfig,
        competition: {
          ...prev.globalConfig.competition,
          [field]: value
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
          {/* Header Section */}
          <div className="bg-[#111] border border-white/10 p-8 rounded-2xl space-y-6">
            <div className="text-center space-y-4">
              <h3 className="font-heading text-3xl text-primary">PHASE FINALE - LOMÉ, TOGO</h3>
              <h4 className="font-heading text-2xl text-white">TABLEAU DES BATTLES - TOP 16</h4>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Suivez en temps réel l'ascension des meilleurs B-Boys et B-Girls du monde vers le titre suprême de l'All Star Battle International 2026.
              </p>
            </div>
          </div>

          {/* Poule A */}
          <div className="space-y-6">
            <h4 className="font-heading text-2xl text-primary border-l-4 border-primary pl-4">HUITIÈMES (A)</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {data.competition.brackets.pouleA.huitiemes.map((match, idx) => (
                <div key={match.id} className="bg-[#111] border border-white/5 p-6 rounded-xl space-y-4">
                  <div className="text-center text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-4">
                    Match A{idx + 1}
                  </div>
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <input 
                        type="text" 
                        value={match.player1} 
                        onChange={e => updateMatch('pouleA', 'huitiemes', match.id, 'player1', e.target.value)}
                        placeholder="Nom du danseur"
                        className="w-full bg-white/5 border border-white/10 rounded p-3 text-sm font-bold uppercase focus:border-primary outline-none"
                      />
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          value={match.country1} 
                          onChange={e => updateMatch('pouleA', 'huitiemes', match.id, 'country1', e.target.value)}
                          placeholder="Pays"
                          className="flex-1 bg-white/5 border border-white/10 rounded p-2 text-xs uppercase"
                        />
                        <input 
                          type="text" 
                          value={match.countryCode1} 
                          onChange={e => updateMatch('pouleA', 'huitiemes', match.id, 'countryCode1', e.target.value)}
                          placeholder="Code"
                          className="w-16 bg-white/5 border border-white/10 rounded p-2 text-xs uppercase"
                        />
                      </div>
                      <input 
                        type="text" 
                        value={match.score1} 
                        onChange={e => updateMatch('pouleA', 'huitiemes', match.id, 'score1', e.target.value)}
                        placeholder="--"
                        className="w-full bg-white/5 border border-white/10 rounded p-2 text-center font-mono text-primary"
                      />
                    </div>
                    <div className="text-center text-primary font-bold">VS</div>
                    <div className="space-y-2">
                      <input 
                        type="text" 
                        value={match.player2} 
                        onChange={e => updateMatch('pouleA', 'huitiemes', match.id, 'player2', e.target.value)}
                        placeholder="Nom du danseur"
                        className="w-full bg-white/5 border border-white/10 rounded p-3 text-sm font-bold uppercase focus:border-primary outline-none"
                      />
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          value={match.country2} 
                          onChange={e => updateMatch('pouleA', 'huitiemes', match.id, 'country2', e.target.value)}
                          placeholder="Pays"
                          className="flex-1 bg-white/5 border border-white/10 rounded p-2 text-xs uppercase"
                        />
                        <input 
                          type="text" 
                          value={match.countryCode2} 
                          onChange={e => updateMatch('pouleA', 'huitiemes', match.id, 'countryCode2', e.target.value)}
                          placeholder="Code"
                          className="w-16 bg-white/5 border border-white/10 rounded p-2 text-xs uppercase"
                        />
                      </div>
                      <input 
                        type="text" 
                        value={match.score2} 
                        onChange={e => updateMatch('pouleA', 'huitiemes', match.id, 'score2', e.target.value)}
                        placeholder="--"
                        className="w-full bg-white/5 border border-white/10 rounded p-2 text-center font-mono text-primary"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Poule B */}
          <div className="space-y-6">
            <h4 className="font-heading text-2xl text-primary border-l-4 border-primary pl-4">HUITIÈMES (B)</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {data.competition.brackets.pouleB.huitiemes.map((match, idx) => (
                <div key={match.id} className="bg-[#111] border border-white/5 p-6 rounded-xl space-y-4">
                  <div className="text-center text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-4">
                    Match B{idx + 1}
                  </div>
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <input 
                        type="text" 
                        value={match.player1} 
                        onChange={e => updateMatch('pouleB', 'huitiemes', match.id, 'player1', e.target.value)}
                        placeholder="Nom du danseur"
                        className="w-full bg-white/5 border border-white/10 rounded p-3 text-sm font-bold uppercase focus:border-primary outline-none"
                      />
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          value={match.country1} 
                          onChange={e => updateMatch('pouleB', 'huitiemes', match.id, 'country1', e.target.value)}
                          placeholder="Pays"
                          className="flex-1 bg-white/5 border border-white/10 rounded p-2 text-xs uppercase"
                        />
                        <input 
                          type="text" 
                          value={match.countryCode1} 
                          onChange={e => updateMatch('pouleB', 'huitiemes', match.id, 'countryCode1', e.target.value)}
                          placeholder="Code"
                          className="w-16 bg-white/5 border border-white/10 rounded p-2 text-xs uppercase"
                        />
                      </div>
                      <input 
                        type="text" 
                        value={match.score1} 
                        onChange={e => updateMatch('pouleB', 'huitiemes', match.id, 'score1', e.target.value)}
                        placeholder="--"
                        className="w-full bg-white/5 border border-white/10 rounded p-2 text-center font-mono text-primary"
                      />
                    </div>
                    <div className="text-center text-primary font-bold">VS</div>
                    <div className="space-y-2">
                      <input 
                        type="text" 
                        value={match.player2} 
                        onChange={e => updateMatch('pouleB', 'huitiemes', match.id, 'player2', e.target.value)}
                        placeholder="Nom du danseur"
                        className="w-full bg-white/5 border border-white/10 rounded p-3 text-sm font-bold uppercase focus:border-primary outline-none"
                      />
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          value={match.country2} 
                          onChange={e => updateMatch('pouleB', 'huitiemes', match.id, 'country2', e.target.value)}
                          placeholder="Pays"
                          className="flex-1 bg-white/5 border border-white/10 rounded p-2 text-xs uppercase"
                        />
                        <input 
                          type="text" 
                          value={match.countryCode2} 
                          onChange={e => updateMatch('pouleB', 'huitiemes', match.id, 'countryCode2', e.target.value)}
                          placeholder="Code"
                          className="w-16 bg-white/5 border border-white/10 rounded p-2 text-xs uppercase"
                        />
                      </div>
                      <input 
                        type="text" 
                        value={match.score2} 
                        onChange={e => updateMatch('pouleB', 'huitiemes', match.id, 'score2', e.target.value)}
                        placeholder="--"
                        className="w-full bg-white/5 border border-white/10 rounded p-2 text-center font-mono text-primary"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quarts de Finale */}
          <div className="space-y-6">
            <h4 className="font-heading text-2xl text-primary border-l-4 border-primary pl-4">QUARTS DE FINALE</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {data.competition.brackets.pouleA.quarts.map((match, idx) => (
                <div key={match.id} className="bg-[#111] border border-white/5 p-6 rounded-xl space-y-4">
                  <div className="text-center text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-4">
                    Match A{idx + 1}/A{idx + 2}
                  </div>
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <input 
                        type="text" 
                        value={match.player1} 
                        onChange={e => updateMatch('pouleA', 'quarts', match.id, 'player1', e.target.value)}
                        placeholder="Vainqueur Match A1/A2"
                        className="w-full bg-white/5 border border-white/10 rounded p-3 text-sm font-bold uppercase focus:border-primary outline-none"
                      />
                      <input 
                        type="text" 
                        value={match.score1} 
                        onChange={e => updateMatch('pouleA', 'quarts', match.id, 'score1', e.target.value)}
                        placeholder="--"
                        className="w-full bg-white/5 border border-white/10 rounded p-2 text-center font-mono text-primary"
                      />
                    </div>
                    <div className="text-center text-primary font-bold">VS</div>
                    <div className="space-y-2">
                      <input 
                        type="text" 
                        value={match.player2} 
                        onChange={e => updateMatch('pouleA', 'quarts', match.id, 'player2', e.target.value)}
                        placeholder="Vainqueur Match A3/A4"
                        className="w-full bg-white/5 border border-white/10 rounded p-3 text-sm font-bold uppercase focus:border-primary outline-none"
                      />
                      <input 
                        type="text" 
                        value={match.score2} 
                        onChange={e => updateMatch('pouleA', 'quarts', match.id, 'score2', e.target.value)}
                        placeholder="--"
                        className="w-full bg-white/5 border border-white/10 rounded p-2 text-center font-mono text-primary"
                      />
                    </div>
                  </div>
                </div>
              ))}

              {data.competition.brackets.pouleB.quarts.map((match, idx) => (
                <div key={match.id} className="bg-[#111] border border-white/5 p-6 rounded-xl space-y-4">
                  <div className="text-center text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-4">
                    Match B{idx + 1}/B{idx + 2}
                  </div>
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <input 
                        type="text" 
                        value={match.player1} 
                        onChange={e => updateMatch('pouleB', 'quarts', match.id, 'player1', e.target.value)}
                        placeholder="Vainqueur Match B1/B2"
                        className="w-full bg-white/5 border border-white/10 rounded p-3 text-sm font-bold uppercase focus:border-primary outline-none"
                      />
                      <input 
                        type="text" 
                        value={match.score1} 
                        onChange={e => updateMatch('pouleB', 'quarts', match.id, 'score1', e.target.value)}
                        placeholder="--"
                        className="w-full bg-white/5 border border-white/10 rounded p-2 text-center font-mono text-primary"
                      />
                    </div>
                    <div className="text-center text-primary font-bold">VS</div>
                    <div className="space-y-2">
                      <input 
                        type="text" 
                        value={match.player2} 
                        onChange={e => updateMatch('pouleB', 'quarts', match.id, 'player2', e.target.value)}
                        placeholder="Vainqueur Match B3/B4"
                        className="w-full bg-white/5 border border-white/10 rounded p-3 text-sm font-bold uppercase focus:border-primary outline-none"
                      />
                      <input 
                        type="text" 
                        value={match.score2} 
                        onChange={e => updateMatch('pouleB', 'quarts', match.id, 'score2', e.target.value)}
                        placeholder="--"
                        className="w-full bg-white/5 border border-white/10 rounded p-2 text-center font-mono text-primary"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Demi-Finales */}
          <div className="space-y-6">
            <h4 className="font-heading text-2xl text-primary border-l-4 border-primary pl-4">DEMI-FINALES</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {data.competition.brackets.pouleA.semis.map((match, idx) => (
                <div key={match.id} className="bg-[#111] border border-white/5 p-8 rounded-xl space-y-4">
                  <div className="text-center text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-4">
                    DEMI-FINALE {idx === 0 ? 'A' : 'B'}
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <input 
                        type="text" 
                        value={match.player1} 
                        onChange={e => updateMatch('pouleA', 'semis', match.id, 'player1', e.target.value)}
                        placeholder={`Vainqueur Quarts ${idx === 0 ? 'A1/2' : 'A3/4'}`}
                        className="w-full bg-white/5 border border-white/10 rounded p-4 text-lg font-bold uppercase focus:border-primary outline-none text-center"
                      />
                      <input 
                        type="text" 
                        value={match.score1} 
                        onChange={e => updateMatch('pouleA', 'semis', match.id, 'score1', e.target.value)}
                        placeholder="--"
                        className="w-full bg-white/5 border border-white/10 rounded p-3 text-center font-mono text-primary text-xl"
                      />
                    </div>
                    <div className="text-center text-primary font-bold text-2xl">VS</div>
                    <div className="space-y-2">
                      <input 
                        type="text" 
                        value={match.player2} 
                        onChange={e => updateMatch('pouleA', 'semis', match.id, 'player2', e.target.value)}
                        placeholder={`Vainqueur Quarts ${idx === 0 ? 'B1/2' : 'B3/4'}`}
                        className="w-full bg-white/5 border border-white/10 rounded p-4 text-lg font-bold uppercase focus:border-primary outline-none text-center"
                      />
                      <input 
                        type="text" 
                        value={match.score2} 
                        onChange={e => updateMatch('pouleA', 'semis', match.id, 'score2', e.target.value)}
                        placeholder="--"
                        className="w-full bg-white/5 border border-white/10 rounded p-3 text-center font-mono text-primary text-xl"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Grande Finale */}
          <div className="bg-primary/5 border border-primary/20 p-12 rounded-3xl text-center space-y-8">
            <Trophy className="text-primary w-16 h-16 mx-auto" />
            <h4 className="font-heading text-4xl text-primary">GRANDE FINALE</h4>
            <p className="text-slate-400 text-lg">CHAMPION 2026</p>
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="flex gap-6 items-center justify-center">
                <div className="flex-1 space-y-4">
                  <input 
                    type="text" 
                    value={data.competition.brackets.final.player1} 
                    onChange={e => updateFinal('player1', e.target.value)}
                    placeholder="Vainqueur Demi-Finale A"
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-6 text-2xl font-heading text-center uppercase focus:border-primary outline-none"
                  />
                  <input 
                    type="text" 
                    value={data.competition.brackets.final.score1} 
                    onChange={e => updateFinal('score1', e.target.value)}
                    placeholder="--"
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-3xl font-mono text-primary text-center"
                  />
                </div>
                <div className="text-primary font-heading text-4xl px-4">VS</div>
                <div className="flex-1 space-y-4">
                  <input 
                    type="text" 
                    value={data.competition.brackets.final.player2} 
                    onChange={e => updateFinal('player2', e.target.value)}
                    placeholder="Vainqueur Demi-Finale B"
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-6 text-2xl font-heading text-center uppercase focus:border-primary outline-none"
                  />
                  <input 
                    type="text" 
                    value={data.competition.brackets.final.score2} 
                    onChange={e => updateFinal('score2', e.target.value)}
                    placeholder="--"
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-3xl font-mono text-primary text-center"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
