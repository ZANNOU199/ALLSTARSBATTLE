import React, { useState, useRef, useEffect } from 'react';
import { CMSData, BracketMatch } from '../../types';
import { Save, Trophy, Users, Info, ChevronDown, Search, X } from 'lucide-react';

interface Country {
  code: string;
  name: string;
}

// Liste statique en fallback
const DEFAULT_COUNTRIES: Country[] = [
  { code: 'us', name: 'États-Unis' },
  { code: 'ca', name: 'Canada' },
  { code: 'fr', name: 'France' },
  { code: 'jp', name: 'Japon' },
  { code: 'cn', name: 'Chine' },
  { code: 'ua', name: 'Ukraine' },
  { code: 'nl', name: 'Pays-Bas' },
  { code: 'tw', name: 'Taïwan' },
  { code: 'tg', name: 'Togo' },
  { code: 'de', name: 'Allemagne' },
  { code: 'es', name: 'Espagne' },
  { code: 'it', name: 'Italie' },
  { code: 'uk', name: 'Royaume-Uni' },
  { code: 'br', name: 'Brésil' },
  { code: 'mx', name: 'Mexique' },
  { code: 'kr', name: 'Corée du Sud' },
  { code: 'au', name: 'Australie' },
  { code: 'nz', name: 'Nouvelle-Zélande' },
  { code: 'za', name: 'Afrique du Sud' },
  { code: 'ng', name: 'Nigéria' },
  { code: 'ke', name: 'Kenya' },
  { code: 'eg', name: 'Égypte' },
  { code: 'in', name: 'Inde' },
  { code: 'id', name: 'Indonésie' },
  { code: 'th', name: 'Thaïlande' },
  { code: 'sg', name: 'Singapour' },
  { code: 'ph', name: 'Philippines' },
  { code: 'ru', name: 'Russie' },
  { code: 'ma', name: 'Maroc' },
  { code: 'ci', name: 'Côte d\'Ivoire' },
  { code: 'at', name: 'Autriche' },
  { code: 'be', name: 'Belgique' },
  { code: 'ch', name: 'Suisse' },
  { code: 'se', name: 'Suède' },
  { code: 'no', name: 'Norvège' },
  { code: 'dk', name: 'Danemark' },
  { code: 'fi', name: 'Finlande' },
  { code: 'pl', name: 'Pologne' },
  { code: 'gr', name: 'Grèce' },
  { code: 'pt', name: 'Portugal' },
  { code: 'ir', name: 'Iran' },
  { code: 'iq', name: 'Irak' },
  { code: 'sa', name: 'Arabie Saoudite' },
  { code: 'ae', name: 'Émirats Arabes Unis' },
  { code: 'il', name: 'Israël' },
  { code: 'tr', name: 'Turquie' },
  { code: 'ar', name: 'Argentine' },
  { code: 'cl', name: 'Chili' },
  { code: 'co', name: 'Colombie' },
  { code: 'pe', name: 'Pérou' },
  { code: 've', name: 'Venezuela' },
  { code: 'my', name: 'Malaisie' },
  { code: 'vn', name: 'Viêt Nam' },
  { code: 'kh', name: 'Cambodge' },
  { code: 'la', name: 'Laos' },
  { code: 'mm', name: 'Birmanie' },
  { code: 'bd', name: 'Bangladesh' },
  { code: 'pk', name: 'Pakistan' },
  { code: 'lk', name: 'Sri Lanka' },
  { code: 'np', name: 'Népal' },
  { code: 'hk', name: 'Hong Kong' },
  { code: 'mo', name: 'Macao' },
  { code: 'kg', name: 'Kirghizistan' },
  { code: 'kz', name: 'Kazakhstan' },
  { code: 'tn', name: 'Tunisie' },
  { code: 'dz', name: 'Algérie' },
  { code: 'sd', name: 'Soudan' },
  { code: 'et', name: 'Éthiopie' },
  { code: 'gh', name: 'Ghana' },
  { code: 'cm', name: 'Cameroun' },
];

// Composant séparé pour éviter les re-renders
const CountrySearchSelect = ({ value, onChange, countries }: { value: string; onChange: (code: string) => void; countries: Country[] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedCountry = countries.find(c => c.code === value);
  const filteredCountries = countries.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.code.toUpperCase().includes(searchTerm.toUpperCase())
  );

  // Fermer en cliquant en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Focus sur l'input quand on ouvre
      setTimeout(() => inputRef.current?.focus(), 0);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleSelect = (code: string) => {
    onChange(code);
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCountries.length > 0) {
        handleSelect(filteredCountries[0].code);
      }
    }
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div ref={dropdownRef} className="relative w-full">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white/5 border border-white/10 rounded px-2 py-1 text-xs text-left flex justify-between items-center focus:border-primary outline-none hover:bg-white/10 transition text-white"
      >
        <span className="truncate text-xs">{selectedCountry ? selectedCountry.code.toUpperCase() : 'Pays'}</span>
        <ChevronDown className={`w-3 h-3 transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-[#111] border border-white/10 rounded shadow-lg">
          <div className="p-2 sticky top-0 bg-[#111]">
            <input
              ref={inputRef}
              type="text"
              placeholder="Chercher pays..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full bg-white/5 border border-white/10 rounded px-2 py-1 text-xs text-white outline-none focus:border-primary"
              autoFocus
            />
          </div>
          <div className="max-h-48 overflow-y-auto">
            {filteredCountries.length > 0 ? (
              filteredCountries.map(c => (
                <button
                  key={c.code}
                  type="button"
                  onClick={() => handleSelect(c.code)}
                  className={`w-full text-left px-3 py-2 text-xs hover:bg-white/10 transition ${
                    value === c.code ? 'bg-primary/20 text-primary font-bold' : 'text-slate-300'
                  }`}
                >
                  <span className="font-mono">{c.code.toUpperCase()}</span> - {c.name}
                </button>
              ))
            ) : (
              <div className="px-3 py-4 text-xs text-slate-500 text-center">Aucun pays trouvé</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default function CompetitionBrackets({ data, setData }: { data: CMSData, setData: React.Dispatch<React.SetStateAction<CMSData>> }) {
  const [activeTab, setActiveTab] = useState<'rules' | 'prize' | 'brackets'>('brackets');
  const [bracketScale, setBracketScale] = useState(1);
  const [bracketHeight, setBracketHeight] = useState(500);
  const [countries, setCountries] = useState<Country[]>(DEFAULT_COUNTRIES);
  const bracketHeightRef = useRef(bracketHeight);
  const bracketContainerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);

  // Charger les pays depuis l'API avec fallback
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all?fields=cca2,name');
        if (!response.ok) throw new Error('API failed');
        const data = await response.json();
        const countriesList: Country[] = data
          .map((country: any) => ({
            code: country.cca2.toLowerCase(),
            name: country.name.common || country.name.official || country.cca2
          }))
          .sort((a: Country, b: Country) => a.name.localeCompare(b.name));
        setCountries(countriesList);
      } catch (error) {
        console.log('Utilisation des pays par défaut');
        setCountries(DEFAULT_COUNTRIES);
      }
    };
    fetchCountries();
  }, []);

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

  useEffect(() => {
    bracketHeightRef.current = bracketHeight;
  }, [bracketHeight]);

  useEffect(() => {
    const updateScale = () => {
      if (!bracketContainerRef.current) return;

      const containerWidth = bracketContainerRef.current.clientWidth;
      const targetWidth = 900;

      // Aggressively scale to fit: no minimum limit for small screens
      const scale = Math.min(1, (containerWidth - 20) / targetWidth);
      
      setBracketScale(Math.max(0.25, scale)); // Allow much smaller scale for mobile
    };

    // Initial scale calculation
    updateScale();
    
    // Recalculate on resize
    window.addEventListener('resize', updateScale);
    const resizeObserver = new ResizeObserver(updateScale);
    if (bracketContainerRef.current) {
      resizeObserver.observe(bracketContainerRef.current);
    }
    
    return () => {
      window.removeEventListener('resize', updateScale);
      resizeObserver.disconnect();
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

  const BracketMatch = ({ player1, player2, country1, country2, countryCode1, countryCode2, side = "left", color = "primary" }: any) => (
    <div className={`flex flex-col gap-2 sm:gap-1 bg-white/5 p-4 sm:p-3 rounded border-${side === "left" ? "l" : "r"}-4 ${color === "primary" ? "border-primary" : "border-accent-red"} relative transition-all hover:bg-white/10 whitespace-normal overflow-hidden`}>
      <div className={`flex justify-between items-center gap-2 ${side === "right" ? "flex-row-reverse" : ""}`}>
        <span className="font-bold text-sm sm:text-xs uppercase leading-tight flex items-center gap-2 sm:gap-1 truncate flex-shrink min-w-0">
          <span className="truncate">{player1}</span>
          {countryCode1 !== 'un' && <img src={`https://flagcdn.com/${countryCode1}.svg`} alt={country1} className="w-6 h-5 sm:w-4 sm:h-3 flex-shrink-0" onError={(e) => { e.currentTarget.style.display = 'none'; }} />}
        </span>
      </div>
      <div className="h-[1px] bg-white/10 my-1 sm:my-0"></div>
      <div className={`flex justify-between items-center gap-2 ${side === "right" ? "flex-row-reverse" : ""}`}>
        <span className="font-bold text-sm sm:text-xs uppercase leading-tight flex items-center gap-2 sm:gap-1 truncate flex-shrink min-w-0">
          <span className="truncate">{player2}</span>
          {countryCode2 !== 'un' && <img src={`https://flagcdn.com/${countryCode2}.svg`} alt={country2} className="w-6 h-5 sm:w-4 sm:h-3 flex-shrink-0" onError={(e) => { e.currentTarget.style.display = 'none'; }} />}
        </span>
      </div>
    </div>
  );

  const BracketContent = () => {
    const containerWidth = bracketContainerRef.current?.clientWidth || 400;
    const isMobile = containerWidth < 640;
    const minHeight = isMobile ? '900px' : '600px';
    const gapClass = isMobile ? 'gap-2' : 'gap-1';
    
    return (
    <div className={`grid grid-cols-7 ${gapClass} items-stretch py-6 px-2 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent rounded-lg`} style={{ minHeight, minWidth: '900px' }}>
      {/* Poule A: Top 16 (Left) */}
      <div className="flex flex-col h-full justify-between">
        <h3 className="font-heading text-xs sm:text-[10px] text-primary mb-2 text-center shrink-0 font-bold">HUITIÈMES (A)</h3>
        <div className="flex-1 flex flex-col justify-around gap-2 sm:gap-1">
          {data.competition.brackets.pouleA.huitiemes.map((match, idx) => (
            <BracketMatch 
              key={match.id}
              player1={match.player1} 
              country1={match.country1} 
              countryCode1={match.countryCode1} 
              player2={match.player2} 
              country2={match.country2} 
              countryCode2={match.countryCode2}
              color={idx % 2 === 0 ? "accent-red" : "primary"}
            />
          ))}
        </div>
      </div>

      {/* Poule A: Quarts (Left) */}
      <div className="flex flex-col h-full justify-between px-1">
        <h3 className="font-heading text-xs sm:text-[10px] text-slate-400 mb-2 text-center shrink-0 font-bold">QUARTS</h3>
        <div className="flex-1 flex flex-col justify-around gap-2 sm:gap-1">
          {data.competition.brackets.pouleA.quarts.map((match) => (
            <BracketMatch 
              key={match.id}
              player1={match.player1} 
              country1="" 
              countryCode1="un" 
              player2={match.player2} 
              country2="" 
              countryCode2="un"
            />
          ))}
        </div>
      </div>

      {/* Poule A: Semis (Left) */}
      <div className="flex flex-col h-full justify-between px-1">
        <h3 className="font-heading text-xs sm:text-[10px] text-accent-red mb-2 text-center uppercase shrink-0 font-bold">DEMI</h3>
        <div className="flex-1 flex flex-col justify-around gap-2 sm:gap-1">
          {data.competition.brackets.pouleA.semis.map((match) => (
            <div key={match.id} className="flex flex-col gap-2 sm:gap-1 bg-accent-red/10 p-3 sm:p-2 rounded border border-accent-red/30 text-xs">
              <div className="text-center font-bold text-white uppercase text-sm sm:text-[10px] truncate">{match.player1}</div>
              <div className="text-center text-primary font-mono text-[10px] sm:text-[8px]">--</div>
              <div className="text-center font-bold text-white uppercase text-sm sm:text-[10px] truncate">{match.player2}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Center: Final */}
      <div className="flex flex-col h-full items-center justify-center px-1">
        <div className="text-center mb-2 shrink-0">
          <Trophy className="text-primary w-7 h-7 sm:w-6 sm:h-6 mx-auto mb-1" />
          <h2 className="font-heading text-[11px] sm:text-[10px] text-white uppercase font-bold">FINALE</h2>
        </div>
        <div className="w-full max-w-[110px] sm:max-w-[100px] p-1 bg-gradient-to-b from-primary via-accent-red to-primary rounded shadow-[0_0_20px_rgba(244,209,37,0.2)]">
          <div className="bg-black p-2 sm:p-1 rounded-sm flex flex-col items-center gap-2 sm:gap-1">
            <div className="text-center">
              <h3 className="font-heading text-[10px] sm:text-[9px] text-white uppercase font-bold truncate">{data.competition.brackets.final.player1 || 'TBD'}</h3>
            </div>
            <span className="text-[8px]">•</span>
            <div className="text-center">
              <h3 className="font-heading text-[10px] sm:text-[9px] text-white uppercase font-bold truncate">{data.competition.brackets.final.player2 || 'TBD'}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Poule B: Semis (Right) */}
      <div className="flex flex-col h-full justify-between px-1">
        <h3 className="font-heading text-xs sm:text-[10px] text-accent-red mb-2 text-center uppercase shrink-0 font-bold">DEMI</h3>
        <div className="flex-1 flex flex-col justify-around gap-2 sm:gap-1">
          {data.competition.brackets.pouleB.semis.map((match) => (
            <div key={match.id} className="flex flex-col gap-2 sm:gap-1 bg-accent-red/10 p-3 sm:p-2 rounded border border-accent-red/30 text-xs">
              <div className="text-center font-bold text-white uppercase text-sm sm:text-[10px] truncate">{match.player1}</div>
              <div className="text-center text-primary font-mono text-[10px] sm:text-[8px]">--</div>
              <div className="text-center font-bold text-white uppercase text-sm sm:text-[10px] truncate">{match.player2}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Poule B: Quarts (Right) */}
      <div className="flex flex-col h-full justify-between px-1">
        <h3 className="font-heading text-xs sm:text-[10px] text-slate-400 mb-2 text-center shrink-0 font-bold">QUARTS</h3>
        <div className="flex-1 flex flex-col justify-around gap-2 sm:gap-1">
          {data.competition.brackets.pouleB.quarts.map((match) => (
            <BracketMatch 
              key={match.id}
              player1={match.player1} 
              country1="" 
              countryCode1="un" 
              player2={match.player2} 
              country2="" 
              countryCode2="un"
              side="right"
            />
          ))}
        </div>
      </div>

      {/* Poule B: Top 16 (Right) */}
      <div className="flex flex-col h-full justify-between">
        <h3 className="font-heading text-xs sm:text-[10px] text-primary mb-2 text-center shrink-0 font-bold">HUITIÈMES (B)</h3>
        <div className="flex-1 flex flex-col justify-around gap-2 sm:gap-1">
          {data.competition.brackets.pouleB.huitiemes.map((match, idx) => (
            <BracketMatch 
              key={match.id}
              player1={match.player1} 
              country1={match.country1} 
              countryCode1={match.countryCode1} 
              player2={match.player2} 
              country2={match.country2} 
              countryCode2={match.countryCode2}
              side="right"
              color={idx % 2 === 0 ? "accent-red" : "primary"}
            />
          ))}
        </div>
      </div>
    </div>
  );
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
        <div className="space-y-6 md:space-y-8">
          {/* ÉDITION DES MATCHES */}
          <div className="bg-[#111] border border-white/10 p-4 md:p-6 lg:p-8 rounded-2xl space-y-6 md:space-y-8">
            <h3 className="font-heading text-xl md:text-2xl lg:text-3xl text-primary flex items-center gap-2">✏️ Édition des Matches</h3>
            
            {/* HUITIÈMES A */}
            <div className="space-y-3 md:space-y-4">
              <h4 className="font-heading text-sm md:text-base lg:text-lg text-accent-red border-l-4 border-accent-red pl-2 md:pl-4">HUITIÈMES (A)</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3 md:gap-4 lg:gap-6">
                {data.competition.brackets.pouleA.huitiemes.map((match, idx) => (
                  <div key={match.id} className="bg-white/5 border border-white/10 p-3 md:p-4 lg:p-6 rounded-lg md:rounded-xl space-y-2 md:space-y-3">
                    <div className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-slate-500 text-center">Match A{idx + 1}</div>
                    <div className="space-y-2 md:space-y-3">
                      <div className="flex gap-1 md:gap-2 flex-wrap md:flex-nowrap">
                        <input type="text" value={match.player1} onChange={e => updateMatch('pouleA', 'huitiemes', match.id, 'player1', e.target.value)} placeholder="Joueur 1" className="flex-1 min-w-[80px] bg-white/5 border border-white/10 rounded p-1.5 md:p-2 text-xs md:text-sm uppercase focus:border-primary outline-none" />
                        <div className="w-20 md:w-24 lg:w-32">
                          <CountrySearchSelect value={match.countryCode1} onChange={code => updateMatch('pouleA', 'huitiemes', match.id, 'countryCode1', code)} countries={countries} />
                        </div>
                      </div>
                      <div className="text-center text-primary font-mono text-xs md:text-sm">--</div>
                      <div className="flex gap-1 md:gap-2 flex-wrap md:flex-nowrap">
                        <input type="text" value={match.player2} onChange={e => updateMatch('pouleA', 'huitiemes', match.id, 'player2', e.target.value)} placeholder="Joueur 2" className="flex-1 min-w-[80px] bg-white/5 border border-white/10 rounded p-1.5 md:p-2 text-xs md:text-sm uppercase focus:border-primary outline-none" />
                        <div className="w-20 md:w-24 lg:w-32">
                          <CountrySearchSelect value={match.countryCode2} onChange={code => updateMatch('pouleA', 'huitiemes', match.id, 'countryCode2', code)} countries={countries} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* HUITIÈMES B */}
            <div className="space-y-3 md:space-y-4">
              <h4 className="font-heading text-sm md:text-base lg:text-lg text-primary border-l-4 border-primary pl-2 md:pl-4">HUITIÈMES (B)</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3 md:gap-4 lg:gap-6">
                {data.competition.brackets.pouleB.huitiemes.map((match, idx) => (
                  <div key={match.id} className="bg-white/5 border border-white/10 p-3 md:p-4 lg:p-6 rounded-lg md:rounded-xl space-y-2 md:space-y-3">
                    <div className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-slate-500 text-center">Match B{idx + 1}</div>
                    <div className="space-y-2 md:space-y-3">
                      <div className="flex gap-1 md:gap-2 flex-wrap md:flex-nowrap">
                        <input type="text" value={match.player1} onChange={e => updateMatch('pouleB', 'huitiemes', match.id, 'player1', e.target.value)} placeholder="Joueur 1" className="flex-1 min-w-[80px] bg-white/5 border border-white/10 rounded p-1.5 md:p-2 text-xs md:text-sm uppercase focus:border-primary outline-none" />
                        <div className="w-20 md:w-24 lg:w-32">
                          <CountrySearchSelect value={match.countryCode1} onChange={code => updateMatch('pouleB', 'huitiemes', match.id, 'countryCode1', code)} countries={countries} />
                        </div>
                      </div>
                      <div className="text-center text-primary font-mono text-xs md:text-sm">--</div>
                      <div className="flex gap-1 md:gap-2 flex-wrap md:flex-nowrap">
                        <input type="text" value={match.player2} onChange={e => updateMatch('pouleB', 'huitiemes', match.id, 'player2', e.target.value)} placeholder="Joueur 2" className="flex-1 min-w-[80px] bg-white/5 border border-white/10 rounded p-1.5 md:p-2 text-xs md:text-sm uppercase focus:border-primary outline-none" />
                        <div className="w-20 md:w-24 lg:w-32">
                          <CountrySearchSelect value={match.countryCode2} onChange={code => updateMatch('pouleB', 'huitiemes', match.id, 'countryCode2', code)} countries={countries} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* QUARTS A & B */}
            <div className="space-y-3 md:space-y-4">
              <h4 className="font-heading text-sm md:text-base lg:text-lg text-slate-400 border-l-4 border-slate-400 pl-2 md:pl-4">QUARTS DE FINALE</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3 md:gap-4 lg:gap-6">
                {data.competition.brackets.pouleA.quarts.map((match, idx) => (
                  <div key={match.id} className="bg-white/5 border border-white/10 p-3 md:p-4 lg:p-6 rounded-lg md:rounded-xl space-y-2 md:space-y-3">
                    <div className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-slate-500">Quart A{idx + 1}</div>
                    <input type="text" value={match.player1} onChange={e => updateMatch('pouleA', 'quarts', match.id, 'player1', e.target.value)} placeholder="Joueur 1" className="w-full bg-white/5 border border-white/10 rounded p-1.5 md:p-2 text-xs md:text-sm uppercase focus:border-primary outline-none" />
                    <div className="text-center text-primary font-mono text-xs md:text-sm">--</div>
                    <input type="text" value={match.player2} onChange={e => updateMatch('pouleA', 'quarts', match.id, 'player2', e.target.value)} placeholder="Joueur 2" className="w-full bg-white/5 border border-white/10 rounded p-1.5 md:p-2 text-xs md:text-sm uppercase focus:border-primary outline-none" />
                  </div>
                ))}
                {data.competition.brackets.pouleB.quarts.map((match, idx) => (
                  <div key={match.id} className="bg-white/5 border border-white/10 p-3 md:p-4 lg:p-6 rounded-lg md:rounded-xl space-y-2 md:space-y-3">
                    <div className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-slate-500">Quart B{idx + 1}</div>
                    <input type="text" value={match.player1} onChange={e => updateMatch('pouleB', 'quarts', match.id, 'player1', e.target.value)} placeholder="Joueur 1" className="w-full bg-white/5 border border-white/10 rounded p-1.5 md:p-2 text-xs md:text-sm uppercase focus:border-primary outline-none" />
                    <div className="text-center text-primary font-mono text-xs md:text-sm">--</div>
                    <input type="text" value={match.player2} onChange={e => updateMatch('pouleB', 'quarts', match.id, 'player2', e.target.value)} placeholder="Joueur 2" className="w-full bg-white/5 border border-white/10 rounded p-1.5 md:p-2 text-xs md:text-sm uppercase focus:border-primary outline-none" />
                  </div>
                ))}
              </div>
            </div>

            {/* DEMI-FINALES */}
            <div className="space-y-3 md:space-y-4">
              <h4 className="font-heading text-sm md:text-base lg:text-lg text-accent-red border-l-4 border-accent-red pl-2 md:pl-4">DEMI-FINALES</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3 md:gap-4 lg:gap-6">
                {data.competition.brackets.pouleA.semis.map((match, idx) => (
                  <div key={match.id} className="bg-white/5 border border-white/10 p-3 md:p-4 lg:p-6 rounded-lg md:rounded-xl space-y-2 md:space-y-3">
                    <div className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-slate-500">Demi A{idx + 1}</div>
                    <input type="text" value={match.player1} onChange={e => updateMatch('pouleA', 'semis', match.id, 'player1', e.target.value)} placeholder="Joueur 1" className="w-full bg-white/5 border border-white/10 rounded p-1.5 md:p-2 text-xs md:text-sm uppercase focus:border-primary outline-none" />
                    <div className="text-center text-primary font-mono text-xs md:text-sm">--</div>
                    <input type="text" value={match.player2} onChange={e => updateMatch('pouleA', 'semis', match.id, 'player2', e.target.value)} placeholder="Joueur 2" className="w-full bg-white/5 border border-white/10 rounded p-1.5 md:p-2 text-xs md:text-sm uppercase focus:border-primary outline-none" />
                  </div>
                ))}
                {data.competition.brackets.pouleB.semis.map((match, idx) => (
                  <div key={match.id} className="bg-white/5 border border-white/10 p-3 md:p-4 lg:p-6 rounded-lg md:rounded-xl space-y-2 md:space-y-3">
                    <div className="text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-slate-500">Demi B{idx + 1}</div>
                    <input type="text" value={match.player1} onChange={e => updateMatch('pouleB', 'semis', match.id, 'player1', e.target.value)} placeholder="Joueur 1" className="w-full bg-white/5 border border-white/10 rounded p-1.5 md:p-2 text-xs md:text-sm uppercase focus:border-primary outline-none" />
                    <div className="text-center text-primary font-mono text-xs md:text-sm">--</div>
                    <input type="text" value={match.player2} onChange={e => updateMatch('pouleB', 'semis', match.id, 'player2', e.target.value)} placeholder="Joueur 2" className="w-full bg-white/5 border border-white/10 rounded p-1.5 md:p-2 text-xs md:text-sm uppercase focus:border-primary outline-none" />
                  </div>
                ))}
              </div>
            </div>

            {/* GRANDE FINALE */}
            <div className="space-y-3 md:space-y-4">
              <h4 className="font-heading text-sm md:text-base lg:text-lg text-primary border-l-4 border-primary pl-2 md:pl-4">GRANDE FINALE</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 lg:gap-6">
                <div className="bg-white/5 border border-white/10 p-3 md:p-4 lg:p-6 rounded-lg md:rounded-xl space-y-2 md:space-y-3">
                  <input type="text" value={data.competition.brackets.final.player1} onChange={e => updateFinal('player1', e.target.value)} placeholder="Joueur 1" className="w-full bg-white/5 border border-white/10 rounded p-1.5 md:p-2 text-xs md:text-sm uppercase focus:border-primary outline-none" />
                  <div className="text-center text-primary font-mono text-xs md:text-sm">--</div>
                </div>
                <div className="bg-white/5 border border-white/10 p-3 md:p-4 lg:p-6 rounded-lg md:rounded-xl space-y-2 md:space-y-3">
                  <input type="text" value={data.competition.brackets.final.player2} onChange={e => updateFinal('player2', e.target.value)} placeholder="Joueur 2" className="w-full bg-white/5 border border-white/10 rounded p-1.5 md:p-2 text-xs md:text-sm uppercase focus:border-primary outline-none" />
                </div>
              </div>
            </div>
          </div>

          {/* VISUALISATION DU BRACKET */}
          <section id="brackets" className="py-8 md:py-16 lg:py-24 bg-background-dark overflow-x-auto md:overflow-hidden relative border-t border-white/10">
          <div className="absolute inset-0 pointer-events-none grain-texture z-0 opacity-5"></div>
          <div className="absolute inset-0 pointer-events-none diagonal-lines z-0 opacity-10"></div>
          
          <div className="max-w-6xl lg:max-w-7xl mx-auto px-2 sm:px-4 text-center mb-6 md:mb-10 lg:mb-16 relative z-10">
            <div className="inline-block px-3 md:px-4 py-1 border border-primary/30 bg-primary/10 rounded-full mb-2 md:mb-3 lg:mb-6">
              <span className="text-primary text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase">Phase Finale - Lomé, Togo</span>
            </div>
            <h1 className="font-heading text-lg sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl text-white mb-1 md:mb-2 lg:mb-4 tracking-tight uppercase">
              TABLEAU DES BATTLES <span className="text-primary">-</span> TOP 16
            </h1>
          </div>

          <div ref={bracketContainerRef} className="w-full relative z-10 overflow-hidden bg-black/20 rounded-lg border border-white/5" style={{ 
            minHeight: '400px',
            maxHeight: '85vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '4px'
          }}>
            {/* Hidden clone for measurement */}
            <div 
              ref={measureRef} 
              className="absolute top-0 left-0 invisible pointer-events-none" 
              style={{ width: '900px' }}
            >
              <BracketContent />
            </div>

            {/* Full visible content - always shown completely */}
            <div 
              style={{ 
                width: '900px',
                minWidth: '900px',
                position: 'relative',
                padding: '8px',
                transform: `scale(${bracketScale})`,
                transformOrigin: 'center center',
                transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                willChange: 'transform'
              }}
            >
              <BracketContent />
            </div>
          </div>

          <div className="max-w-6xl lg:max-w-7xl mx-auto px-2 sm:px-4 mt-6 md:mt-8 lg:mt-12 lg:mt-20 grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8 relative z-10">
            {data.globalConfig.homepageStats?.map((stat, idx) => (
              <div key={idx} className={`bg-white/5 p-4 sm:p-6 md:p-8 rounded-lg md:rounded-xl border border-white/10 hover:border-${idx === 0 ? 'primary' : idx === 1 ? 'accent-red' : 'white'}/30 transition-all`}>
                <h4 className={`font-heading text-2xl sm:text-3xl md:text-4xl text-${idx === 0 ? 'primary' : idx === 1 ? 'accent-red' : 'white'} mb-2`}>{stat.value}</h4>
                <p className="text-slate-400 uppercase text-xs font-bold tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>
        </div>
      )}
    </div>
  );
}
