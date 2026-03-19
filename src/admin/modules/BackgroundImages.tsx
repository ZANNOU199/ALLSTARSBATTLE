import React, { useState } from 'react';
import { CMSData, PageBackground } from '../../types';
import { Plus, Trash2, Edit, Save, X, Image as ImageIcon, Video } from 'lucide-react';

export default function BackgroundImages({ data, setData }: { data: CMSData, setData: React.Dispatch<React.SetStateAction<CMSData>> }) {
  const [editingPage, setEditingPage] = useState<keyof typeof data.pageBackgrounds | null>(null);
  const [formData, setFormData] = useState<Partial<PageBackground>>({});

  const pageLabels = {
    hero: '🏠 Hero (Accueil)',
    artisticScene: '🎨 Scène Artistique',
    dancers: '👯 Page Danseurs',
    media: '📸 Galerie Média',
    contact: '📧 Page Contact'
  };

  const pageDescriptions = {
    hero: 'Image de fond et vidéo de la section héros de la page d\'accueil',
    artisticScene: 'Image de fond de la page Scène Artistique',
    dancers: 'Image de fond de la page Danseurs',
    media: 'Image de fond de la galerie Média',
    contact: 'Image de fond de la page Contact'
  };

  const handleEdit = (pageKey: keyof typeof data.pageBackgrounds) => {
    setEditingPage(pageKey);
    setFormData({ ...data.pageBackgrounds[pageKey] });
  };

  const handleSave = () => {
    if (!editingPage || !formData.imageUrl) return;

    const updatedBackground: PageBackground = {
      imageUrl: formData.imageUrl || '',
      videoUrl: formData.videoUrl,
      width: parseInt(String(formData.width)) || 1920,
      height: parseInt(String(formData.height)) || 1080,
      lastModified: new Date().toISOString()
    };

    setData(prev => ({
      ...prev,
      pageBackgrounds: {
        ...prev.pageBackgrounds,
        [editingPage]: updatedBackground
      }
    }));

    setEditingPage(null);
    setFormData({});
  };

  const handleCancel = () => {
    setEditingPage(null);
    setFormData({});
  };

  const currentPage = editingPage ? data.pageBackgrounds[editingPage] : null;

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-primary/20 to-accent-red/20 border border-white/10 rounded-2xl p-8">
        <h3 className="text-2xl font-heading text-primary mb-2">🎬 Gestion des Images de Fond</h3>
        <p className="text-slate-400 text-sm">Gérez toutes les images de background de vos pages principales</p>
      </div>

      {editingPage && (
        <div className="bg-[#111] border border-white/10 p-8 rounded-2xl space-y-6">
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-lg font-heading text-white">
              Modifier: {pageLabels[editingPage as keyof typeof pageLabels]}
            </h4>
            <button 
              onClick={handleCancel}
              className="p-2 text-slate-500 hover:text-accent-red transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">URL Image de Fond</label>
              <input 
                type="text" 
                value={formData.imageUrl || ''} 
                onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
                placeholder="https://example.com/image.jpg"
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-primary outline-none transition-all text-white"
              />
              <p className="text-[10px] text-slate-500">Format: URL complète de l'image</p>
            </div>

            {editingPage === 'hero' && (
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                  <Video size={14} /> URL Vidéo (Hero uniquement)
                </label>
                <input 
                  type="text" 
                  value={formData.videoUrl || ''} 
                  onChange={e => setFormData({ ...formData, videoUrl: e.target.value })}
                  placeholder="https://example.com/video.mp4"
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-primary outline-none transition-all text-white"
                />
                <p className="text-[10px] text-slate-500">Vidéo de fond pour la section héros</p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Largeur (px)</label>
              <input 
                type="number" 
                value={formData.width || 1920} 
                onChange={e => setFormData({ ...formData, width: parseInt(e.target.value) })}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-primary outline-none transition-all text-white"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Hauteur (px)</label>
              <input 
                type="number" 
                value={formData.height || 1080} 
                onChange={e => setFormData({ ...formData, height: parseInt(e.target.value) })}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 focus:border-primary outline-none transition-all text-white"
              />
            </div>
          </div>

          {formData.imageUrl && (
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Aperçu</label>
              <div className="relative w-full bg-black rounded-xl overflow-hidden border border-white/10">
                <img 
                  src={formData.imageUrl} 
                  alt="Preview" 
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x400?text=Image+non+disponible';
                  }}
                />
              </div>
            </div>
          )}

          <div className="flex justify-end gap-4">
            <button 
              onClick={handleCancel}
              className="px-6 py-2 text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-colors"
            >
              Annuler
            </button>
            <button 
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-2 bg-primary text-background-dark rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-primary/90 transition-colors"
            >
              <Save size={16} /> Enregistrer
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(Object.entries(data.pageBackgrounds) as [keyof typeof data.pageBackgrounds, PageBackground][]).map(([pageKey, bg]) => {
          const label = pageLabels[pageKey as keyof typeof pageLabels];
          const description = pageDescriptions[pageKey as keyof typeof pageDescriptions];
          
          return (
            <div 
              key={pageKey}
              className="bg-[#111] border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-all group"
            >
              <div className="relative w-full h-40 bg-black overflow-hidden">
                <img 
                  src={bg.imageUrl} 
                  alt={label}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x200?text=Image+non+disponible';
                  }}
                />
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <h5 className="text-lg font-heading text-white">{label}</h5>
                  <p className="text-xs text-slate-400 mt-1">{description}</p>
                </div>

                <div className="space-y-2 pt-4 border-t border-white/5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Résolution:</span>
                    <span className="text-white font-mono">{bg.width} × {bg.height}px</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Dernière modif:</span>
                    <span className="text-white font-mono">{new Date(bg.lastModified).toLocaleDateString('fr-FR')}</span>
                  </div>
                  {bg.videoUrl && (
                    <div className="flex items-center gap-2 text-xs text-primary">
                      <Video size={14} />
                      <span>Vidéo attachée</span>
                    </div>
                  )}
                </div>

                <button 
                  onClick={() => handleEdit(pageKey as keyof typeof data.pageBackgrounds)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary/20 text-primary rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-primary/30 transition-colors"
                >
                  <Edit size={16} /> Modifier
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-[#111] border border-white/10 p-6 rounded-2xl">
        <h4 className="text-sm font-heading text-white mb-4 flex items-center gap-2">
          <ImageIcon size={18} className="text-primary" /> Conseils
        </h4>
        <ul className="space-y-2 text-xs text-slate-400">
          <li>• Les images de fond doivent avoir une résolution minimale de 1920x1080px</li>
          <li>• Utilisez des formats optimisés (JPEG, WebP) pour une meilleure performance</li>
          <li>• La vidéo héros s'affichera en priorité, l'image comme fallback</li>
          <li>• Les URLs doivent être publiquement accessibles (HTTP/HTTPS)</li>
          <li>• Assurez-vous que les images sont bien optimisées pour le web</li>
        </ul>
      </div>
    </div>
  );
}
