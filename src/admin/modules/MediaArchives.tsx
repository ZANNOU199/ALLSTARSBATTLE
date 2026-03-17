import React, { useState } from 'react';
import { CMSData, MediaItem } from '../../types';
import { Plus, Trash2, Edit2, Image as ImageIcon, Video, Archive } from 'lucide-react';

export default function MediaArchives({ data, setData }: { data: CMSData, setData: React.Dispatch<React.SetStateAction<CMSData>> }) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [filterYear, setFilterYear] = useState<number | 'all'>('all');
  const [filterType, setFilterType] = useState<'all' | 'photo' | 'video'>('all');

  // Les années disponibles historiquement
  const years = [2026, 2025, 2024, 2023, 2022, 2021, 2020];

  // Tags disponibles
  const availableTags = [
    'archive',
    'highlight',
    'aftermovie',
    'replay',
    'exclusif',
    'coulisses',
    'portraits',
    'final',
    'semi-final'
  ];

  const getOrCreateMediaArray = (): MediaItem[] => {
    if (!Array.isArray(data.media)) {
      return [];
    }
    return data.media;
  };

  const media = getOrCreateMediaArray();

  const updateMedia = (updatedMedia: MediaItem[]) => {
    setData(prev => ({
      ...prev,
      media: updatedMedia
    }));
  };

  const addMedia = () => {
    const newMedia: MediaItem = {
      id: Date.now().toString(),
      year: new Date().getFullYear(),
      type: 'photo',
      url: '',
      title: 'Nouveau média',
      description: '',
      thumbnail: '',
      tag: 'archive'
    };
    updateMedia([...media, newMedia]);
  };

  const removeMedia = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce média?')) {
      updateMedia(media.filter(m => m.id !== id));
    }
  };

  const updateMediaField = (id: string, field: string, value: any) => {
    const updated = media.map(m => 
      m.id === id ? { ...m, [field]: value } : m
    );
    updateMedia(updated);
  };

  const filteredMedia = media.filter(m => {
    if (filterYear !== 'all' && m.year !== filterYear) return false;
    if (filterType !== 'all' && m.type !== filterType) return false;
    return true;
  });

  return (
    <div className="space-y-12">
      <header>
        <h2 className="text-3xl font-black tracking-tighter">Galerie & Archives Média</h2>
        <p className="text-zinc-500 mt-1">Gérez toutes les photos, vidéos et aftermovies par année.</p>
      </header>

      {/* Filtres et Actions */}
      <div className="bg-[#111] border border-white/10 p-6 rounded-2xl space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="font-heading text-lg">Filtres & Actions</h3>
          <button 
            onClick={addMedia}
            className="flex items-center gap-2 bg-primary/20 hover:bg-primary/40 text-primary rounded-lg px-4 py-2 transition-all font-bold"
          >
            <Plus size={18} /> Ajouter Média
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Filtre Année */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 block">Année</label>
            <select 
              value={filterYear}
              onChange={e => setFilterYear(e.target.value === 'all' ? 'all' : parseInt(e.target.value))}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-primary outline-none transition-all min-h-[44px]"
            >
              <option value="all">Toutes les années</option>
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          {/* Filtre Type */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 block">Type</label>
            <select 
              value={filterType}
              onChange={e => setFilterType(e.target.value as any)}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-primary outline-none transition-all min-h-[44px]"
            >
              <option value="all">Tous les types</option>
              <option value="photo">Photos</option>
              <option value="video">Vidéos</option>
            </select>
          </div>

          <div className="flex items-end">
            <div className="text-sm text-slate-400">
              Total: <span className="text-white font-bold">{filteredMedia.length}</span> média(s)
            </div>
          </div>
        </div>
      </div>

      {/* Liste des Médias */}
      <div className="space-y-6">
        {filteredMedia.length > 0 ? (
          filteredMedia.map(mediaItem => (
            <div key={mediaItem.id} className="bg-[#111] border border-white/10 p-6 rounded-2xl space-y-4">
              {/* En-tête */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  {mediaItem.type === 'photo' ? (
                    <ImageIcon className="text-primary" size={24} />
                  ) : (
                    <Video className="text-primary" size={24} />
                  )}
                  <div>
                    <h4 className="font-bold text-white">{mediaItem.title || 'Sans titre'}</h4>
                    <p className="text-xs text-slate-500">{mediaItem.year} • {mediaItem.type.toUpperCase()}</p>
                  </div>
                </div>
                <button 
                  onClick={() => removeMedia(mediaItem.id)}
                  className="text-accent-red hover:text-accent-red/80 transition-colors p-2 hover:bg-accent-red/10 rounded"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              {/* Grille de champs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Année */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 block">Année d'archivage</label>
                  <select 
                    value={mediaItem.year}
                    onChange={e => updateMediaField(mediaItem.id, 'year', parseInt(e.target.value))}
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm outline-none focus:border-primary transition-all min-h-[44px]"
                  >
                    {years.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>

                {/* Type */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 block">Type de média</label>
                  <select 
                    value={mediaItem.type}
                    onChange={e => updateMediaField(mediaItem.id, 'type', e.target.value as 'photo' | 'video')}
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm outline-none focus:border-primary transition-all min-h-[44px]"
                  >
                    <option value="photo">Photo</option>
                    <option value="video">Vidéo / Aftermovie</option>
                  </select>
                </div>

                {/* Titre */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 block">Titre</label>
                  <input 
                    type="text" 
                    value={mediaItem.title || ''}
                    onChange={e => updateMediaField(mediaItem.id, 'title', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm outline-none focus:border-primary transition-all min-h-[44px]"
                    placeholder="Ex: Finales 2026, Highlights Round 1..."
                  />
                </div>

                {/* Tag/Catégorie */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 block">Tag/Catégorie</label>
                  <select 
                    value={mediaItem.tag || ''}
                    onChange={e => updateMediaField(mediaItem.id, 'tag', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm outline-none focus:border-primary transition-all min-h-[44px]"
                  >
                    <option value="">-- Sélectionner un tag --</option>
                    {availableTags.map(tag => (
                      <option key={tag} value={tag}>{tag}</option>
                    ))}
                  </select>
                </div>

                {/* URL */}
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 block">URL du média</label>
                  <input 
                    type="text" 
                    value={mediaItem.url}
                    onChange={e => updateMediaField(mediaItem.id, 'url', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm outline-none focus:border-primary transition-all min-h-[44px]"
                    placeholder="https://..."
                  />
                </div>

                {/* Description */}
                <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 block">Description</label>
                  <textarea 
                    value={mediaItem.description || ''}
                    onChange={e => updateMediaField(mediaItem.id, 'description', e.target.value)}
                    rows={3}
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm outline-none focus:border-primary transition-all resize-none"
                    placeholder="Description détaillée du média..."
                  />
                </div>

                {/* Thumbnail (pour vidéos) */}
                {mediaItem.type === 'video' && (
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 block">URL Thumbnail (optionnel)</label>
                    <input 
                      type="text" 
                      value={mediaItem.thumbnail || ''}
                      onChange={e => updateMediaField(mediaItem.id, 'thumbnail', e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm outline-none focus:border-primary transition-all min-h-[44px]"
                      placeholder="https://..."
                    />
                  </div>
                )}

                {/* Durée (pour vidéos) */}
                {mediaItem.type === 'video' && (
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 block">Durée (optionnel)</label>
                    <input 
                      type="text" 
                      value={mediaItem.duration || ''}
                      onChange={e => updateMediaField(mediaItem.id, 'duration', e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm outline-none focus:border-primary transition-all min-h-[44px]"
                      placeholder="4:32"
                    />
                  </div>
                )}
              </div>

              {/* Aperçu */}
              <div className="pt-4 border-t border-white/10">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-3">Aperçu</p>
                {mediaItem.type === 'photo' ? (
                  <div className="w-full h-48 bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                    <img src={mediaItem.url} alt={mediaItem.title} className="w-full h-full object-cover" onError={(e) => e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23444" width="100" height="100"/%3E%3C/svg%3E'} referrerPolicy="no-referrer" />
                  </div>
                ) : (
                  <div className="w-full h-48 bg-black border border-white/10 rounded-lg flex items-center justify-center">
                    <Video className="text-white/30" size={48} />
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="bg-[#111] border border-white/10 p-12 rounded-2xl text-center">
            <Archive className="mx-auto mb-4 text-white/30" size={48} />
            <p className="text-white/60 mb-4">Aucun média trouvé avec les filtres appliqués</p>
            <button 
              onClick={addMedia}
              className="inline-flex items-center gap-2 bg-primary/20 hover:bg-primary/40 text-primary rounded-lg px-4 py-2 transition-all font-bold"
            >
              <Plus size={18} /> Ajouter le premier média
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
