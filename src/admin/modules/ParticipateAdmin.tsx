import React from 'react';
import { CMSData } from '../../types';
import { Users, Briefcase, Heart, FileText, MessageCircle } from 'lucide-react';

export default function ParticipateAdmin({ data, setData }: { data: CMSData, setData: React.Dispatch<React.SetStateAction<CMSData>> }) {
  const updateHero = (field: 'title' | 'titleHighlight' | 'subtitle', value: string) => {
    setData(prev => ({
      ...prev,
      participate: {
        ...prev.participate,
        hero: { ...prev.participate.hero, [field]: value }
      }
    }));
  };

  const updateSection = (sectionType: 'dancers' | 'professionals' | 'volunteers', field: 'title' | 'description', value: string) => {
    setData(prev => ({
      ...prev,
      participate: {
        ...prev.participate,
        sections: {
          ...prev.participate.sections,
          [sectionType]: { ...prev.participate.sections[sectionType], [field]: value }
        }
      }
    }));
  };

  const updateFormField = (field: 'nameLabel' | 'emailLabel' | 'phoneLabel' | 'countryLabel' | 'messageLabel', value: string) => {
    setData(prev => ({
      ...prev,
      participate: {
        ...prev.participate,
        formFields: { ...prev.participate.formFields, [field]: value }
      }
    }));
  };

  const updateSuccessMessage = (field: 'title' | 'subtitle', value: string) => {
    setData(prev => ({
      ...prev,
      participate: {
        ...prev.participate,
        successMessage: { ...prev.participate.successMessage, [field]: value }
      }
    }));
  };

  return (
    <div className="space-y-12">
      {/* HERO SECTION */}
      <div className="bg-[#111] border border-white/10 p-8 rounded-2xl space-y-6">
        <h4 className="font-heading text-lg flex items-center gap-2">
          <FileText size={20} className="text-primary" /> Section Hero
        </h4>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Titre Principal</label>
            <input 
              type="text" 
              value={data.participate.hero.title} 
              onChange={e => updateHero('title', e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-primary outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Titre Mis en Évidence</label>
            <input 
              type="text" 
              value={data.participate.hero.titleHighlight} 
              onChange={e => updateHero('titleHighlight', e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-primary outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Sous-titre</label>
            <input 
              type="text" 
              value={data.participate.hero.subtitle} 
              onChange={e => updateHero('subtitle', e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-primary outline-none transition-all"
            />
          </div>
        </div>
      </div>

      {/* SECTIONS DE PARTICIPATION */}
      <div className="space-y-6">
        {/* DANSEURS */}
        <div className="bg-[#111] border border-white/10 p-8 rounded-2xl space-y-6">
          <h4 className="font-heading text-lg flex items-center gap-2">
            <Users size={20} className="text-primary" /> Section Danseurs
          </h4>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Titre</label>
              <input 
                type="text" 
                value={data.participate.sections.dancers.title} 
                onChange={e => updateSection('dancers', 'title', e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-primary outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Description</label>
              <textarea 
                rows={4}
                value={data.participate.sections.dancers.description} 
                onChange={e => updateSection('dancers', 'description', e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-primary outline-none transition-all resize-none"
              />
            </div>
          </div>
        </div>

        {/* PROFESSIONNELS */}
        <div className="bg-[#111] border border-white/10 p-8 rounded-2xl space-y-6">
          <h4 className="font-heading text-lg flex items-center gap-2">
            <Briefcase size={20} className="text-primary" /> Section Professionnels
          </h4>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Titre</label>
              <input 
                type="text" 
                value={data.participate.sections.professionals.title} 
                onChange={e => updateSection('professionals', 'title', e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-primary outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Description</label>
              <textarea 
                rows={4}
                value={data.participate.sections.professionals.description} 
                onChange={e => updateSection('professionals', 'description', e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-primary outline-none transition-all resize-none"
              />
            </div>
          </div>
        </div>

        {/* VOLONTAIRES */}
        <div className="bg-[#111] border border-white/10 p-8 rounded-2xl space-y-6">
          <h4 className="font-heading text-lg flex items-center gap-2">
            <Heart size={20} className="text-primary" /> Section Volontaires
          </h4>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Titre</label>
              <input 
                type="text" 
                value={data.participate.sections.volunteers.title} 
                onChange={e => updateSection('volunteers', 'title', e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-primary outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Description</label>
              <textarea 
                rows={4}
                value={data.participate.sections.volunteers.description} 
                onChange={e => updateSection('volunteers', 'description', e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-primary outline-none transition-all resize-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* CHAMPS DU FORMULAIRE */}
      <div className="bg-[#111] border border-white/10 p-8 rounded-2xl space-y-6">
        <h4 className="font-heading text-lg flex items-center gap-2">
          <FileText size={20} className="text-primary" /> Champs du Formulaire
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Label Nom</label>
            <input 
              type="text" 
              value={data.participate.formFields.nameLabel} 
              onChange={e => updateFormField('nameLabel', e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-primary outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Label Email</label>
            <input 
              type="text" 
              value={data.participate.formFields.emailLabel} 
              onChange={e => updateFormField('emailLabel', e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-primary outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Label Téléphone</label>
            <input 
              type="text" 
              value={data.participate.formFields.phoneLabel} 
              onChange={e => updateFormField('phoneLabel', e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-primary outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Label Pays</label>
            <input 
              type="text" 
              value={data.participate.formFields.countryLabel} 
              onChange={e => updateFormField('countryLabel', e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-primary outline-none transition-all"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Label Message</label>
            <input 
              type="text" 
              value={data.participate.formFields.messageLabel} 
              onChange={e => updateFormField('messageLabel', e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-primary outline-none transition-all"
            />
          </div>
        </div>
      </div>

      {/* MESSAGE DE SUCCÈS */}
      <div className="bg-[#111] border border-white/10 p-8 rounded-2xl space-y-6">
        <h4 className="font-heading text-lg flex items-center gap-2">
          <MessageCircle size={20} className="text-primary" /> Message de Succès
        </h4>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Titre</label>
            <input 
              type="text" 
              value={data.participate.successMessage.title} 
              onChange={e => updateSuccessMessage('title', e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-primary outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Sous-titre</label>
            <textarea 
              rows={3}
              value={data.participate.successMessage.subtitle} 
              onChange={e => updateSuccessMessage('subtitle', e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-primary outline-none transition-all resize-none"
            />
          </div>
        </div>
      </div>

      {/* INFO BOX */}
      <div className="bg-primary/10 border border-primary/30 p-6 rounded-2xl">
        <h4 className="font-heading text-sm text-primary mb-2">ℹ️ Informations</h4>
        <p className="text-sm text-slate-300 leading-relaxed">
          Tous les champs de cette page sont éditables directement par le CMS. Les modifications seront appliquées immédiatement sur la page de participation. 
          Le formulaire enregistre les candidatures et redirige automatiquement l\'utilisateur vers l\'accueil après 3 secondes.
        </p>
      </div>
    </div>
  );
}
