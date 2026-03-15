import React, { useState } from 'react';
import { CMSData, Partner } from '../../types';
import { Plus, Trash2, Edit, Save, X, Handshake, FileText } from 'lucide-react';

export default function PartnersMedia({ data, setData }: { data: CMSData, setData: React.Dispatch<React.SetStateAction<CMSData>> }) {
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<Partial<Partner>>({});

  const handleAddPartner = () => {
    const newPartner: Partner = {
      id: Date.now().toString(),
      name: formData.name || '',
      logo: formData.logo || 'https://picsum.photos/seed/logo/200/200',
      category: formData.category || 'sponsor'
    };
    setData(prev => ({ ...prev, partners: { ...prev.partners, logos: [...prev.partners.logos, newPartner] } }));
    setIsAdding(false);
    setFormData({});
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center">
            <h4 className="font-heading text-lg flex items-center gap-2"><Handshake size={20} className="text-primary" /> Logos Partenaires</h4>
            <button onClick={() => setIsAdding(true)} className="flex items-center gap-2 px-4 py-2 bg-primary text-background-dark font-bold rounded-xl"><Plus size={18} /> Ajouter</button>
          </div>

          {isAdding && (
            <div className="bg-[#111] border border-white/10 p-6 rounded-2xl space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Nom</label>
                  <input 
                    type="text" 
                    value={formData.name || ''} 
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-primary outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Catégorie</label>
                  <select 
                    value={formData.category || 'sponsor'} 
                    onChange={e => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-primary outline-none transition-all appearance-none"
                  >
                    <option value="institutional">Institutionnel</option>
                    <option value="sponsor">Sponsor</option>
                    <option value="media">Média</option>
                  </select>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Logo (URL)</label>
                  <input 
                    type="text" 
                    value={formData.logo || ''} 
                    onChange={e => setFormData({ ...formData, logo: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-primary outline-none transition-all"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-4">
                <button onClick={() => setIsAdding(false)} className="px-6 py-2 text-xs font-bold uppercase tracking-widest text-slate-500">Annuler</button>
                <button onClick={handleAddPartner} className="px-6 py-2 bg-primary text-background-dark rounded-xl font-bold text-xs uppercase tracking-widest">Ajouter</button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {data.partners.logos.map(partner => (
              <div key={partner.id} className="bg-[#111] border border-white/5 p-4 rounded-2xl group relative hover:border-white/10 transition-all text-center">
                <button 
                  onClick={() => setData(prev => ({ ...prev, partners: { ...prev.partners, logos: prev.partners.logos.filter(p => p.id !== partner.id) } }))}
                  className="absolute top-2 right-2 p-1 text-slate-500 hover:text-accent-red opacity-0 group-hover:opacity-100 transition-all"
                >
                  <Trash2 size={14} />
                </button>
                <div className="aspect-square bg-white rounded-xl p-4 mb-3 flex items-center justify-center">
                  <img src={partner.logo} alt={partner.name} className="max-w-full max-h-full object-contain" referrerPolicy="no-referrer" />
                </div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 truncate">{partner.name}</p>
                <p className="text-[8px] font-bold uppercase tracking-widest text-primary mt-1">{partner.category}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h4 className="font-heading text-lg flex items-center gap-2"><FileText size={20} className="text-primary" /> Dossier Sponsoring</h4>
          <div className="bg-[#111] border border-white/10 p-6 rounded-2xl space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Lien du PDF</label>
              <input 
                type="text" 
                value={data.partners.sponsoringPdfUrl} 
                onChange={e => setData(prev => ({ ...prev, partners: { ...prev.partners, sponsoringPdfUrl: e.target.value } }))}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-primary outline-none transition-all"
              />
            </div>
            <p className="text-xs text-slate-500 italic">Ce lien sera utilisé pour le bouton de téléchargement du dossier de sponsoring sur le site public.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
