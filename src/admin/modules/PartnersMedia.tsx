import React, { useState } from 'react';
import { CMSData, Partner } from '../../types';
import { Plus, Trash2, X, Handshake, FileText, Building2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function PartnersMedia({ data, setData }: { data: CMSData, setData: React.Dispatch<React.SetStateAction<CMSData>> }) {
  const [isAddingPartner, setIsAddingPartner] = useState(false);
  const [newPartnerForm, setNewPartnerForm] = useState<Partial<Partner> | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<'Institutional' | 'Main' | 'Media'>('Institutional');

  // Ensure partners data exists
  const partnersData = data.partners || {
    logos: [],
    sponsoringPdfUrl: '#',
    cta: {
      title: 'Devenez un Acteur de l\'Histoire',
      subtitle: 'Rejoignez l\'élite de la culture urbaine africaine',
      buttonText: 'Devenir Partenaire'
    }
  };

  const categories = ['Institutional', 'Main', 'Media'] as const;
  const tiers = ['Sponsor Platine', 'Sponsor Or', 'Sponsor Argent', 'Partenaire Officiel'];

  const filteredPartners = (partnersData.logos || []).filter(p => p.category === selectedCategory);

  const initAddingPartner = () => {
    setIsAddingPartner(true);
    setNewPartnerForm({
      category: selectedCategory,
      name: '',
      logo: '',
      tier: 'Partenaire Officiel'
    });
  };

  const saveNewPartner = () => {
    if (newPartnerForm && newPartnerForm.name && newPartnerForm.logo) {
      const partner: Partner = {
        id: Date.now().toString(),
        name: newPartnerForm.name,
        logo: newPartnerForm.logo,
        category: newPartnerForm.category as 'Institutional' | 'Main' | 'Media',
        tier: newPartnerForm.tier
      };
      setData(prev => ({
        ...prev,
        partners: {
          ...prev.partners,
          logos: [...prev.partners.logos, partner]
        }
      }));
      setIsAddingPartner(false);
      setNewPartnerForm(null);
    }
  };

  const removePartner = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce partenaire?')) {
      setData(prev => ({
        ...prev,
        partners: {
          ...prev.partners,
          logos: prev.partners.logos.filter(p => p.id !== id)
        }
      }));
    }
  };

  const getCategoryLabel = (cat: string) => {
    const labels: { [key: string]: string } = {
      'Institutional': 'Partenaires Institutionnels',
      'Main': 'Sponsors Majeurs',
      'Media': 'Média & Broadcasting'
    };
    return labels[cat] || cat;
  };

  return (
    <div className="space-y-12">
      <header>
        <h2 className="text-3xl font-black tracking-tighter">Partenaires & Sponsors</h2>
        <p className="text-zinc-500 mt-1">Gérez tous les partenaires, sponsors et médias partenaires.</p>
      </header>

      {/* Section Partenaires */}
      <div className="space-y-8">
        {/* Sélecteur de catégorie */}
        <div className="flex gap-3 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-3 rounded-lg font-bold uppercase tracking-widest text-sm transition-all ${
                selectedCategory === cat
                  ? 'bg-primary text-background-dark'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              {getCategoryLabel(cat)}
            </button>
          ))}
        </div>

        {/* Ajout de partenaire */}
        <div className="bg-[#111] border border-white/10 p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-heading text-lg">{getCategoryLabel(selectedCategory)}</h3>
            <button
              onClick={initAddingPartner}
              className="flex items-center gap-2 bg-primary/20 hover:bg-primary/40 text-primary rounded-lg px-4 py-2 transition-all font-bold"
            >
              <Plus size={18} /> Ajouter Partenaire
            </button>
          </div>

          {/* Formulaire d'ajout */}
          {isAddingPartner && newPartnerForm && (
            <div className="bg-white/5 border border-white/10 p-6 rounded-xl mb-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Nom du Partenaire</label>
                  <input
                    type="text"
                    value={newPartnerForm.name || ''}
                    onChange={e => setNewPartnerForm({ ...newPartnerForm, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm outline-none focus:border-primary transition-all"
                    placeholder="Nom de l'entreprise..."
                  />
                </div>

                {selectedCategory === 'Main' && (
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Tier</label>
                    <select
                      value={newPartnerForm.tier || 'Partenaire Officiel'}
                      onChange={e => setNewPartnerForm({ ...newPartnerForm, tier: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm outline-none focus:border-primary transition-all"
                    >
                      {tiers.map(tier => (
                        <option key={tier} value={tier}>{tier}</option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">URL du Logo</label>
                  <input
                    type="text"
                    value={newPartnerForm.logo || ''}
                    onChange={e => setNewPartnerForm({ ...newPartnerForm, logo: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm outline-none focus:border-primary transition-all"
                    placeholder="https://..."
                  />
                </div>
              </div>

              {/* Aperçu du logo */}
              {newPartnerForm.logo && (
                <div className="flex justify-center pt-4">
                  <div className="w-32 h-32 bg-white/10 rounded-lg flex items-center justify-center p-4">
                    <img src={newPartnerForm.logo} alt={newPartnerForm.name} className="max-w-full max-h-full object-contain" referrerPolicy="no-referrer" />
                  </div>
                </div>
              )}

              <div className="flex gap-4 pt-4">
                <button
                  onClick={saveNewPartner}
                  className="flex-1 bg-primary/20 hover:bg-primary/40 text-primary rounded-lg px-6 py-3 transition-all font-bold uppercase tracking-widest"
                >
                  Enregistrer
                </button>
                <button
                  onClick={() => {
                    setIsAddingPartner(false);
                    setNewPartnerForm(null);
                  }}
                  className="flex-1 bg-white/10 hover:bg-white/20 text-white rounded-lg px-6 py-3 transition-all font-bold uppercase tracking-widest"
                >
                  Annuler
                </button>
              </div>
            </div>
          )}

          {/* Grille des partenaires */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredPartners.map(partner => (
              <motion.div
                key={partner.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/5 border border-white/10 p-4 rounded-lg group hover:border-primary/50 transition-all"
              >
                <div className="relative mb-3">
                  <div className="aspect-square bg-white/10 rounded-lg p-3 flex items-center justify-center">
                    <img src={partner.logo} alt={partner.name} className="max-w-full max-h-full object-contain" referrerPolicy="no-referrer" />
                  </div>
                  <button
                    onClick={() => removePartner(partner.id)}
                    className="absolute top-2 right-2 p-2 bg-accent-red/20 hover:bg-accent-red/40 text-accent-red rounded opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-white truncate">{partner.name}</p>
                  {partner.tier && (
                    <p className="text-[10px] text-primary font-bold uppercase tracking-widest">{partner.tier}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Section CTA - Devenir Partenaire */}
      <div className="bg-[#111] border border-white/10 p-6 rounded-2xl space-y-6">
        <div className="flex items-center gap-3">
          <Building2 className="text-primary" size={24} />
          <h3 className="font-heading text-lg">Section "Devenir Partenaire"</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Titre CTA</label>
              <input
                type="text"
                value={partnersData.cta.title}
                onChange={e => setData(prev => ({
                  ...prev,
                  partners: {
                    ...prev.partners,
                    cta: { ...prev.partners.cta, title: e.target.value }
                  }
                }))}
                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm outline-none focus:border-primary transition-all"
                placeholder="Ex: Devenez un Acteur de l'Histoire"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Sous-titre</label>
              <input
                type="text"
                value={partnersData.cta.subtitle}
                onChange={e => setData(prev => ({
                  ...prev,
                  partners: {
                    ...prev.partners,
                    cta: { ...prev.partners.cta, subtitle: e.target.value }
                  }
                }))}
                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm outline-none focus:border-primary transition-all"
                placeholder="Ex: Rejoignez l'élite de la culture urbaine africaine"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Texte du Bouton</label>
              <input
                type="text"
                value={partnersData.cta.buttonText}
                onChange={e => setData(prev => ({
                  ...prev,
                  partners: {
                    ...prev.partners,
                    cta: { ...prev.partners.cta, buttonText: e.target.value }
                  }
                }))}
                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm outline-none focus:border-primary transition-all"
                placeholder="Ex: Devenir Partenaire"
              />
            </div>
          </div>

          {/* Aperçu CTA */}
          <div className="bg-surface-dark border border-primary/20 rounded-lg p-6 flex flex-col justify-center">
            <div className="text-center space-y-4">
              <h2 className="font-heading text-4xl text-white leading-tight">{partnersData.cta.title}</h2>
              <p className="text-slate-400 text-lg italic">{partnersData.cta.subtitle}</p>
              <button className="mt-4 px-8 py-3 bg-primary/20 hover:bg-primary/40 text-primary rounded-lg font-bold uppercase tracking-widest">
                {partnersData.cta.buttonText}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Dossier Sponsoring */}
      <div className="bg-[#111] border border-white/10 p-6 rounded-2xl space-y-4">
        <div className="flex items-center gap-3">
          <FileText className="text-primary" size={24} />
          <h3 className="font-heading text-lg">Dossier de Sponsoring</h3>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Lien du PDF (URL ou #)</label>
          <input
            type="text"
            value={partnersData.sponsoringPdfUrl}
            onChange={e => setData(prev => ({
              ...prev,
              partners: {
                ...prev.partners,
                sponsoringPdfUrl: e.target.value
              }
            }))}
            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm outline-none focus:border-primary transition-all"
            placeholder="https://... ou # pour générer automatiquement"
          />
        </div>
        <p className="text-xs text-slate-500 italic">Le bouton "Dossier de Sponsoring" sur le site public utilisera ce lien. Si "#", le PDF será généré automatiquement.</p>
      </div>
    </div>
  );
}
